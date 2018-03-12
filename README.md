# ts-array-diff

This repository is an implementation of a delta encoding scheme for arrays
in TypeScript. This document will attempt to explain the motivations behind
building this, as well as some of the architectural design of the codebase.

Some brief conceptual examples will be covered as well, in order to help explain
some contextual background for this, and what makes the case of delta encoding
for ordered collections an interesting problem to solve.

## Delta Encoding Overview

Delta encoding, also called data differencing, refers to the practice of storing
differences in two sequential states for some data. This means that the entire
state does not need to be stored, after checking in the initial state. This
is a helpful concept used in revision control and incremental backup systems.

To implement this, we need to devise a way to identify and serialize the
difference between two states, and logic that can use this serialized difference
to patch an initial state into a new target state.

Before we consider arrays however, let's think about how this would work for
a dictionary.

### Conceptual Example (Dictionary)

A dictionary has the nice property that it is not ordered. There is a set of
keys, and a corresponding value for each key. This means we can compare the
base state and target state, and look for:
*  keys that exist in both states, but have different values
*  keys that only exist in either the base state or the target state

Key-value pairs that are identical in both the base and target state would
not need to be stored, and only key-value pairs that fall into one of the
categories above would need to be encoded. For very large dictionaries, or
situations where state must be kept in sync over a network, this is a
potential strategy to monitor state more efficiently.

Let's say we have a dictionary object that begins in the following base state,
and is altered into the target state:

```
base = {
    foo: 'initial',
    bar: 'state',
}

target = {
    foo: 'new',
    baz: 'state',
}
```

We could write some code that would iterate through each state's keys, check
the values, and identify that the following changes were made:
*  the `foo` key's corresponding value was changed from `initial` to `new`.
*  the `bar` key-value pair was removed.
*  a new key-value pair `baz: 'state'` was added.

This could be serialized into an object that might look like this:
```
[
    {
        type:'update',
        key:'foo',
        value:'new',
    },
    {
        type:'update',
        key:'baz',
        value:'state',
    },
    {
        type:'remove',
        key:'bar',
    },
]
```

This is a simple example, so the potential space savings might not be initially
apparent, but if imagine if these were the only changes in a dictionary that
contained 1,000 other keys! Transmitting a set of 3 objects would be vast
performance improvement in that case.

This difference object could be used in a function to mutate another copy
of the `base` dictionary into the `target` dictionary.

## Complexities of Delta Encoding for Ordered Collections

Arrays have an important distinction from dictionaries in that they are
ordered. This is functionally very similar to the string edit distance problem,
commonly taught as an introduction to dynamic programming.

NOTE: I will assume that the reader is familiar with edit distance calculation
in the interest of brevity, as well as reverence for sources elsewhere that can
explain this in better terms than I.

The interesting distinction between delta encoding arrays and the string edit
distance problem is that the operations available to mutate your state are
different. If we would like to adjust an array in place in JavaScript, we have
access to the following functions:

```
shift() : Remove an item from the beginning of the array.
unshift(..items) : Place items at the beginning of the array.

pop() : Remove an item from the end of the array.
push(..items) : Add an item to the end of the array.

splice(..) : Remove a section of the array, optionally, place new values.
    - start : 0-based index from which to start deleting
    - deleteCount? : number of items to delete
    - ...items? : items to insert in place of the removed items
```

This means that we can use `shift` and `unshift` to edit the beginning of
an array, `pop` and `push` to edit the end of an array, and the `splice`
function will otherwise be needed to edit the body of an array.

### Simple Array Delta Encoding Conceptual Example:

What might the difference of two arrays look like?

```
base state: [0, 1, 2]
target state: [1, 2, 3, 4]
diff: [
    unshift()
    push(3, 4)
]
```

This means if we had a variable `arr` in the base state, we could run the
following operations, resulting with `arr` in the desired target state:

```javascript
arr.unshift();
arr.push(3, 4);
```

## Architectural Overview

### Alignment Sequences

The first step in serializing a difference is comparing the two states, and
identifying the elements that should be added or removed. For example, a
base state of `[0, 1]` and a target state of `[1, 2]` would result in the
following alignment sequence:

```javascript
[
    {elemValue:0, elemType:'remove'},
    {elemValue:1, elemType:'noop'},
    {elemValue:2, elemType:'add'},
]
```

### Operations

Some helper classes and functions used to serialize a diff as we have shown
above. There is a set of `diffOp` classes which will represent each operation
that can be run against an array.

Each class implements a shared `IDiffOp` interface, which contains a
`runOp(..)` method, which will accept an array as a parameter and perform its
operation on the given array. This allows us to store a collection of different
operations, and run each operation in sequence on the base state.

### Parsing Alignment Sequences

Once we have generated an alignment sequence like the one shown above, we group
these elements together. This helps us identify which sections of the array
changed, and which sections do not require editing. This is needed to build
an operation sequence for a number of reasons.

First, the operations that adjust the head, body, and tail of the array are
different. If only the first element changed, we could call `shift` followed
by `unshift` to place the new head value into the array.

Second, the `splice` method requires a starting index. Note that this index may
not be the same after operations are performed on the head of the array, so
we will need to consider how the prior alterations would adjust the size of
the array when serializing the `splice` parameters in an operation sequence.
