import { atMatch } from './atMatch';
import { bothInBounds } from './checkBounds';
import { getDistance } from './distance';
import { incrementBase, incrementTarget } from './increment';
import { arrTuple, indexTuple } from '../../alignmentTypes';

// Return an index tuple containing the closest position at which the elements
// in the base and target match. If the current position is a match, return
// the given position. If no match exists, return the lengths of the arrays.
export const getNextMatch = <T>(pos:indexTuple,
                                arrs:arrTuple<T>) : indexTuple => {
    if (!bothInBounds(pos, arrs)) {
        return arrs.map((arr:T[]) => arr.length) as indexTuple;
    } else if (atMatch(pos, arrs)) {
        return pos;
    }

    // Initialize an array of the possible paths forward.
    const paths:indexTuple[] = [incrementBase(pos), incrementTarget(pos)];
    const pathMatches:indexTuple[] = paths // Follow each path to its next match.
        .map((path:indexTuple) : indexTuple => getNextMatch(path, arrs));
    const distances:number[] = pathMatches // Calculate each path's match distance.
        .map((newPos:indexTuple) : number => getDistance(pos, newPos));

    const bestPathIndex = distances.indexOf(Math.min(...distances));
    return pathMatches[bestPathIndex]; // Return the closest match position.
};
