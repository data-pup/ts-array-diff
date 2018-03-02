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
    let bNextMatchWithT:number = undefined;
    let tNextMatchWithB:number = undefined;
    while (bBounds || tBounds) { // Search for the next match.
        // See if there are any matches for the current base/target positions.
        if (bBounds) { tNextMatchWithB = target.indexOf(base[bIndex], tIndex); }
        if (tBounds) { bNextMatchWithT = base.indexOf(target[tIndex], bIndex); }

        // If any match(es) were found, return whichever match is closest
        // to the original base/target position given.
        if ((bNextMatchWithT >= 0) || (tNextMatchWithB >= 0)) {
            return chooseMatch(bIndex, tIndex, bNextMatchWithT, tNextMatchWithB);
        }

        bIndex++; tIndex++; // Increment positions and update the bounds flags.
        [bBounds, tBounds] = [(bIndex < base.length), (tIndex < target.length)];
    }

    return [undefined, undefined]; // Return undefined if no matches exist.
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

const chooseMatch = (bStart:number, tStart:number,
                     bNextMatchWithT:number, tNextMatchWithB:number)
                    : [number, number] => {
    // Initialize a return value, variables for base/target match distance,
    // and boolean flags to represent whether any matches were found.
    let bestMatch:[number, number] = [undefined, undefined];
    let [bDelta, tDelta]:[number, number] = [undefined, undefined];
    const bHasMatch = bNextMatchWithT >= 0;
    const tHasMatch = tNextMatchWithB >= 0;
    const bothHaveMatch = bHasMatch && tHasMatch;

    // Calculate the distance from the starting point if a match was found.
    if (bHasMatch) { bDelta = bNextMatchWithT - bStart; }
    if (tHasMatch) { tDelta = tNextMatchWithB - tStart; }

    if (bothHaveMatch) { // Select the closest match if two were found.
        bestMatch = (bDelta < tDelta)
            ? [bNextMatchWithT, tStart]
            : [bStart, tNextMatchWithB];
    } else if (bHasMatch) {
        bestMatch = [bNextMatchWithT, tStart];
    } else if (tHasMatch) {
        bestMatch = [bStart, tNextMatchWithB];
    } else {
        throw new Error('Unexpected error while choosing next position!');
    }

    return bestMatch; // Return the new position that was selected.
};
