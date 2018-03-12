import { itemGroup, itemGroupTag } from './lib/groupTypes';
// import { getSeqElemGroups } from './lib/getSeqElemGroups';
import {
    alignmentSeq,
    // alignmentSeqElem,
} from '../alignmentTypes';

export { itemGroup, itemGroupTag };

// Divide an alignment sequence into edit groups. This helps identify where
// changes have been made, and where no operations are required.
export const getItemGroups = <T>(alignment:alignmentSeq<T>)
                                : itemGroup<T>[] => {
    // const seqElemGroups:alignmentSeqElem<T>[][] = getSeqElemGroups(alignment);
    throw new Error('');
};
