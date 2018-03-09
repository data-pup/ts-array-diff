import { indexTuple } from '../../alignmentTypes';

export const incrementBaseAndTarget = (currPos:indexTuple) : indexTuple => {
    return [ currPos[0] + 1, currPos[1] + 1 ];
};

export const incrementBase = (currPos:indexTuple) : indexTuple => {
    return [ currPos[0] + 1, currPos[1] ];
};

export const incrementTarget = (currPos:indexTuple) : indexTuple => {
    return [ currPos[0], currPos[1] + 1 ];
};
