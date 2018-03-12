import { getSeqElemGroups } from './lib/getSeqElemGroups';
import { itemGroup, itemGroupTag } from './lib/groupTypes';
import { getIsEditElem } from './lib/isEditElem';
import { OpGroup } from './lib/opGroup';
import { NoOpGroup } from './lib/noOpGroup';
import {
    alignmentSeq,
    alignmentSeqElem,
} from '../alignmentTypes';

export { itemGroup, itemGroupTag };

// Divide an alignment sequence into edit groups. This helps identify where
// changes have been made, and where no operations are required.
export const getItemGroups = <T>(alignment:alignmentSeq<T>)
                                : itemGroup<T>[] => {
    const seqElemGroups:alignmentSeqElem<T>[][] = getSeqElemGroups(alignment);
    return seqElemGroups.map((currElems) => createItemGroupFromSeqGroup(currElems));
};

const createItemGroupFromSeqGroup = <T>(elemGroup:alignmentSeqElem<T>[])
                                        : itemGroup<T> => {
    const firstGroupElem:alignmentSeqElem<T> = elemGroup[0];
    const isEditGroup = getIsEditElem(firstGroupElem);
    return isEditGroup
        ? new OpGroup<T>(elemGroup)
        : new NoOpGroup<T>(elemGroup);
};
