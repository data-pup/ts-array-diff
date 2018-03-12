import { seqGroup, seqGroupType } from './lib/groupTypes';
import { alignmentSeq } from '../alignmentTypes';

export { seqGroup, seqGroupType };

// Divide an alignment sequence into edit groups. This helps identify where
// changes have been made, and where no operations are required.
export const getItemGroups = <T>(alignment:alignmentSeq<T>)
                                : seqGroup<T>[] => {
    throw new Error('Not Implemented');
};
