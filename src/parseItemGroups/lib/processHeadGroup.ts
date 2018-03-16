import { itemGroup, OpGroup } from '../../itemGroupTypes';
import { IDiffOp, ShiftDiffOp, UnshiftDiffOp } from '../../diffops';

export const processHeadGroup = <T>(group:itemGroup<T>) : IDiffOp<T>[] => {
    if (group === undefined) { return new Array(); }
    switch (group.type) {
        case 'edit': return processHeadOp(group as OpGroup<T>);
        case 'noop': return new Array();
        default:
            throw new Error('Unexpected group type found in body!');
    }
};

const processHeadOp = <T>(group:OpGroup<T>) : IDiffOp<T>[] => {
    const {removeCount, addItems} = group;
    const addCount = addItems.length;
    return [
        removeCount > 0 ? new ShiftDiffOp(removeCount) : undefined,
        addCount > 0 ? new UnshiftDiffOp(addItems.slice()) : undefined,
    ].filter((op) => op !== undefined);
};
