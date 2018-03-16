import { itemGroup, NoOpGroup, OpGroup } from '../../itemGroupTypes';
import { IDiffOp, SpliceDiffOp } from '../../diffops';

export const processBodyGroups = <T>(groups:itemGroup<T>[], index:number) : IDiffOp<T>[] =>  {
    const ops:IDiffOp<T>[] = new Array();
    if (groups === undefined) { return ops; }
    for (const group of groups) {
        switch (group.type) {
            case 'edit':
                const {removeCount, addItems} = (group as OpGroup<T>);
                ops.push(new SpliceDiffOp(index, removeCount, addItems.slice()));
                index += (addItems.length - removeCount);
                break;
            case 'noop':
                index += (group as NoOpGroup<T>).count;
                break;
            default:
                throw new Error('Unexpected group type found in body!');
        }
    }
    return ops;
};
