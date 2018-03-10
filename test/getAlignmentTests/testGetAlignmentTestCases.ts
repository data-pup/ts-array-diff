import { alignmentSeq } from '../importDependencies';

// [ base state, target state, expected alignment sequence, test description ]
export type alignmentTestCase<T> = [T[], T[], alignmentSeq<T>, string];

export const testCases:alignmentTestCase<any>[] = [
        [
            [1   ],
            [1, 2],
            [ {val:1, elemType:'noop'}, {val:2, elemType:'add'} ],
            'Target state has new tail element',
        ],
        [
            [   2],
            [1, 2],
            [ {val:1, elemType:'add'}, {val:2, elemType:'noop'} ],
            'Target state has new head element',
        ],
        [
            [1, 2],
            [   2],
            [ {val:1, elemType:'remove'}, {val:2, elemType:'noop'} ],
            'Base state has extra head element',
        ],
        [
            [1, 2],
            [1   ],
            [ {val:1, elemType:'noop'}, {val:2, elemType:'remove'} ],
            'Base state has extra tail element',
        ],
        [
            [1, 2, 3],
            [1,    3],
            [
                {val:1, elemType:'noop'},
                {val:2, elemType:'remove'},
                {val:3, elemType:'noop'},
            ],
            'Base state has extra middle element',
        ],
        [
            [1,    3],
            [1, 2, 3],
            [
                {val:1, elemType:'noop'},
                {val:2, elemType:'add'},
                {val:3, elemType:'noop'},
            ],
            'Target state has extra middle element',
        ],
        [
            [0, 2],
            [1, 2],
            [
                {val:0, elemType:'remove'},
                {val:1, elemType:'add'},
                {val:2, elemType:'noop'},
            ],
            'Different head element',
        ],
        [
            [0, 1],
            [0, 2],
            [
                {val:0, elemType:'noop'},
                {val:1, elemType:'remove'},
                {val:2, elemType:'add'},
            ],
            'Different tail element',
        ],
        [
            [   2, 3, 3, 4,    5, 6, 8   ],
            [1, 2, 3,    4, 4, 5, 7, 8, 9],
            [
                {val:1, elemType:'add'},
                {val:2, elemType:'noop'},
                {val:3, elemType:'noop'},
                {val:3, elemType:'remove'},
                {val:4, elemType:'noop'},
                {val:4, elemType:'add'},
                {val:5, elemType:'noop'},
                {val:6, elemType:'remove'},
                {val:7, elemType:'add'},
                {val:8, elemType:'noop'},
                {val:9, elemType:'add'},
            ],
            'Complex example',
        ],
    ];
