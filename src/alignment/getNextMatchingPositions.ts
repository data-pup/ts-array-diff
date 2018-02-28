export const getNextMatchingPositions = <T>(base:T[], target:T[],
                                            currentBaseIndex:number,
                                            currentTargetIndex:number)
                                            : [number, number] => {
    if ((currentBaseIndex >= base.length) || (currentTargetIndex >= target.length)) {
        throw new Error('getNextMatchingPositions called with invalid parameters.');
    }

    throw new Error('');
};
