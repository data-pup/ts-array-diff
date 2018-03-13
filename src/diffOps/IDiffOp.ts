// Operation name type, this specifies acceptable values for the type field.
export type DiffOpName = 'splice' | 'shift' | 'unshift' | 'pop' | 'push';

// The interface for the diff operations. These objects must have a type field.
export interface IDiffOp<T> {
    readonly type:DiffOpName;
    runOp(arr:T[]) : void;
}
