import { arrTuple, elemTuple, indexTuple } from '../../alignmentTypes';

export const getElems = <T>(pos:indexTuple, arrs:arrTuple<T>) : elemTuple<T> => {
    return [0, 1].map((i) : T => arrs[i][pos[i]]) as elemTuple<T>;
};
