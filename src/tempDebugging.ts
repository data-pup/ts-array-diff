// This is a helper script used for debugging different issues.

import {
    UnshiftDiffOp,
} from './diffops';

const temp = () : void => {
    const arr = [1];
    const emptyOp = new UnshiftDiffOp<number>([]);
    emptyOp.runOp(arr);
    if (arr === undefined) {
        process.stdout.write('Wtf?');
    } else {
        for (const curr of arr) {
           process.stdout.write(`${curr}\n`);
        }
    }
};
temp();
