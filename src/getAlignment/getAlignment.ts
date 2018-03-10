import { alignmentSequence, arrTuple, elemTuple, indexTuple } from '../alignmentTypes';
import { bothInBounds, someInBounds, checkBounds } from './lib/checkBounds';
import { getIndexRange } from './lib/getIndexRange';
import { getNextMatch } from './lib/getNextMatch';
import { incrementBaseAndTarget } from './lib/increment';

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

const getElems = <T>(pos:indexTuple, arrs:arrTuple<T>) : elemTuple<T> => {
    return [0, 1].map((i) : T => arrs[i][pos[i]]) as elemTuple<T>;
};

const atMatch = <T>(pos:indexTuple, arrs:arrTuple<T>) : boolean => {
    if (!bothInBounds(pos, arrs)) { return false; }
    const [baseElem, targetElem]:T[] = getElems(pos, arrs);
    return baseElem === targetElem;
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
