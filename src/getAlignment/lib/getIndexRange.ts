import { invalidIndexRangeError } from './errorMessages';

// Returns a range of numbers, beginning at min and ascending non-inclusively
// to the max index value. If invalid parameters are given, an error is thrown.
export const getIndexRange = (min:number, max:number) : number[] => {
    if (min > max) { throw new Error(invalidIndexRangeError); }
    const rangeSize = max - min;
    const indexRange = [...Array(rangeSize)].map((_, i) => min + i);
    return indexRange;
};
