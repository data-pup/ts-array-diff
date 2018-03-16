import { itemGroup, NoOpGroup, OpGroup } from '../../itemGroupTypes';
import { IDiffOp, SpliceDiffOp } from '../../diffops';

export const processBodyGroups = <T>(groups:itemGroup<T>[], index:number) : IDiffOp<T>[] =>  {
    const ops:IDiffOp<T>[] = new Array();
    if (groups === undefined) { return ops; }
    for (const group of groups) {
        const {delta, op} = processBodyGroup(group, index);
        if (op !== undefined) { ops.push(op); }
        index += delta;
    }
    return ops;
};

const processBodyGroup = <T>(group:itemGroup<T>, index:number) : {delta:number, op:SpliceDiffOp<T>} => {
    switch (group.type) {
        case 'edit':
            const {removeCount, addItems} = (group as OpGroup<T>);
            return {
                delta:(addItems.length - addItems.length),
                op:new SpliceDiffOp(index, removeCount, addItems.slice()),
            };
        case 'noop':
            return {
                delta:(group as NoOpGroup<T>).count,
                op:undefined,
            };
        default:
            throw new Error('Unexpected group type found in body!');
    }
};
