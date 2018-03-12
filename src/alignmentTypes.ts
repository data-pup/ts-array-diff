// Alignment generation types.
export type arrTuple<T> = [T[], T[]];
export type boundsTuple = [boolean, boolean];
export type indexTuple = [number, number];

// Alignment sequence types.
export type alignmentSeq<T> = alignmentSeqElem<T>[];
export type alignmentSeqElem<T> = { elemValue:T; elemType:alignmentSeqElemType };
export type alignmentSeqElemType = 'noop' | 'add' | 'remove';

// Alignment sequence group types.
import { NoOpGroup } from './parseAlignment/lib/noOpGroup';
import { OpGroup } from './parseAlignment/lib/opGroup';
export type seqGroupType = 'noop' | 'edit';
export type seqGroup<T> = OpGroup<T> | NoOpGroup<T>;
