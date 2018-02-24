// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

// Operation name type, this specifies acceptable values for the type field.
export type DiffOpName = 'splice' | 'shift' | 'unshift' | 'pop' | 'push';

// Run a series of operations on the array in sequence.
export const runOps = <T>(arr:T[], ops:IDiffOp<T>[]) : void => {
    ops.forEach((op) : void => {
        op.runOp(arr);
    });
};

// The interface for the diff operations. These objects must have a type field.
export interface IDiffOp<T> {
    readonly type:DiffOpName;
    runOp(arr:T[]) : void;
}

// This class is used to invoke the splice method on a given array. Splice
// is used to remove a number of items from an array, starting at a specific
// index, and optionally replacing the deleted values with a new set of items.
export class DiffOpSplice<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly startIndex:number;
    public readonly count:number;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        arr.splice(this.startIndex, this.count, ...this.items);
    }
    constructor(start:number, count:number, items?:T[]) {
        this.startIndex = start;
        this.count = count;
        this.items = (items || []);
    }
}

// Pop items off of the front of a given array.
export class DiffOpShift<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly count:number;
    public runOp(arr:T[]) : void {
        let i = 0;
        while (i < this.count) {
            arr.shift();
            i++;
        }
    }
    constructor(count?:number) {
        this.count = (count || 1);
        this.type = 'shift';
    }
}

// Insert items into the front of a given array.
export class DiffOpUnshift<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        for (const item of this.items) {
            arr.unshift(item);
        }
    }
    constructor(items:T[]) {
        this.items = items.reverse();
        this.type = 'unshift';
    }
}

// Pop a number of items off of the end of a given array.
export class DiffOpPop<T> implements IDiffOp<T> {
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
        this.count = (count || 1);
        this.type = 'pop';
    }
}

// Push a set of items on to the end of a given array.
export class DiffOpPush<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        for (const item of this.items) {
            arr.push(item);
        }
    }
    constructor(items:T[]) {
        this.items = items;
        this.type = 'push';
    }
}
