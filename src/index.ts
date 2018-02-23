// Implement functions to allocate, clone, diff, and patch an array.
// -----------------------------------------------------------------

// Allocate a new array.
const alloc = <T>() : T[] => { return []; };

// Clone the array, returning a copy of the array.
const clone = <T>(input:T[]) : T[] => {
    throw new Error('Not Implemented');
};

// Define the diff function.
const diff = <T>(base:T[], target:T[]) : void => {
    process.stdout.write('Hello from diff!\n');
};

// Define the patch function.
const patch = <T>(base:T[], p:any) : void => {
    process.stdout.write('Hello from patch!\n');
};

// Define the main function.
const main = () => {
    const a:number[] = [];
    const b:number[] = [];

    diff(a, b);
    patch([], undefined);
};

// Invoke the main function.
main();
