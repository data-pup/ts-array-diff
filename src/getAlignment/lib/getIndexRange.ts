import { invalidIndexRangeError } from './errorMessages';

export const getIndexRange = <T>(min:number, max:number, arr:T[]) : number[] => {
    const [startIndex, endIndex] = [min, max === undefined ? arr.length : max];
    if (startIndex > endIndex) { throw new Error(invalidIndexRangeError); }
    const rangeSize = endIndex - startIndex;
    const indexRange = [...Array(rangeSize)].map((_, i) => startIndex + i);
    return indexRange;
};
