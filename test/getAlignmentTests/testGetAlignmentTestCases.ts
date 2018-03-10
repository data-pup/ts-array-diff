import { alignmentSeq } from '../importDependencies';

// [ base state, target state, expected alignment sequence, test description ]
export type alignmentTestCase<T> = [T[], T[], alignmentSeq<T>, string];

export const testCases:alignmentTestCase<any>[] = [
        [
            [1   ],
            [1, 2],
            [ {val: 1, elemType:'noop'}, {val:2, elemType:'add'} ],
            'Target state has new tail element',
        ],
        // [
        //     [   2],
        //     [1, 2],
        //     'Target state has new head element',
        //     [ {val: 1, elemType:'add'}, {val:2, elemType:'noop'} ],
        // ],
        // [ /// TODO: FIXUP TEST CASE TYPES:
        //     [1, 2],
        //     [   2],
        //     [ [1, undefined], [2, 2] ],
        //     'Base state has extra head element',
        // ],
        // [
        //     [1, 2],
        //     [1   ],
        //     [ [1, 1], [2, undefined] ],
        //     'Base state has extra tail element',
        // ],
        // [
        //     [1, 2, 3],
        //     [1,    3],
        //     [ [1, 1], [2, undefined], [3, 3] ],
        //     'Base state has extra middle element',
        // ],
        // [
        //     [1,    3],
        //     [1, 2, 3],
        //     [ [1, 1], [undefined, 2], [3, 3] ],
        //     'Target state has extra middle element',
        // ],
        // [
        //     [0, 2],
        //     [1, 2],
        //     [ [0, undefined], [undefined, 1], [2, 2] ],
        //     'Different head element',
        // ],
        // [
        //     [0, 1],
        //     [0, 2],
        //     [ [0, 0], [1, undefined], [undefined, 2] ],
        //     'Different tail element',
        // ],
        // [
        //     [   2, 3, 3, 4,    5, 6, 8   ],
        //     [1, 2, 3,    4, 4, 5, 7, 8, 9],
        //     [
        //         [undefined, 1], [2, 2], [3, 3],
        //         [3, undefined], [4, 4],
        //         [undefined, 4], [5, 5],
        //         [6, undefined], [undefined, 7],
        //         [8, 8], [undefined, 9],
        //     ],
        //     'Complex example',
        // ],
    ];
