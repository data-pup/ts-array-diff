import {
    alignmentSeq,
    alignmentSeqElem,
} from '../alignmentTypes';

// Divide an alignment sequence into edit groups. This helps identify where
// changes have been made, and where no operations are required.
export const getEditGroups = <T>(alignment:alignmentSeq<T>)
                                : alignmentSeq<T>[] => {
    const results:alignmentSeq<T>[] = new Array();
    let currGroup:alignmentSeq<T> = new Array();
    let isEditGroup:boolean = undefined;

    for (const currElem of alignment) {
        const isEditElem:boolean = getIsEditElem(currElem);
        if (isEditGroup === undefined) { isEditGroup = isEditElem; }

        if (isEditElem === isEditGroup) { // Add the current element to the
            currGroup.push(currElem); // current group if it is of the same type.
        } else { // Push the previous group and create a new one if a new
            results.push(currGroup); // element type has been encountered.
            currGroup = new Array(...[currElem]);
            isEditGroup = isEditElem;
        }
    }

    if (currGroup.length > 0) { results.push(currGroup); }
    return results; // Add the remaining group if it is not empty and return.
};

// Identify whether an alignment sequence element corresponds with an edit.
const getIsEditElem = <T>(elem:alignmentSeqElem<T>) : boolean => {
    switch (elem.elemType) {
        case 'noop':
            return false;
        default:
            return true;
    }
};
