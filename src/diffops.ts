// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

export interface IDiffOp {
    readonly type:DiffOpName;
}

export type DiffOp<T> =
      DiffOpSplice<T>
    | DiffOpShift | DiffOpUnshift<T>
    | DiffOpPop   | DiffOpPush<T>;

export type DiffOpName =
      'splice'
    | 'shift' | 'unshift'
    | 'pop' | 'push';

abstract class DiffOpBase<T> {
    abstract runOp(arr:T[]) : void;
}

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

export class DiffOpPush<T> extends DiffOpBase<T> implements IDiffOp {
    public readonly type:DiffOpName;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        process.stdout.write('Hello from DiffOpPush\'s runOp procedure!');
    }
}
