import {
    alignmentSequence,
    elemTuple,
} from '../alignmentTypes';
import { getIsEditTupleFlags } from './getTupleTypes';

export const parse = <T>(alignment:alignmentSequence<T>)
                        : void => {
    throw new Error('Not Implemented Yet!');
};

export const getEditGroups = <T>(alignment:alignmentSequence<T>)
                                : alignmentSequence<T>[] => {
    const editFlags = getIsEditTupleFlags(alignment);
    const results:alignmentSequence<T>[] = new Array();
    let currGroup:alignmentSequence<T> = new Array();
    let isEditGroup:boolean = undefined;

    for (let i = 0; i < alignment.length; i++) {
        const currTuple:elemTuple<T> = alignment[i];
        const isEditTuple:boolean = editFlags[i];
        if (isEditGroup === undefined) { isEditGroup = isEditTuple; }

        if (isEditTuple === isEditGroup) {
            currGroup.push(currTuple);
        } else {
            results.push(currGroup);
            currGroup = new Array(...[currTuple]);
            isEditGroup = isEditTuple;
        }
    }

    if (currGroup.length > 0) { results.push(currGroup); }
    return results;
};