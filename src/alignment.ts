export const getAlignment = <T>(base:T[], target:T[]) : [T, T][] => {
    // Initialize an alignment result variable that we will fill and return.
    const alignmentResults = new Array<[T, T]>();

    // Calculate the length of the base and target array parameters.
    const baseLength = base ? base.length : 0;
    const targetLength = target ? target.length : 0;

    // Declare index and element variables for the base and target arrays.
    let [currBaseIndex, currTargetIndex] = [0, 0];
    let [currBaseElem, currTargetElem]:[T, T] = [undefined, undefined];
    let baseInBounds = currBaseIndex < baseLength;
    let targetInBounds = (currTargetIndex < targetLength);

    // This is the main logic loop used to calculate the base and target alignment.
    while (baseInBounds || targetInBounds) {
        currBaseElem = baseInBounds ? base[currBaseIndex] : undefined;
        currTargetElem = targetInBounds ? target[currTargetIndex] : undefined;

        // TODO: Equality check, update the current index values. Push to alignment results.
        // ---------------------------------------------------------------------------------
        const elementsAreEqual = currBaseElem === currTargetElem;
        if (elementsAreEqual) {
            alignmentResults.push([currBaseElem, currTargetElem]);
            currBaseIndex++;
            currTargetIndex++;
        } else {
            if (baseInBounds && targetInBounds) {
                alignmentResults.push([undefined, currTargetElem]);
                currTargetIndex++;
            } else if (baseInBounds && (!targetInBounds)) {
                alignmentResults.push([currBaseElem, undefined]);
                currBaseIndex++;
            } else if ((!baseInBounds) && targetInBounds) {
                alignmentResults.push([undefined, currTargetElem]);
                currTargetIndex++;
            }
        }
        // ---------------------------------------------------------------------------------

        [baseInBounds, targetInBounds] = [ // Update the bounds flags.
            currBaseIndex < baseLength,
            currTargetIndex < targetLength,
        ];
    }

    return alignmentResults;
};
