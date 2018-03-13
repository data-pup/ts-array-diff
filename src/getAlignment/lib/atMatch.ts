import { bothInBounds } from './checkBounds';
import { getElems } from './getCurrElems';
import { arrTuple, indexTuple } from '../../alignmentTypes';

// Return a boolean representing if the current position tuple points to
// two matching elements in the base and target arrays.
export const atMatch = <T>(pos:indexTuple, arrs:arrTuple<T>) : boolean => {
    if (!bothInBounds(pos, arrs)) { return false; } // False if either is out of bounds.
    const [baseElem, targetElem]:[T, T] = getElems(pos, arrs);
    return baseElem === targetElem; // Select and compare the elements in each array.
};
