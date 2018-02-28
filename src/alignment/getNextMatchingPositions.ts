export const getNextMatchingPositions = <T>(base:T[], target:T[],
                                            baseIndex:number,
                                            targetIndex:number)
                                           : [number, number] => {
    assertParametersAreValid(base, target, baseIndex, targetIndex);

    // Initialize loop variables, current base/target index and starting element.
    // const [currBaseIndex, currTargetIndex] = [baseIndex, targetIndex];
    // const [origBaseElem, origTargetElem] = [base[baseIndex], target[targetIndex]];
    // const maxLength = (base.length > target.length) ? base.length : target.length;

    throw new Error('Not Implemented Yet');
};

const assertParametersAreValid = <T>(base:T[], target:T[],
                                     baseIndex:number,
                                     targetIndex:number) : void => {
    if ((!base) || (!target) // Arrays must exist.
        || (baseIndex >= base.length) // Base index must be < the base length.
        || (targetIndex >= target.length) // Target index must be < length.
        || (baseIndex < 0) || (targetIndex < 0)) { // Indices must be >= 0.
        throw new Error('getNextMatchingPositions called with invalid parameters.');
    }
};
