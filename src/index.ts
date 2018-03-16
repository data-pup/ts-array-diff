// Implement functions to allocate, clone, diff, and patch an array.
// -----------------------------------------------------------------
import { IDiffOp, runOps } from './diffops';
import { getAlignment } from './getAlignment/getAlignment';
import { getItemGroups } from './getItemGroups/getItemGroups';
import { parse } from './parseItemGroups/parseItemGroups';

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
export const diff = <T>(base:T[], target:T[]) : IDiffOp<T>[] => {
    const alignment = getAlignment(base, target);
    const itemGroups = getItemGroups(alignment);
    return parse(itemGroups);
};

// Define the patch function.
export const patch = <T>(base:T[], ops:IDiffOp<T>[]) : void => {
    runOps(base, ops);
};
