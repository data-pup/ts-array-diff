import { getIndicesInRange } from './getIndicesInRange';
import { getNextMatchingPositions } from './getNextMatchingPositions';
import { AlignmentPosition } from './position/alignmentPosition';
import { diffElemTuple } from './position/positionTypes';

export const getAlignment = <T>(base:T[], target:T[]) : [T, T][] => {
    // Initialize an position object and the results array that we will return.
    const position = new AlignmentPosition<T>([base, target]);
    const results:diffElemTuple<T>[] = new Array();

    // Process the contents of both arrays. Continue to loop while either
    // index is still within the bounds of its array.
    while (position.somePositionInBounds()) {
        const [bCurr, tCurr]:diffElemTuple<T> = position.getCurrentElems();
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
                const [bNextMatch, tNextMatch] = getNextMatchingPositions(
                    base, target, bIndex, tIndex); // Find the next match.

                const remove:diffElemTuple<T>[] = // Find items that should be
                    getIndicesInRange(bIndex, bNextMatch) // removed from the base.
                    .map((val:number) : diffElemTuple<T> => [base[val], undefined]);
                results.push(...remove);

                const newItems:diffElemTuple<T>[] = // Find new items that should be
                    getIndicesInRange(tIndex, tNextMatch) // added to the base.
                    .map((val:number) : diffElemTuple<T> => [undefined, target[val]]);
                results.push(...newItems);

                position.setPositions([bNextMatch, tNextMatch]);
            } else if (bCurr != undefined) {
                results.push([bCurr, undefined]);
                position.incrementBasePosition();
            } else if (tCurr != undefined) {
                results.push([undefined, tCurr]);
                position.incrementTargetPosition();
            } else { // If none of the branches above were taken, throw an error.
                throw new Error('Unexpected error encountered while finding alignment!');
            }
        }
    }

    return results;
};
