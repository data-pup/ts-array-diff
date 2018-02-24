// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

export interface IDiffOp {
    type:DiffOpName;
}

export const runDiffOp = () : void => {
    throw new Error('Not Implemented');
};

export type DiffOp<T> =
      DiffOpSplice<T>
    | DiffOpShift | DiffOpUnshift<T>
    | DiffOpPop   | DiffOpPush<T>;

export type DiffOpName =
      'splice'
    | 'shift' | 'unshift'
    | 'pop' | 'push';

export class DiffOpSplice<T> implements IDiffOp {
    public type:DiffOpName;
    public startIndex:number;
    public count:number;
    public items?:T[];
}

export class DiffOpShift implements IDiffOp {
    public type:DiffOpName;
    public count?:number;
}

export class DiffOpUnshift<T> implements IDiffOp {
    public type:DiffOpName;
    public items:T[];
}

export class DiffOpPop implements IDiffOp {
    public type:DiffOpName;
    public count?:number;
}

export class DiffOpPush<T> implements IDiffOp {
    public type:DiffOpName;
    public items:T[];
}
