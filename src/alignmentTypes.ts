// Alignment generation types.
export type arrTuple<T> = [T[], T[]];
export type boundsTuple = [boolean, boolean];
export type indexTuple = [number, number];

// Alignment sequence types.
export type alignmentSeq<T> = alignmentSeqElem<T>[];
export type alignmentSeqElem<T> = { elemValue:T; elemType:alignmentSeqElemType };
export type alignmentSeqElemType = 'noop' | 'add' | 'remove';

// Edit group types.
export type groupType = 'noop' | 'edit';
export type opGroup<T> = {
    type:groupType;
    addItems?:T[];
    removeItems?:T[]
};
export type noOpGroup<T> = {
    type:groupType;
    items:T[];
};
export type editGroup<T> = opGroup<T> | noOpGroup<T>;
