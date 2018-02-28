export const getNextMatchingPositions = <T>(base:T[], target:T[],
                                            baseIndex:number,
                                            targetIndex:number)
                                           : [number, number] => {
    // If the parameters are not valid, return undefined indices.
    if (!assertParametersAreValid(base, target, baseIndex, targetIndex)) {
        return [undefined, undefined];
    }

    // Initialize loop variables, current base/target index and starting element.
    let [baseInBounds, targetInBounds] = [true, true];
    let [currBaseIndex, currTargetIndex] = [baseIndex, targetIndex];
    const [origBaseElem, origTargetElem] = [base[baseIndex], target[targetIndex]];

    // Search the rest of the target array for a value matching the element at
    // the original base position, and vice versa. Return a match.
    while (baseInBounds || targetInBounds) {
        if (baseInBounds && (base[currBaseIndex] == origTargetElem)) {
            return [currBaseIndex, targetIndex];
        } else if (targetInBounds && (target[currTargetIndex] == origBaseElem)) {
            return [baseIndex, currTargetIndex];
        }

        currBaseIndex++;   // Increment the index variables and update the
        currTargetIndex++; // out-of-bounds flags' values.
        [baseInBounds, targetInBounds] = [
            (currBaseIndex < base.length), (currTargetIndex < target.length),
        ];
    }

    // If no match was found by the loop, recurse starting from the next
    // position in the target and base arrays.
    return getNextMatchingPositions(base, target, baseIndex + 1, targetIndex + 1);
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
