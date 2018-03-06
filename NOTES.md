# Diff Types:

    splice(..) : Remove a section of the array, optionally, place new values.
        - start : 0-based index from which to start deleting
        - deleteCount? : number of items to delete
        - ...items? : items to insert in place of the removed items

    shift() : Remove an item from the beginning of the array.
    unshift(..items) : Place items at the beginning of the array.

    pop() : Remove an item from the end of the array.
    push() : Add an item to the end of the array.


edit distance:
  the idea is that if we can represent the difference between two arrays, a
  base state and a target state, in the form of a series of the above
  operations, we can save transmission space and send these instructions
  rather than the entire new array.

### Simple Example(s):

  1.
    base state: [1, 2, 3]
    target state: [2, 3, 4, 5]
    diff: [
      unshift()
      push(4, 5)
    ]

  2.
    base state: [1, 2, 3, 4, 5]
    target state: [1, 6, 6, 6, 5]
    diff: [
      splice(1, 3, [6, 6, 6])
    ]

    Delete 3 elements, starting at index 1, and replace with three 6's.

# Solving:

## Alignment

The first step is to find the alignment of the two arrays. This entails
finding the placed where the two arrays match, and where they do not.
This might be best understood with a simple example as well:

### Simple Example(s):

  1.
    base state: [1, 2, 3]
    target state: [2, 3, 4]
    alignment:
      1 - 2 - 3 - X
      X - 2 - 3 - 4

  2.
    base state: [1, 2, 3, 4, 5]
    target state: [1, 2, 5]
    alignment:
      1 - 2 - 3 - 4 - 5
      1 - 2 - X - X - 5


  2.
    base state: [1, 2, 5]
    target state: [1, 2, 3, 4, 5]
    alignment:
      1 - 2 - X - X - 5
      1 - 2 - 3 - 4 - 5

## Parsing Alignment Into Diff Operation Sequences

Once an alignment has been created, the next step is to convert the
alignment into a sequence of diffOps.

### Simple Examples:

  1.
    base state [2, 3]
    target state [1, 2, 3]
    alignment: [
      [undefined, 1],
      [2, 2],
      [3, 3],
    ]

    If the alignment array begins with 1 or more [undefined, val]
    tuples, then we can consider this to be a series of unshift
    calls.

    diffOps = [
      unshift(1)
    ]

    What about if the alignment array begins with multiple unshift
    tuples? Say if the target state was [0, 1, 2, 3] with an
    alignment array that looked like:

    alignment: [
      [undefined, 0],
      [undefined, 1],
      [2, 2],
      [3, 3],
    ]

    We could identify our desired sequence of unshift values, in this
    case [0, 1]. Note that these should be pushed on in reverse order,
    so we would add these to the diffOp sequence like so:

    diffOps = [
      unshift(1),
      unshift(0),
    ]


  2.
    base state [1]
    target state [1, 2, 3]
    alignment: [
      [1, 1],
      [undefined, 2],
      [undefined, 3],
    ]

    In this case we will need to consider the push operation. This
    can be spotted if the alignment array ends with [undefined, val]
    tuples.

    This would result in a diffOp sequence that would look like:

    diffOps = [
      push(2),
      push(3),
    ]

    Note that these do not need to be run in reverse order, like unshift
    operations needed to.

### Identifying Operation Groups and noOp Groups

We will return to some other operations later, but first we should consider
two concepts. First is the idea of an edit group. This is a loose term for a
series of tuples in the alignment array that include an `undefined` value.

These stand in comparison to other tuples where nothing changed. For these
tuples, both elements will match. We will call these 'noOp tuples'. If the
first item in a tuple is undefined,
then the tuple represents a value that should be added to the base state. If
the second value is an undefined, than the tuple represents a value that should
be removed from the base state.

Using this logic, a group of alignment tuples that contain undefined values
can be thought of as an edit group. If they are at the beginning of the
alignment sequence before any noOp tuples have been encountered, then they
represent calls to shift/unshift. If they occur at the end of the array without
any trailing noOp tuples, then these represent a series of calls to
shift/unshift.

Edit groups that are between any noOp tuples represent calls to splice. This
will be considered later, because they will involve keeping track of the
positions of specific variables in the base array.

Note that operations that remove items from the head/tail of the base array
should be performed before the operations that add items to the base array.
For example, pop() should be called before push(..), and the same for shift
and unshift, respectively.

### Basic Examples Pt. II

