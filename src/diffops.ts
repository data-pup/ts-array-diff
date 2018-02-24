// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

export const runOps = <T>(arr:T[], ops:DiffOpBase<T>[]) : void => {
    ops.forEach((op) : void => {
        op.runOp(arr);
    });
};

export interface IDiffOp {
    readonly type:DiffOpName;
}

export type DiffOp<T> =
      DiffOpSplice<T>
    | DiffOpShift<T> | DiffOpUnshift<T>
    | DiffOpPop<T>   | DiffOpPush<T>;

export type DiffOpName =
      'splice'
    | 'shift' | 'unshift'
    | 'pop' | 'push';

abstract class DiffOpBase<T> implements IDiffOp {
    public abstract readonly type:DiffOpName;
    public abstract runOp(arr:T[]) : void;
}

export class DiffOpSplice<T> extends DiffOpBase<T> {
    public type:DiffOpName;
    public startIndex:number;
    public count:number;
    public items?:T[];
    public runOp(arr:T[]) : void {
        throw new Error('Not Implemented!');
    }
    constructor() {
        super();
        throw new Error('Not Implemented Yet!');
    }
}

export class DiffOpShift<T> extends DiffOpBase<T> {
    public type:DiffOpName;
    public count?:number;
    public runOp(arr:T[]) : void {
        throw new Error('Not Implemented!');
    }
    constructor() {
        super();
        throw new Error('Not Implemented Yet!');
    }
}

export class DiffOpUnshift<T> extends DiffOpBase<T> {
    public type:DiffOpName;
    public items:T[];
    public runOp(arr:T[]) : void {
        throw new Error('Not Implemented!');
    }
    constructor() {
        super();
        throw new Error('Not Implemented Yet!');
    }
}

export class DiffOpPop<T> extends DiffOpBase<T> {
    public readonly type:DiffOpName;
    public readonly count:number;
    public runOp(arr:T[]) : void {
        let i = 0;
        while (i < this.count) {
            arr.pop();
            i++;
        }
    }
    constructor(count?:number) {
        super();
        this.count = (count || 1);
        this.type = 'pop';
    }
}

export class DiffOpPush<T> extends DiffOpBase<T> {
    public readonly type:DiffOpName;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        for (const item of this.items) {
            arr.push(item);
        }
    }
    constructor(i:T[]) {
        super();
        this.items = i;
        this.type = 'push';
    }
}
