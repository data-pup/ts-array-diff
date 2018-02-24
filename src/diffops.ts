// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

// Run a series of operations on the array in sequence.
export const runOps = <T>(arr:T[], ops:DiffOpBase<T>[]) : void => {
    ops.forEach((op) : void => {
        op.runOp(arr);
    });
};

// The interface for the diff operations. These objects must have a type field.
export interface IDiffOp {
    readonly type:DiffOpName;
}

// Union type so tagged unions of operations can be defined.
export type DiffOp<T> =
      DiffOpSplice<T>
    | DiffOpShift<T> | DiffOpUnshift<T>
    | DiffOpPop<T>   | DiffOpPush<T>;

// Operation name type, this specifies acceptable values for the type field.
export type DiffOpName = 'splice' | 'shift' | 'unshift' | 'pop' | 'push';

// Base class that the operation classes will extend.
abstract class DiffOpBase<T> implements IDiffOp {
    public abstract readonly type:DiffOpName;
    public abstract runOp(arr:T[]) : void;
}

// This class is used to invoke the splice method on a given array. Splice
// is used to remove a number of items from an array, starting at a specific
// index, and optionally replacing the deleted values with a new set of items.
export class DiffOpSplice<T> extends DiffOpBase<T> {
    public type:DiffOpName;
    public startIndex:number;
    public count:number;
    public items:T[];
    public runOp(arr:T[]) : void {
        arr.splice(this.startIndex, this.count, ...this.items);
    }
    constructor(start:number, count:number, items?:T[]) {
        super();
        this.startIndex = start;
        this.count = count;
        this.items = (items || []);
    }
}

// Pop items off of the front of a given array.
export class DiffOpShift<T> extends DiffOpBase<T> {
    public type:DiffOpName;
    public count:number;
    public runOp(arr:T[]) : void {
        let i = 0;
        while (i < this.count) {
            arr.shift();
            i++;
        }
    }
    constructor(count?:number) {
        super();
        this.count = (count || 1);
        this.type = 'shift';
    }
}

// Insert items into the front of a given array.
export class DiffOpUnshift<T> extends DiffOpBase<T> {
    public type:DiffOpName;
    public items:T[];
    public runOp(arr:T[]) : void {
        for (const item of this.items) {
            arr.unshift(item);
        }
    }
    constructor(items:T[]) {
        super();
        this.items = items;
        this.type = 'unshift';
    }
}

// Pop a number of items off of the end of a given array.
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

// Push a set of items on to the end of a given array.
export class DiffOpPush<T> extends DiffOpBase<T> {
    public readonly type:DiffOpName;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        for (const item of this.items) {
            arr.push(item);
        }
    }
    constructor(items:T[]) {
        super();
        this.items = items;
        this.type = 'push';
    }
}
