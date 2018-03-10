import { atMatch } from './lib/atMatch';
import { someInBounds, checkBounds } from './lib/checkBounds';
import { incrementBaseAndTarget } from './lib/increment';
import { getElems } from './lib/getCurrElems';
import { getIndexRange } from './lib/getIndexRange';
import { getNextMatch } from './lib/getNextMatch';
import { alignmentSequence, arrTuple, elemTuple, indexTuple } from '../alignmentTypes';

export const getAlignment = <T>(base:T[], target:T[]) : alignmentSequence<T> => {
    const alignment:alignmentSequence<T> = new Array();
    const arrs:arrTuple<T> = [base, target] as arrTuple<T>;
    const addRangeFunctions = [getBaseItemsToRemove, getTargetItemsToAdd];
    let currPos:indexTuple = [0, 0];

    while (someInBounds(currPos, arrs)) { // Continue looping while some index is in bounds.
        if (atMatch(currPos, arrs)) { // Process a match, add the current item
            alignment.push(getElems(currPos, arrs)); // and increment each index.
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
                                 base:T[]) : elemTuple<T>[] => {
    const indexRange:number[] = getIndexRange(startIndex, endIndex);
    return indexRange.map((i) : elemTuple<T> => [base[i], undefined]);
};

const getTargetItemsToAdd = <T>(startIndex:number, endIndex:number,
                                target:T[]) : elemTuple<T>[] => {
    const indexRange:number[] = getIndexRange(startIndex, endIndex);
    return indexRange.map((i) : elemTuple<T> => [undefined, target[i]]);
};
