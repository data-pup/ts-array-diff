// Implement functions to allocate, clone, diff, and patch an array.
// -----------------------------------------------------------------

// Allocate a new array.
export const alloc = <T>() : T[] => new Array<T>();

// Clone the array, returning a copy of the array.
export const clone = <T>(input:T[]) : T[] => {
    const output = alloc<T>();
    for (const curr of input) {
        output.push(curr);
    }
    return output;
};

// Diff Edit Operation Types
export type diffOpName = 'splice' | 'shift' | 'unshift' | 'pop' | 'push';
export type splice<T> = { type:diffOpName, count:number, items?:T[] }
export type shiftOp<T> = { type:diffOpName, count?:number };
export type unshiftOp<T> = { type:diffOpName, items:T[] };
export type popOp<T> = { type:diffOpName, count?:number };
export type pushOp<T> = { type:diffOpName, count?:number };


// Define the diff function.
export const diff = <T>(base:T[], target:T[]) : void => {
    process.stdout.write('Hello from diff!\n');
};

// Define the patch function.
export const patch = <T>(base:T[], p:any) : void => {
    process.stdout.write('Hello from patch!\n');
};
