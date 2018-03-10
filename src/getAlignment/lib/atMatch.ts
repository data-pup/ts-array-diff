import { bothInBounds } from './checkBounds';
import { getElems } from './getCurrElems';
import { arrTuple, indexTuple } from '../../alignmentTypes';

export const atMatch = <T>(pos:indexTuple, arrs:arrTuple<T>) : boolean => {
    if (!bothInBounds(pos, arrs)) { return false; }
    const [baseElem, targetElem]:[T, T] = getElems(pos, arrs);
    return baseElem === targetElem;
};
