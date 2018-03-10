// Alignment generation types.
export type arrTuple<T> = [T[], T[]];
export type boundsTuple = [boolean, boolean];
export type indexTuple = [number, number];

// Alignment sequence types.
export type alignmentSeq<T> = alignmentSeqElem<T>[];
export type alignmentSeqElem<T> = { val:T; elemType:alignmentSeqElemType };
export type alignmentSeqElemType = 'noop' | 'add' | 'remove';
