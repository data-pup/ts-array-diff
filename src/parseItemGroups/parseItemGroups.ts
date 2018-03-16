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

    const opSeq:IDiffOp<T>[] = new Array(); // Initialize the op sequence array.

    let currBaseStatePos = 0;
    for (let i = 0; i < itemGroups.length; i++) {
        const currGroup = itemGroups[i];
        switch (currGroup.type) {
            case 'edit': // Process an edit group.
                const currEditGroup = currGroup as OpGroup<T>;
                if (i === itemGroups.length - 1) { // Process the tail.
                    opSeq.push(...processTail(currEditGroup));
                    break;
                } else if (i === 0) { // Process the head.
                    const {delta, ops} = processHead(currEditGroup);
                    opSeq.push(...ops);
                    currBaseStatePos += delta;
                    break;
                } else { // Process splice operations in the body.
                    const {delta, op} = processBody(currEditGroup, currBaseStatePos);
                    opSeq.push(op);
                    currBaseStatePos += delta;
                }
            case 'noop': // Process a NoOpGroup.
                const currNoopGroup = currGroup as NoOpGroup<T>;
                currBaseStatePos += currNoopGroup.count;
                break;
            default:
                throw new Error('Unexpected group type!');
        }
    }

    return opSeq; // Return the op sequence array.
};

const processHead = <T>(group:OpGroup<T>) : {delta:number, ops:IDiffOp<T>[]} => {
    let delta = 0;
    const ops:IDiffOp<T>[] = new Array();
    if (group.removeCount > 0) {
        delta -= group.removeCount;
        ops.push(new ShiftDiffOp(group.removeCount));
    }
    if (group.addItems.length > 0) {
        delta += group.addItems.length;
        ops.push(new UnshiftDiffOp(group.addItems.slice()));
    }
    return {delta, ops};
};

const processBody = <T>(group:OpGroup<T>, position:number) : {delta:number, op:IDiffOp<T>} => {
    const {removeCount, addItems} = group;
    const delta = addItems.length - removeCount;
    const op = new SpliceDiffOp(position, removeCount, addItems.slice());
    return {delta, op};
};

const processTail = <T>(group:OpGroup<T>) : IDiffOp<T>[] => {
    const results = [];
    if (group.removeCount > 0) {
        results.push(new PopDiffOp(group.removeCount));
    }
    if (group.addItems.length > 0) {
        results.push(new PushDiffOp(group.addItems.slice()));
    }
    return results;
};
