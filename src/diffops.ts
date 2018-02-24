// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

// Union type for the various diff operations.
export type diffOp<T> =
    splice<T>
    | shiftOp<T> | unshiftOp<T>
    | popOp<T> | pushOp<T>;

// Union type to represent the different diff operation names.
export type diffOpName = 'splice' | 'shift' | 'unshift' | 'pop' | 'push';

// Remove a
export class splice<T> {
    type:diffOpName;
    startIndex:number;
    count:number;
    items?:T[]
}

export class shiftOp<T> {
    type:diffOpName;
    count?:number
};

export class unshiftOp<T> {
    type:diffOpName;
    items:T[]
};

export class popOp<T> {
    type:diffOpName;
    count?:number
};

export class pushOp<T> {
    type:diffOpName;
    count?:number
};
