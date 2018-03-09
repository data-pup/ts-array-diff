import {
    alignmentSequence,
    // elemTuple,
    tupleType,
} from '../alignmentTypes';
import { getTupleType } from './getTupleTypes';

export const parse = <T>(alignment:alignmentSequence<T>)
                        : void => {
    throw new Error('Not Implemented Yet!');
};

export const getEditGroups = <T>(alignment:alignmentSequence<T>)
                                : alignmentSequence<T>[] => {
    const editTupleTypes:tupleType[] = ['add', 'remove'];
    const editGroups:alignmentSequence<T>[] = new Array();
    let group:alignmentSequence<T> = new Array();
    let [isEditGroup, isEditTuple]:[boolean, boolean] = [undefined, undefined];

    for (const currTuple of alignment) {
        const currType = getTupleType(currTuple);
        isEditTuple = editTupleTypes.indexOf(currType) > -1;
        if (isEditGroup === undefined) { isEditGroup = isEditTuple; }

        if (isEditTuple === isEditGroup) {
            group.push(currTuple);
        } else {
            editGroups.push(group);
            group = new Array(...[currTuple]);
            isEditGroup = isEditTuple;
        }
    }

    if (group.length > 0) { editGroups.push(group); }
    return editGroups;
};
