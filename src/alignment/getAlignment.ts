export const getAlignment = <T>(base:T[], target:T[]) : [T, T][] => {
    if ((!base) || (!target)) { // Check that both arrays are defined.
        throw new Error('Invalid parameters given to getAlignment(..)');
    }
    // Initialize an alignment result variable that we will fill and return.
    const results = new Array<[T, T]>();
    // Calculate the length of the base and target array parameters.
    const [bLen, tLen] = [base.length, target.length];
    // Declare index and element variables for the base and target arrays.
    let [bIndex, tIndex] = [0, 0];
    let [bInBounds, tInBounds] = getBoundsFlags(bIndex, bLen, tIndex, tLen);
    // Process the contents of both arrays. Continue to loop while either
    // index is still within the bounds of its array.
    while (bInBounds || tInBounds) {
        // Access an element if the index is still in bounds of the array.
        const bCurr = bInBounds ? base[bIndex] : undefined;
        const tCurr = tInBounds ? target[tIndex] : undefined;
        if (bCurr === tCurr) {
            // Process matching elements, increment both counters.
            results.push([bCurr, tCurr]);
            bIndex++;
            tIndex++;
        } else {
            // Process differing elements, based on which indices are in bounds.
            if (bInBounds && tInBounds) {
                results.push([undefined, tCurr]);
                tIndex++;
            } else if (bInBounds) {
                results.push([bCurr, undefined]);
                bIndex++;
            } else {
                results.push([undefined, tCurr]);
                tIndex++;
            }
        }
        // Update the bounds flags.
        [bInBounds, tInBounds] = getBoundsFlags(bIndex, bLen, tIndex, tLen);
    }
    return results;
};

const getBoundsFlags = (baseIndex:number, baseLength:number,
                        targetIndex:number, targetLength:number)
                       : [boolean, boolean] => {
    return [
        ((baseIndex >= 0) && (baseIndex < baseLength)),
        ((targetIndex >= 0) && (targetIndex < targetLength)),
    ];
};
