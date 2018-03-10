import { checkBounds } from './checkBounds';
import { getDistance } from './distance';
import { incrementBase, incrementTarget } from './increment';
import { arrTuple, indexTuple } from '../../alignmentTypes';

export const getNextMatch = <T>(pos:indexTuple,
                                arrs:arrTuple<T>) : indexTuple => {
    const bothInBounds:boolean = [0, 1] // Bounds check each index.
        .every((i:number) : boolean => checkBounds(pos[i], arrs[i]));
    if (!bothInBounds) { // Handle if a position is out of bounds.
        return arrs.map((arr:T[]) => arr.length) as indexTuple;
    } else if (arrs[0] === arrs[1]) {
        return pos; // Return the current position if it is a match.
    }

    const paths:indexTuple[] = [incrementBase(pos), incrementTarget(pos)];
    const pathMatches:indexTuple[] = paths // Follow each path to its next match.
        .map((path:indexTuple) : indexTuple => getNextMatch(path, arrs));
    const distances:number[] = pathMatches // Calculate each path's match distance.
        .map((newPos:indexTuple) : number => getDistance(pos, newPos));

    const bestPathIndex = distances.indexOf(Math.min(...distances));
    return pathMatches[bestPathIndex]; // Return the closest match position.
};
