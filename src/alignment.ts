export const getAlignment = <T>(base:T[], target:T[]) : [T, T][] => {
    // Initialize an alignment result variable that we will fill and return.
    const alignmentResults = new Array<[T, T]>();

    // Calculate the length of the base and target array parameters.
    const baseLength = base ? base.length : 0;
    const targetLength = target ? target.length : 0;

    // Declare index and element variables for the base and target arrays.
    let [currBaseIndex, currTargetIndex] = [0, 0];
    let [currBaseElem, currTargetElem]:[T, T] = [undefined, undefined];
    let [baseInBounds, targetInBounds] = [ // Bounds flags for base and target.
        currBaseIndex < baseLength,
        currTargetIndex < targetLength,
    ];

    // This is the main logic loop used to calculate the base and target alignment.
    while (baseInBounds || targetInBounds) {
        currBaseElem = baseInBounds ? base[currBaseIndex] : undefined;
        currTargetElem = targetInBounds ? target[currTargetIndex] : undefined;

        // TODO: Equality check, update the current index values. Push to alignment results.

        [baseInBounds, targetInBounds] = [ // Update the bounds flags.
            currBaseIndex < baseLength,
            currTargetIndex < targetLength,
        ];
    }

    throw new Error(''); // TODO: Not implemented yet.
};
