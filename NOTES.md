diff types:

    splice(..) : Remove a section of the array, optionally, place new values.
        - start : 0-based index from which to start deleting
        - deleteCount? : number of items to delete
        - ...items? : items to insert in place of the removed items

    shift() : Remove an item from the beginning of the array.
    unshift(..items) : Place items at the beginning of the array.

    pop() : Remove an item from the end of the array.
    push() : Add an item to the end of the array.
