import { suite, test } from 'mocha-typescript';
import {
    alignmentSeq,
    assertEditGroupsAreSame,
    getAlignment,
    getEditGroups,
} from '../importDependencies';

// [base array, target array, expected edit groups, test description]
type getEditGroupTestCase<T> = [T[], T[], alignmentSeq<T>[], string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetEditGroups {

    private static testCases:getEditGroupTestCase<any>[] = [
        [
            [   1, 2, 3, 4, 5],
            [0, 1,       4, 5, 6],
            [
                [{elemValue:0, elemType:'add'}],
                [{elemValue:1, elemType:'noop'}],
                [{elemValue:2, elemType:'remove'}, {elemValue:3, elemType:'remove'}],
                [{elemValue:4, elemType:'noop'}, {elemValue:5, elemType:'noop'}],
                [{elemValue:6, elemType:'add'}],
            ],
            'Basic Edit Group Test',
        ],
    ];

    private static evaluateTestCase<T>(testCase:getEditGroupTestCase<T>) : void {
        const [base, target, expectedEditGroups, testDesc] = testCase;
        const alignment = getAlignment(base, target);
        const actualEditGroups = getEditGroups(alignment);
        assertEditGroupsAreSame(actualEditGroups, expectedEditGroups,
                                `Test Failed: ${testDesc}`);
    }

    @test public runTests() {
        TestGetEditGroups.testCases.forEach(
            (currTest) => TestGetEditGroups.evaluateTestCase(currTest),
        );
    }

    // @test public testSpliceGroupIsIdentified() {
    //     const base = [1, 2, 4];
    //     const target = [1, 3, 4];
    //     const seq:alignmentSeq<number> = getAlignment(base, target);
    //     const actualGroups:alignmentSeq<number>[] = getEditGroups(seq);
    //     const expectedGroups:alignmentSeq<number>[] = [
    //         [ [1, 1] ],
    //         [ [2, undefined], [undefined, 3] ],
    //         [ [4, 4] ],
    //     ];
    //     this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    // }

    // @test public testShiftAndUnshiftAreIdentified() {
    //     const base = [0, 2, 3];
    //     const target = [1, 2, 3];
    //     const seq:alignmentSeq<number> = getAlignment(base, target);
    //     const actualGroups:alignmentSeq<number>[] = getEditGroups(seq);
    //     const expectedGroups:alignmentSeq<number>[] = [
    //         [ [0, undefined], [undefined, 1] ],
    //         [ [2, 2], [3, 3] ],
    //     ];
    //     this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    // }

    // @test public testPopAndPushAreIdentified() {
    //     const base = [1, 2];
    //     const target = [1, 3];
    //     const seq:alignmentSeq<number> = getAlignment(base, target);
    //     const actualGroups:alignmentSeq<number>[] = getEditGroups(seq);
    //     const expectedGroups:alignmentSeq<number>[] = [
    //         [ [1, 1] ], [ [2, undefined], [undefined, 3] ],
    //     ];
    //     this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    // }
}
