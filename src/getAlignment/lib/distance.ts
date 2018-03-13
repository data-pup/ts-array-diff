import { indexTuple } from '../../alignmentTypes';

// Calculate the distance between two index tuple positions.
export const getDistance = (a:indexTuple, b:indexTuple) : number => {
    return [0, 1]
        .map((i:number) : number => b[i] - a[i])
        .reduce((sum, curr) => sum += curr, 0);
};
