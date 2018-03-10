// import { getAlignment } from './getAlignment/getAlignment';
// import {
    // alignmentSequence,
    // alignmentSequenceElem,
// } from './alignmentTypes';

export type tupleType = 'noop' | 'add' | 'remove';
type opTuple<T> = { val:T; type:tupleType };

const temp = () : void => {
    const seq:opTuple<number>[] = [
        { val:1, type:'noop' },
        { val:2, type:'add' },
    ];

    for (const curr of seq) {
        const currType:tupleType = curr.type;
        switch (currType) {
            case 'noop':
                process.stdout.write(`Value: ${curr.val}\tType: ${curr.type}\n`);
                break;

            default:
                process.stdout.write('FOO\n');
                break;
        }
    }
};
temp();
