import { arrTuple, indexTuple } from '../../alignmentTypes';

// Return true/false depending on whether an index is in bounds of an array.
export const checkBounds = <T>(i:number, arr:T[]) : boolean => {
    return (i !== undefined) && (arr !== undefined)
           && (i >= 0) && (i < arr.length);
};

// Returns true if one of the indices in the index tuple is within the bounds
// of its respective array. Returns false if neither of the indices are in bounds.
export const someInBounds = <T>(pos:indexTuple, arrs:arrTuple<T>) : boolean => {
    return [0, 1].some((i:number) : boolean => checkBounds(pos[i], arrs[i]));
};

// Returns true if both indices in the index tuple are within the bounds of
// their respective arrays. Returns false if one is out of bounds.
export const bothInBounds = <T>(pos:indexTuple, arrs:arrTuple<T>) : boolean => {
    return [0, 1].every((i:number) : boolean => checkBounds(pos[i], arrs[i]));
};
