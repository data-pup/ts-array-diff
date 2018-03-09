import { indexTuple } from '../../alignmentTypes';

export const getDistance = (a:indexTuple, b:indexTuple) : number => {
    return [0, 1]
        .map((i:number) : number => b[i] - a[i])
        .reduce((sum, curr) => sum += curr, 0);
};
