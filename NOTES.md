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


