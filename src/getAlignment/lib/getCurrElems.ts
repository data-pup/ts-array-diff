import {
    arrTuple,
    indexTuple,
} from '../../alignmentTypes';

// Return a tuple containing the elements at the current position in the
// base and target arrays. (Bounds check should already be performed.)
export const getElems = <T>(pos:indexTuple, arrs:arrTuple<T>) : [T, T] => {
    return [0, 1].map((i) : T => arrs[i][pos[i]]) as [T, T];
};
