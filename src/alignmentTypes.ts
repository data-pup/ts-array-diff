// Alignment generation types.
export type arrTuple<T> = [T[], T[]];
export type boundsTuple = [boolean, boolean];
export type indexTuple = [number, number];

// Alignment sequence types.
export type alignmentSeq<T> = alignmentSeqElem<T>[];
export type alignmentSeqElem<T> = { elemValue:T; elemType:alignmentSeqElemTag };
export type alignmentSeqElemTag = 'noop' | 'add' | 'remove';
