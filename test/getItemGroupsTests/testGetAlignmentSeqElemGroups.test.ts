import { suite, test } from 'mocha-typescript';
import { getAlignment } from '../importGetAlignment';
import { getItemGroups } from '../importGetItemGroups';
import { assertGroupsAreSame } from '../importTestUtils';
import { alignmentSeq } from '../importTypes';

// [base array, target array, expected edit groups, test description]
// type getEditGroupTestCase<T> = [T[], T[], alignmentSeq<T>[], string];
type getSeqElemGroupTestCase<T> = {
    base:T[];
    target:T[];
    expectedGroups:alignmentSeq<T>[];
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetSeqElemGroups {

    private static readonly testCases:getSeqElemGroupTestCase<any>[] = [
        {
            base:[0, 2, 3],
            target:[1, 2, 3],
            expectedGroups:[
                [{elemValue:0, elemType:'remove'}, {elemValue:1, elemType:'add'}],
                [{elemValue:2, elemType:'noop'}, {elemValue:3, elemType:'noop'}],
            ],
            testDesc:'Test shift/unshift sequence element group is identified.',
        },
        {
            base:[1, 2],
            target:[1, 3],
            expectedGroups:[
                [{elemValue:1, elemType:'noop'}],
                [{elemValue:2, elemType:'remove'}, {elemValue:3, elemType:'add'}],
            ],
            testDesc:'Test shift/unshift sequence element group is identified.',
        },
        {
            base:[1, 2, 4],
            target:[1, 3, 4],
            expectedGroups:[
                [{elemValue:1, elemType:'noop'}],
                [{elemValue:2, elemType:'remove'}, {elemValue:3, elemType:'add'}],
                [{elemValue:4, elemType:'noop'}],
            ],
            testDesc:'Splice sequence element group is identified.',
        },
        {
            base:[   1, 2, 3, 4, 5],
            target:[0, 1,       4, 5, 6],
            expectedGroups:[
                [{elemValue:0, elemType:'add'}],
                [{elemValue:1, elemType:'noop'}],
                [{elemValue:2, elemType:'remove'}, {elemValue:3, elemType:'remove'}],
                [{elemValue:4, elemType:'noop'}, {elemValue:5, elemType:'noop'}],
                [{elemValue:6, elemType:'add'}],
            ],
            testDesc:'Nontrivial sequence element group test',
        },
    ];

    private static runTest<T>(testCase:getSeqElemGroupTestCase<T>) : void {
        const {base, target, expectedGroups, testDesc} = testCase;
        const alignment = getAlignment(base, target);
        const actualEditGroups = getItemGroups(alignment);
        assertGroupsAreSame(actualEditGroups, expectedGroups, `Test Failed: ${testDesc}`);
    }

    @test public runTests() {
        TestGetSeqElemGroups.testCases.forEach(
            (currTest) => TestGetSeqElemGroups.runTest(currTest),
        );
    }
}
