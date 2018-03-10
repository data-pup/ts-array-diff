import { arrTuple, indexTuple } from '../../alignmentTypes';

export const checkBounds = <T>(i:number, arr:T[]) : boolean => {
    return (i !== undefined) && (arr !== undefined)
           && (i >= 0) && (i < arr.length);
};

export const someInBounds = <T>(pos:indexTuple, arrs:arrTuple<T>) : boolean => {
    throw new Error('Not Implemented Yet!');
};

export const bothInBounds = <T>(pos:indexTuple, arrs:arrTuple<T>) : boolean => {
    throw new Error('Not Implemented Yet!');
};
