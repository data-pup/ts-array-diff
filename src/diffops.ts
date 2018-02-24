// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

export interface IDiffOp<T> {
    type:DiffOpName;
    run(arr:T[]) : void;
}

// Union type for the various diff operations.
export type DiffOp<T> =
      DiffOpSplice<T>
    | DiffOpShift<T> | DiffOpUnshift<T>
    | DiffOpPop<T>   | DiffOpPush<T>;

// Union type to represent the different diff operation names.
export type DiffOpName =
      'splice'
    | 'shift' | 'unshift'
    | 'pop' | 'push';

// Remove a [...]
export class DiffOpSplice<T> implements IDiffOp<T> {
    public type:DiffOpName;
    public startIndex:number;
    public count:number;
    public items?:T[];
    public run(arr:T[]) : void { throw new Error('Not Implemented'); }
}

export class DiffOpShift<T> implements IDiffOp<T> {
    public type:DiffOpName;
    public count?:number;
    public run(arr:T[]) : void { throw new Error('Not Implemented'); }
}

export class DiffOpUnshift<T> implements IDiffOp<T> {
    public type:DiffOpName;
    public items:T[];
    public run(arr:T[]) : void { throw new Error('Not Implemented'); }
}

export class DiffOpPop<T> implements IDiffOp<T> {
    public type:DiffOpName;
    public count?:number;
    public run(arr:T[]) : void { throw new Error('Not Implemented'); }
}

export class DiffOpPush<T> implements IDiffOp<T> {
    public type:DiffOpName;
    public count?:number;
    public run(arr:T[]) : void { throw new Error('Not Implemented'); }
}
