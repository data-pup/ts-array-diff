import { initializeIndex } from './lib/initializeIndex';
import { processHeadGroup } from './lib/processHeadGroup';
import { processBodyGroups } from './lib/processBody';
import { processTailGroup } from './lib/processTailGroup';
import { itemGroup } from '../itemGroupTypes';
import { IDiffOp } from '../diffops';

// Parse a sequence of item groups, and return an array of diff operations.
export const parse = <T>(itemGroups:itemGroup<T>[]) : IDiffOp<T>[] => {
    const tail:itemGroup<T> = itemGroups.pop();
    const head:itemGroup<T> = itemGroups.shift();
    const body:itemGroup<T>[] = itemGroups;

    const index = initializeIndex(head);

    return [
        ...processHeadGroup(head),
        ...processBodyGroups(body, index),
        ...processTailGroup(tail),
    ];
};
