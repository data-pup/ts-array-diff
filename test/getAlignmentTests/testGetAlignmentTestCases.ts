import { alignmentSeq } from '../importTypes';

// [ base state, target state, expected alignment sequence, test description ]
export type alignmentTestCase<T> = {
    base:T[];
    target:T[];
    expectedAlignment:alignmentSeq<T>;
    testDesc:string;
};

export const testCases:alignmentTestCase<any>[] = [
    {
        base:  [1   ],
        target:[1, 2],
        expectedAlignment:[ {elemValue:1, elemType:'noop'}, {elemValue:2, elemType:'add'} ],
        testDesc:'Target state has new tail element',
    },
    {
        base:  [   2],
        target:[1, 2],
        expectedAlignment:[ {elemValue:1, elemType:'add'}, {elemValue:2, elemType:'noop'} ],
        testDesc:'Target state has new head element',
    },
    {
        base:  [1, 2],
        target:[   2],
        expectedAlignment:[ {elemValue:1, elemType:'remove'}, {elemValue:2, elemType:'noop'} ],
        testDesc:'Base state has extra head element',
    },
    {
        base:  [1, 2],
        target:[1   ],
        expectedAlignment:[ {elemValue:1, elemType:'noop'}, {elemValue:2, elemType:'remove'} ],
        testDesc:'Base state has extra tail element',
    },
    {
        base:  [1, 2, 3],
        target:[1,    3],
        expectedAlignment:[
            {elemValue:1, elemType:'noop'},
            {elemValue:2, elemType:'remove'},
            {elemValue:3, elemType:'noop'},
        ],
        testDesc:'Base state has extra middle element',
    },
    {
        base:  [1,    3],
        target:[1, 2, 3],
        expectedAlignment:[
            {elemValue:1, elemType:'noop'},
            {elemValue:2, elemType:'add'},
            {elemValue:3, elemType:'noop'},
        ],
        testDesc:'Target state has extra middle element',
    },
    {
        base:  [0, 2],
        target:[1, 2],
        expectedAlignment:[
            {elemValue:0, elemType:'remove'},
            {elemValue:1, elemType:'add'},
            {elemValue:2, elemType:'noop'},
        ],
        testDesc:'Different head element',
    },
    {
        base:  [0, 1],
        target:[0, 2],
        expectedAlignment:[
            {elemValue:0, elemType:'noop'},
            {elemValue:1, elemType:'remove'},
            {elemValue:2, elemType:'add'},
        ],
        testDesc:'Different tail element',
    },
    {
        base:  [   2, 3, 3, 4,    5, 6, 8   ],
        target:[1, 2, 3,    4, 4, 5, 7, 8, 9],
        expectedAlignment:[
            {elemValue:1, elemType:'add'},
            {elemValue:2, elemType:'noop'},
            {elemValue:3, elemType:'noop'},
            {elemValue:3, elemType:'remove'},
            {elemValue:4, elemType:'noop'},
            {elemValue:4, elemType:'add'},
            {elemValue:5, elemType:'noop'},
            {elemValue:6, elemType:'remove'},
            {elemValue:7, elemType:'add'},
            {elemValue:8, elemType:'noop'},
            {elemValue:9, elemType:'add'},
        ],
        testDesc:'Complex example',
    },
];
