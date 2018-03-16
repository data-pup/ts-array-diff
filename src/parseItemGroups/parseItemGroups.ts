import { itemGroup } from '../itemGroupTypes';
import {
    // itemGroupTag,
    NoOpGroup,
    OpGroup,
} from '../itemGroupTypes';
import { IDiffOp, SpliceDiffOp } from '../diffops';
import {
    ShiftDiffOp, UnshiftDiffOp,
    // SpliceDiffOp,
    PopDiffOp, PushDiffOp,
} from '../diffops';

// Parse a sequence of item groups, and return an array of diff operations.
export const parse = <T>(itemGroups:itemGroup<T>[]) : IDiffOp<T>[] => {
    const tailGroup:itemGroup<T> = itemGroups.pop();   // Divide the item groups
    const headGroup:itemGroup<T> = itemGroups.shift(); // into a head, tail, and
    const bodyGroups:itemGroup<T>[] = itemGroups;      // array of body elements.

    const {index, ops} = processHeadGroup(headGroup);  // Process the head, body,
    ops.push(...processBodyGroups(bodyGroups, index)); // and tail of the groups
    ops.push(...processTailGroup(tailGroup));          // array in sequence.

    return ops; // Return the diff operation sequence.
};

const processHeadGroup = <T>(group:itemGroup<T>) : {index:number, ops:IDiffOp<T>[]} => {
    if (group === undefined) { return {index:0, ops:new Array()}; }
    switch (group.type) {
        case 'edit': return processHeadOp(group as OpGroup<T>);
        case 'noop':
            return {
                index:(group as NoOpGroup<T>).count,
                ops: new Array(),
            };
        default:
            throw new Error('Unexpected group type found in body!');
    }
};

const processHeadOp = <T>(group:OpGroup<T>) : {index:number, ops:IDiffOp<T>[]} => {
    const {removeCount, addItems} = group;
    const addCount = addItems.length;
    return {
        index:(addCount - removeCount),
        ops:[
            removeCount > 0 ? new ShiftDiffOp(removeCount) : undefined,
            addCount > 0 ? new UnshiftDiffOp(addItems.slice()) : undefined,
        ].filter((op) => op !== undefined),
    };
};

const processTailGroup = <T>(group:itemGroup<T>) : IDiffOp<T>[] => {
    if (group === undefined) { return new Array(); }
    switch (group.type) {
        case 'edit': return processTailOp(group as OpGroup<T>);
        case 'noop': return new Array();
    }
};

const processTailOp = <T>(group:OpGroup<T>) : IDiffOp<T>[] => {
    const {removeCount, addItems} = group;
    return [
        removeCount > 0 ? new PopDiffOp(removeCount) : undefined,
        addItems.length > 0 ? new PushDiffOp(addItems.slice()) : undefined,
    ].filter((op) => op !== undefined);
};

const processBodyGroups = <T>(groups:itemGroup<T>[], index:number) : IDiffOp<T>[] =>  {
    const ops:IDiffOp<T>[] = new Array();
    if (groups === undefined) { return ops; }
    for (const group of groups) {
        switch (group.type) {
            case 'edit':
                const op = group as OpGroup<T>;
                const {removeCount, addItems} = op;
                ops.push(new SpliceDiffOp(index, removeCount, addItems.slice()));
                index += (addItems.length - removeCount);
                break;
            case 'noop':
                const noop = group as NoOpGroup<T>;
                index += noop.count;
                break;
            default:
                throw new Error('Unexpected group type found in body!');
        }
    }
    return ops;
};
