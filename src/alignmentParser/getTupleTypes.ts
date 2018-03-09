import { alignmentSequence, elemTuple, tupleType } from '../alignmentTypes';

export const invalidTupleErrorMessage = 'Invalid value encountered while processing tuple!';

export const getIsEditTupleFlags = <T>(alignment:alignmentSequence<T>) : boolean[] => {
    return alignment.map((t:elemTuple<T>) : boolean => isEditTuple(t));
};

export const getTupleTypes = <T>(alignment:alignmentSequence<T>)
                                : tupleType[] => {
    return alignment.map(
        (currTuple:elemTuple<T>) : tupleType => getTupleType(currTuple),
    );
};

export const getTupleType = <T>(tuple:elemTuple<T>) : tupleType => {
    if (tuple === undefined) {
        throw new Error(invalidTupleErrorMessage);
    } else if (tuple[0] === undefined && tuple[1] === undefined) {
        throw new Error(invalidTupleErrorMessage);
    } else if (tuple[0] === tuple[1]) {
        return 'noop';
    } else if (tuple[0] === undefined) {
        return 'add';
    } else if (tuple[1] === undefined) {
        return 'remove';
    } else {
        throw new Error(invalidTupleErrorMessage);
    }
};

export const isEditTuple = <T>(tuple:elemTuple<T>) : boolean => {
    const type = getTupleType(tuple);
    return type === 'add' || type === 'remove';
};