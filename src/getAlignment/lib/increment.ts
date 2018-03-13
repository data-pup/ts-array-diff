import { indexTuple } from '../../alignmentTypes';

// Return a new index tuple with both the base and target positions incremented.
export const incrementBaseAndTarget = (currPos:indexTuple) : indexTuple => {
    return [ currPos[0] + 1, currPos[1] + 1 ];
};

// Return a new index tuple with the base position incremented.
export const incrementBase = (currPos:indexTuple) : indexTuple => {
    return [ currPos[0] + 1, currPos[1] ];
};

// Return a new index tuple with the target position incremented.
export const incrementTarget = (currPos:indexTuple) : indexTuple => {
    return [ currPos[0], currPos[1] + 1 ];
};
