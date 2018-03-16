import { itemGroup } from '../itemGroupTypes';
import {
    // itemGroupTag,
    NoOpGroup,
    OpGroup,
} from '../itemGroupTypes';
import { IDiffOp } from '../diffops';
import {
    // ShiftDiffOp, UnshiftDiffOp,
    // SpliceDiffOp,
    PopDiffOp, PushDiffOp,
} from '../diffops';

// Parse a sequence of item groups, and return an array of diff operations.
export const parse = <T>(itemGroups:itemGroup<T>[]) : IDiffOp<T>[] => {

    // for each item group
    // : noop or an op
    // : what kind of op? construct
    const ops:IDiffOp<T>[] = new Array();

    /* tslint:disable-next-line:no-unused-variable */
    let currTargetPosition = 0;
    for (let i = 0; i < itemGroups.length; i++) {
        const currGroup = itemGroups[i];
        switch (currGroup.type) {
            case 'edit':
                const currEditGroup = currGroup as OpGroup<T>;
                if (i === itemGroups.length - 1) {
                    ops.push(...processTail(currEditGroup));
                    break;
                }
            case 'noop':
                const currNoopGroup = currGroup as NoOpGroup<T>;
                currTargetPosition += currNoopGroup.count;
                break;
            default:
                throw new Error('Unexpected group type!');
        }
    }

    return ops;
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
