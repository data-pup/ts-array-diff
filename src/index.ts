// Diff and patch an array.

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
    diff([], []);
    patch([], undefined);
};

main();
