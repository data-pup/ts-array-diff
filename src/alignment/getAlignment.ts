import { getIndicesInRange } from './getIndicesInRange';
import { getNextMatchingPositions } from './getNextMatchingPositions';

export const getAlignment = <T>(base:T[], target:T[]) : [T, T][] => {
    if ((!base) || (!target)) { // Check that both arrays are defined.
        throw new Error('Invalid parameters given to getAlignment(..)');
    }
    // Initialize an alignment result variable that we will fill and return.
    const results = new Array<[T, T]>();

    // Calculate the length of the base and target array parameters, and
    // declare index and element variables for the base and target arrays.
    const [bLen, tLen] = [base.length, target.length];
    let [bIndex, tIndex] = [0, 0];
    let [bInBounds, tInBounds] = getBoundsFlags(bIndex, bLen, tIndex, tLen);

    // Process the contents of both arrays. Continue to loop while either
    // index is still within the bounds of its array.
    while (bInBounds || tInBounds) {
        // Access an element if the index is still in bounds of the array.
        const bCurr = bInBounds ? base[bIndex] : undefined;
        const tCurr = tInBounds ? target[tIndex] : undefined;
        // Process matching elements, increment both counters.
        if (bCurr === tCurr) {
            results.push([bCurr, tCurr]);
            bIndex++;
            tIndex++;
        } else {
            // Process differing elements, based on which indices are in bounds.
            // -----------------------------------------------------------------
            // If both indices are still in bounds, search for the next match.
            // If a match is found, add the elements between the next match
            // to the results array accordingly. If only one array is still
            // in bounds, add the element and increment the corresponding index.
            // -----------------------------------------------------------------
            if (bInBounds && tInBounds) {
                let [bNextMatch, tNextMatch] = getNextMatchingPositions(
                    base, target, bIndex, tIndex); // Find the next match.

                if (!bNextMatch) { bNextMatch = base.length; }
                const remove:[T, T][] = getIndicesInRange(bIndex, bNextMatch)
                    .map((val:number) : [T, T] => [base[val], undefined]);
                results.push(...remove); // Mark items for removal from base.

                if (!tNextMatch) { tNextMatch = target.length; }
                const newItems:[T, T][] = getIndicesInRange(tIndex, tNextMatch)
                .map((val:number) : [T, T] => [undefined, target[val]]);
                results.push(...newItems); // Mark items to be added.

                [bIndex, tIndex] = [bNextMatch, tNextMatch]; // Update position.
            } else if (bInBounds) {
                results.push([bCurr, undefined]);
                bIndex++;
            } else {
                results.push([undefined, tCurr]);
                tIndex++;
            }
        }
        // Update the bounds flags before checking whether to continue.
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
