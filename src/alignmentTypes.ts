export type alignmentSequence<T> = elemTuple<T>[];
export type arrTuple<T> = [T[], T[]];
export type boundsTuple = [boolean, boolean];
export type elemTuple<T> = [T, T];
export type indexTuple = [number, number];
export type tupleType = 'noop' | 'add' | 'remove';
