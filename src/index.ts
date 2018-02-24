// Implement functions to allocate, clone, diff, and patch an array.
// -----------------------------------------------------------------
// import {
//     DiffOpPush
// } from './diffops';

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

// Define the diff function.
export const diff = <T>(base:T[], target:T[]) : void => {
    process.stdout.write('Hello from diff!\n');
};

// Define the patch function.
export const patch = <T>(base:T[], p:any) : void => {
    process.stdout.write('Hello from patch!\n');
};

// export const temp = () => {
//     const arr_i = [1,  2];
//     const arr_s = ["hello", "there"];
//     process.stdout.write(`arr_i: ${arr_i.toString()}\n`);
//     process.stdout.write(`arr_s: ${arr_s.toString()}\n`);
//     const op = new DiffOpPush();
// };
