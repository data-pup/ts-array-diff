import { atMatch } from './lib/atMatch';
import { someInBounds, checkBounds } from './lib/checkBounds';
import { incrementBaseAndTarget } from './lib/increment';
import { getIndexRange } from './lib/getIndexRange';
import { getNextMatch } from './lib/getNextMatch';
import {
    alignmentSeq,
    alignmentSeqElem,
    arrTuple,
    indexTuple,
} from '../alignmentTypes';

export const getAlignment = <T>(base:T[], target:T[]) : alignmentSeq<T> => {
    const alignment:alignmentSeq<T> = new Array();
    const arrs:arrTuple<T> = [base, target] as arrTuple<T>;
    const addRangeFunctions = [getBaseItemsToRemove, getTargetItemsToAdd];
    let currPos:indexTuple = [0, 0];

    while (someInBounds(currPos, arrs)) { // Continue looping while some index is in bounds.
        if (atMatch(currPos, arrs)) { // Process a match, add the current item
            alignment.push({elemValue: base[currPos[0]], elemType:'noop'});
            currPos = incrementBaseAndTarget(currPos);
        } else { // Handle a position where the elements do not match.
            const newPos:indexTuple = getNextMatch(currPos, arrs);
            [0, 1].forEach((i:number) : void => {
                if (checkBounds(currPos[i], arrs[i])) {
                    alignment.push(...addRangeFunctions[i](currPos[i], newPos[i], arrs[i]));
                }
            });
            currPos = newPos;
        }
    }

    return alignment;
};

const getBaseItemsToRemove = <T>(startIndex:number, endIndex:number,
                                 base:T[]) : alignmentSeqElem<T>[] => {
    const indexRange:number[] = getIndexRange(startIndex, endIndex);
    return indexRange.map((i) : alignmentSeqElem<T> => {
        return {elemValue:base[i], elemType:'remove'};
    });
};

const getTargetItemsToAdd = <T>(startIndex:number, endIndex:number,
                                target:T[]) : alignmentSeqElem<T>[] => {
    const indexRange:number[] = getIndexRange(startIndex, endIndex);
    return indexRange.map((i) : alignmentSeqElem<T> => {
        return {elemValue:target[i], elemType:'add'};
    });
};
