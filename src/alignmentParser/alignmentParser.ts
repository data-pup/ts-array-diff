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
    const editGroups:alignmentSequence<T>[] = new Array();
    let group:alignmentSequence<T> = new Array();
    let groupType:tupleType = undefined;

    for (const currTuple of alignment) {
        const currType = getTupleType(currTuple);
        if (groupType === undefined) { groupType = currType; }

        if (currType === groupType) {
            group.push(currTuple);
        } else {
            editGroups.push(group);
            group = new Array(...[currTuple]);
            groupType = currType;
        }
    }

    if (group.length > 0) { editGroups.push(group); }
    return editGroups;
};
