export const getNextMatchingPositions = <T>(base:T[], target:T[],
                                            bStart:number, tStart:number)
                                           : [number, number] => {
    // If the parameters are not valid, return undefined indices.
    if (!assertParametersAreValid(base, target, bStart, tStart)) {
        return [undefined, undefined];
    }

    // Initialize loop variables to store the current base/target index,
    // whether or not that index is bounds, and the current array element.
    let [bBounds, tBounds, bIndex, tIndex] = [true, true, bStart, tStart];
    const [bCurr, tCurr] = [base[bStart], target[tStart]];
    while (bBounds || tBounds) { // Search for the next match.

        // if (baseInBounds) {
        // }

        // -----------------------------------------------------------------------
        if (bBounds && (base[bIndex] == tCurr)) {
            return [bIndex, tStart];
        } else if (tBounds && (target[tIndex] == bCurr)) {
            return [bStart, tIndex];
        }
        // -----------------------------------------------------------------------

        // Increment the index variables and update the bounds flags' values.
        bIndex++; tIndex++;
        [bBounds, tBounds] = [
            (bIndex < base.length), (tIndex < target.length),
        ];
    }

    // If no match was found by the loop, recurse starting from the next
    // position in the target and base arrays.
    return getNextMatchingPositions(base, target, bStart + 1, tStart + 1);
};

const assertParametersAreValid = <T>(base:T[], target:T[],
                                     baseIndex:number,
                                     targetIndex:number) : boolean => {
    if ((!base) || (!target) // Arrays must exist.
        || (baseIndex >= base.length) // Base index must be < the base length.
        || (targetIndex >= target.length) // Target index must be < length.
        || (baseIndex < 0) || (targetIndex < 0)) { // Indices must be >= 0.
        return false;
    } else {
        return true;
    }
};
