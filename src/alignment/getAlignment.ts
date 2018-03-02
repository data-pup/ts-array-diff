import { getIndicesInRange } from './getIndicesInRange';
import { getNextMatchingPositions } from './getNextMatchingPositions';
import { AlignmentPosition } from './position/alignmentPosition';

export const getAlignment = <T>(base:T[], target:T[]) : [T, T][] => {
    // Initialize an position object and the results array that we will return.
    const position = new AlignmentPosition<T>([base, target]);
    const results = new Array<[T, T]>();

    // Process the contents of both arrays. Continue to loop while either
    // index is still within the bounds of its array.
    while (position.somePositionInBounds()) {
        const [bCurr, tCurr]:[T, T] = position.getCurrentElems();
        const bothInBounds:boolean = position.bothPositionsInBounds();

        // Process matching elements, increment both counters.
        if (bothInBounds && bCurr === tCurr) {
            results.push([bCurr, tCurr]);
            position.incrementPositions();
        } else {
            // Process differing elements, based on which indices are in bounds.
            // -----------------------------------------------------------------
            // If both indices are still in bounds, search for the next match.
            // If a match is found, add the elements between the next match
            // to the results array accordingly. If only one array is still
            // in bounds, add the element and increment the corresponding index.
            // -----------------------------------------------------------------
            if (bothInBounds) {
                const [bIndex, tIndex] = position.getPositionTuple();
                let [bNextMatch, tNextMatch] = getNextMatchingPositions(
                    base, target, bIndex, tIndex); // Find the next match.

                if (bNextMatch === undefined) { bNextMatch = base.length; }
                const remove:[T, T][] = getIndicesInRange(bIndex, bNextMatch)
                    .map((val:number) : [T, T] => [base[val], undefined]);
                results.push(...remove); // Mark items for removal from base.

                if (tNextMatch === undefined) { tNextMatch = target.length; }
                const newItems:[T, T][] = getIndicesInRange(tIndex, tNextMatch)
                .map((val:number) : [T, T] => [undefined, target[val]]);
                results.push(...newItems); // Mark items to be added.

                position.setPositions([bNextMatch, tNextMatch]);
            } else if (bCurr != undefined) {
                results.push([bCurr, undefined]);
                position.incrementBasePosition();
            } else {
                results.push([undefined, tCurr]);
                position.incrementTargetPosition();
            }
        }
    }

    return results;
};
