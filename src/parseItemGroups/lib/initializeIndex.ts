import { itemGroup, NoOpGroup, OpGroup } from '../../itemGroupTypes';

export const initializeIndex = <T>(group:itemGroup<T>) : number => {
    if (group === undefined) { return 0; }
    switch (group.type) {
        case 'edit': return (group as OpGroup<T>).addItems.length;
        case 'noop': return (group as NoOpGroup<T>).count;
    }
};
