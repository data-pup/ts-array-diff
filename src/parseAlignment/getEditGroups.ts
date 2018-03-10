import {
    alignmentSeq,
    alignmentSeqElem,
} from '../alignmentTypes';

export const getEditGroups = <T>(alignment:alignmentSeq<T>)
                                : alignmentSeq<T>[] => {
    const results:alignmentSeq<T>[] = new Array();

    let currGroup:alignmentSeq<T> = new Array();
    let isEditGroup:boolean = undefined;

    for (const currElem of alignment) {
        const isEditElem:boolean = getIsEditElem(currElem);
        if (isEditGroup === undefined) { isEditGroup = isEditElem; }

        if (isEditElem === isEditGroup) {
            currGroup.push(currElem);
        } else {
            results.push(currGroup);
            currGroup = new Array(...[currElem]);
            isEditGroup = isEditElem;
        }
    }

    if (currGroup.length > 0) { results.push(currGroup); }
    return results;
};

const getIsEditElem = <T>(elem:alignmentSeqElem<T>) : boolean => {
    switch (elem.elemType) {
        case 'noop':
            return false;
        default:
            return true;
    }
};