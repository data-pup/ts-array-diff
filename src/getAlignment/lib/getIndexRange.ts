import { invalidIndexRangeError } from './errorMessages';

export const getIndexRange = (min:number, max:number) : number[] => {
    if (min > max) { throw new Error(invalidIndexRangeError); }
    const rangeSize = max - min;
    const indexRange = [...Array(rangeSize)].map((_, i) => min + i);
    return indexRange;
};
