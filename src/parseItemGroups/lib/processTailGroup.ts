import { itemGroup, OpGroup } from '../../itemGroupTypes';
import { IDiffOp, PopDiffOp, PushDiffOp } from '../../diffops';

export const processTailGroup = <T>(group:itemGroup<T>) : IDiffOp<T>[] => {
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
