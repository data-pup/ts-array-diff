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
                    opSeq.push(...processTailOp(currEditGroup));
                    break;
                } else if (i === 0) { // Process the head.
                    const {delta, ops} = processHeadOp(currEditGroup);
                    opSeq.push(...ops);
                    currBaseStatePos += delta;
                    break;
                } else { // Process splice operations in the body.
                    const {delta, op} = processBodyOp(currEditGroup, currBaseStatePos);
                    opSeq.push(op);
                    currBaseStatePos += delta;
                    break;
                }
            case 'noop': // Process a NoOpGroup.
                const currNoopGroup = currGroup as NoOpGroup<T>;
                currBaseStatePos += processNoOp(currNoopGroup);
                break;
            default:
                throw new Error('Unexpected group type!');
        }
    }

    return opSeq; // Return the op sequence array.
};

const processNoOp = <T>(group:NoOpGroup<T>) : number => group.count;

const processHeadOp = <T>(group:OpGroup<T>) : {delta:number, ops:IDiffOp<T>[]} => {
    const {removeCount, addItems} = group;
    const addCount = addItems.length;
    return {
        delta:(addCount - removeCount),
        ops:[
            removeCount > 0 ? new ShiftDiffOp(removeCount) : undefined,
            addCount > 0 ? new UnshiftDiffOp(addItems.slice()) : undefined,
        ].filter((op) => op !== undefined),
    };
};

const processBodyOp = <T>(group:OpGroup<T>, pos:number) : {delta:number, op:IDiffOp<T>} => {
    const {removeCount, addItems} = group;
    const addCount = addItems.length;
    return {
        delta:(addCount - removeCount),
        op:new SpliceDiffOp(pos, removeCount, addItems.slice()),
    };
};

const processTailOp = <T>(group:OpGroup<T>) : IDiffOp<T>[] => {
    const {removeCount, addItems} = group;
    return [
        removeCount > 0 ? new PopDiffOp(removeCount) : undefined,
        addItems.length > 0 ? new PushDiffOp(addItems.slice()) : undefined,
    ].filter((op) => op !== undefined);
};
