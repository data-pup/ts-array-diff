import { IDiffOp } from '../importDiffOps';
import {
    ShiftDiffOp,
    UnshiftDiffOp,
    PopDiffOp,
    PushDiffOp,
    SpliceDiffOp,
} from '../importDiffOps';

export type parseItemGroupTestCase<T> = {
    base:T[];
    target:T[];
    expectedOps:IDiffOp<T>[];
    testDesc:string;
};

export const shiftAndUnshiftTestCases:parseItemGroupTestCase<any>[] = [
    {
        base:  [0, 1, 2, 3],
        target:[   1, 2, 3],
        expectedOps:[new ShiftDiffOp(1)],
        testDesc:'[Shift test]: Shift single element off of array.',
    },
    {
        base:  [0, 1, 2, 3],
        target:[      2, 3],
        expectedOps:[new ShiftDiffOp(2)],
        testDesc:'[Shift test]: Shift two elements off of array.',
    },
    {
        base:  [   1, 2, 3],
        target:[0, 1, 2, 3],
        expectedOps:[new UnshiftDiffOp([0])],
        testDesc:'[Unshift test}: Unshift single element onto array.',
    },
    {
        base:  [      2, 3],
        target:[0, 1, 2, 3],
        expectedOps:[new UnshiftDiffOp([0, 1])],
        testDesc:'[Unshift test]: Unshift two elements onto array.',
    },
    {
        base:  [0,    2, 3],
        target:[   1, 2, 3],
        expectedOps:[
            new ShiftDiffOp(1),        // Result: [2, 3]
            new UnshiftDiffOp([1]),    // Result: [1, 2, 3]
        ],
        testDesc:'[Shift/Unshift test]: Shift, then unshift element from head.',
    },
];

export const pushAndPopTestCases:parseItemGroupTestCase<any>[] = [
    {
        base:  [1, 2, 3   ],
        target:[1, 2, 3, 4],
        expectedOps:[new PushDiffOp([4])],
        testDesc:'[Push test]: Push single element onto tail of array.',
    },
    {
        base:  [ ],
        target:[1],
        expectedOps:[new PushDiffOp([1])],
        testDesc:'[Push test]: Single element can be pushed onto empty array.',
    },
    {
        base:  [1, 2, 3, 4],
        target:[1, 2, 3   ],
        expectedOps:[new PopDiffOp(1)],
        testDesc:'[Pop test]: Pop single element off of array.',
    },
    {
        base:  [1],
        target:[ ],
        expectedOps:[new PopDiffOp(1)],
        testDesc:'[Pop test]: Pop single element off of array with one element.',
    },
    {
        base:  [1],
        target:[2],
        expectedOps:[
            new PopDiffOp(1),          // Result: [ ]
            new PushDiffOp([2]),       // Result: [2]
        ],
        testDesc:'[Push/Pop test]: Test single element array edit corresponds with pop -> push.',
    },
];

export const spliceSimpleTestCases:parseItemGroupTestCase<any>[] = [
    {
        base:  ['dogs', 'are', 'not', 'good'],
        target:['dogs', 'are',        'good'],
        expectedOps:[
            new SpliceDiffOp(2, 1),
        ],
        testDesc:'[Splice test]: Remove single element in body of array.',
    },
    {
        base:  ['I', 'would',        'a', 'dog'],
        target:['I', 'would', 'pet', 'a', 'dog'],
        expectedOps:[
            new SpliceDiffOp(2, 0, ['pet']),
        ],
        testDesc:'[Splice test]: Add single element in body of array.',
    },
    {
        base:  ['I', 'like', 'dogs'],
        target:['I', 'love', 'dogs'],
        expectedOps:[
            new SpliceDiffOp(1, 1, ['love']),
        ],
        testDesc:'[Splice test]: Change single element in body of array.',
    },
    {
        base:  [1, 2, 3, 4, 5],
        target:[1,    3,    5],
        expectedOps:[
            new SpliceDiffOp(1, 1),  // Result: [1, 3, 4, 5]
            new SpliceDiffOp(2, 1),  // Result: [1, 3, 5]
        ],
        testDesc:'[Integration test:] Multiple splices function properly together.',
    },
];

export const complexTestCases:parseItemGroupTestCase<any>[] = [
    {
        base:  [0, 1, 2, 3, 4, 5],
        target:[   1, 2, 3      ],
        expectedOps:[
            new ShiftDiffOp(1),        // Result: [1, 2, 3, 4, 5]
            new PopDiffOp(2),          // Result: [1, 2, 3]
        ],
        testDesc:'[Integration test:] Shift and Pop operations work together.',
    },
    {
        base:  [0,    2, 3, 4  ],
        target:[   1, 2, 3,   5],
        expectedOps:[
            new ShiftDiffOp(1),        // Result: [2, 3, 4]
            new UnshiftDiffOp([1]),    // Result: [1, 2, 3, 4]
            new PopDiffOp(1),          // Result: [1, 2, 3]
            new PushDiffOp([5]),       // Result: [1, 2, 3, 5]
        ],
        testDesc:'[Integration test:] Pop, push, shift, unshift all work together.',
    },
    {
        base:  [0, 1, 2, 3, 4, 5, 6  ],
        target:[   1,    3,    5,   7],
        expectedOps:[
            new ShiftDiffOp(1),        // Result: [1, 2, 3, 4, 5, 6]
            new SpliceDiffOp(1, 1),    // Result: [1,    3, 4, 5, 6]
            new SpliceDiffOp(2, 1),    // Result: [1,    3,    5, 6]
            new PopDiffOp(1),          // Result: [1,    3,    5   ]
            new PushDiffOp([7]),       // Result: [1, 3, 5, 7]
        ],
        testDesc:'[Integration test:] Multiple splice functions with shift, push, pop.',
    },
];
