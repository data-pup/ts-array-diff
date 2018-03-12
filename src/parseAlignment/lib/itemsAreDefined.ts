// Returns a boolean representing whether `items` is defined, and contains
// at least one element. If the items collection is undefined, null, or
// empty, this function will return false.
export const itemsAreDefined = <T>(items:T[]) : boolean => {
    return items !== undefined // `items` must not be undefined.
        && items !== null      // `items` must not be null.
        && items.length > 0;   // `items` must not be empty.
};
