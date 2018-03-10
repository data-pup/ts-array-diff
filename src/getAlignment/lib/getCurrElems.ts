import {
    arrTuple,
    indexTuple,
} from '../../alignmentTypes';

export const getElems = <T>(pos:indexTuple, arrs:arrTuple<T>) : [T, T] => {
    return [0, 1].map((i) : T => arrs[i][pos[i]]) as [T, T];
};
