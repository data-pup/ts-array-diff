import { getIsEditElem } from './isEditElem';
import {
    alignmentSeq,
    alignmentSeqElem,
} from '../../alignmentTypes';

export const getSeqElemGroups = <T>(alignment:alignmentSeq<T>)
                                   : alignmentSeqElem<T>[][] => {
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
