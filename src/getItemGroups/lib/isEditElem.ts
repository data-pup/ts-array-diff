import { alignmentSeqElem } from '../../alignmentTypes';

// Identify whether an alignment sequence element corresponds with an edit.
export const getIsEditElem = <T>(elem:alignmentSeqElem<T>) : boolean => {
    switch (elem.elemType) {
        case 'noop':
            return false;
        default:
            return true;
    }
};
