import { alignmentSeq } from '../importDependencies';

// [ base state, target state, expected alignment sequence, test description ]
export type alignmentTestCase<T> = [T[], T[], alignmentSeq<T>, string];

export const testCases:alignmentTestCase<any>[] = [
        [
            [1   ],
            [1, 2],
            [ {elemValue:1, elemType:'noop'}, {elemValue:2, elemType:'add'} ],
            'Target state has new tail element',
        ],
        [
            [   2],
            [1, 2],
            [ {elemValue:1, elemType:'add'}, {elemValue:2, elemType:'noop'} ],
            'Target state has new head element',
        ],
        [
            [1, 2],
            [   2],
            [ {elemValue:1, elemType:'remove'}, {elemValue:2, elemType:'noop'} ],
            'Base state has extra head element',
        ],
        [
            [1, 2],
            [1   ],
            [ {elemValue:1, elemType:'noop'}, {elemValue:2, elemType:'remove'} ],
            'Base state has extra tail element',
        ],
        [
            [1, 2, 3],
            [1,    3],
            [
                {elemValue:1, elemType:'noop'},
                {elemValue:2, elemType:'remove'},
                {elemValue:3, elemType:'noop'},
            ],
            'Base state has extra middle element',
        ],
        [
            [1,    3],
            [1, 2, 3],
            [
                {elemValue:1, elemType:'noop'},
                {elemValue:2, elemType:'add'},
                {elemValue:3, elemType:'noop'},
            ],
            'Target state has extra middle element',
        ],
        [
            [0, 2],
            [1, 2],
            [
                {elemValue:0, elemType:'remove'},
                {elemValue:1, elemType:'add'},
                {elemValue:2, elemType:'noop'},
            ],
            'Different head element',
        ],
        [
            [0, 1],
            [0, 2],
            [
                {elemValue:0, elemType:'noop'},
                {elemValue:1, elemType:'remove'},
                {elemValue:2, elemType:'add'},
            ],
            'Different tail element',
        ],
        [
            [   2, 3, 3, 4,    5, 6, 8   ],
            [1, 2, 3,    4, 4, 5, 7, 8, 9],
            [
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
            'Complex example',
        ],
    ];
