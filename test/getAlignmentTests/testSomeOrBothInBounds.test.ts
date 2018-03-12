import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { arrTuple, indexTuple } from '../importDependencies';
import { bothInBounds, someInBounds } from '../importGetAlignment';

type SomeOrBothTestCase<T> = {
    arrs:arrTuple<T>;
    pos:indexTuple;
    expectedSomeResult:boolean;
    expectedBothResult:boolean;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestSomeOrBothInBounds {

    // Test cases for the `someInBounds` and `bothInBounds` functions.
    private static readonly someOrBothTestCases:SomeOrBothTestCase<any>[] = [
        {
            arrs:[[1, 2, 3], [1, 2, 3]],
            pos:[0, 0],
            expectedSomeResult:true,
            expectedBothResult:true,
            testDesc:'Simple base test',
        },
        {
            arrs:[[1, 2, 3], [1, 2, 3]],
            pos:[2, 2],
            expectedSomeResult:true,
            expectedBothResult:true,
            testDesc:'Simple base test #2',
        },
        {
            arrs:[[1, 2, 3], [1, 2, 3]],
            pos:[0, 3],
            expectedSomeResult:true,
            expectedBothResult:false,
            testDesc:'One out of bounds past tail',
        },
        {
            arrs:[[1, 2, 3], [1, 2, 3]],
            pos:[3, 3],
            expectedSomeResult:false,
            expectedBothResult:false,
            testDesc:'Both out of bounds past tail',
        },
        {
            arrs:[[1, 2, 3], [1, 2, 3]],
            pos:[-1, -1],
            expectedSomeResult:false,
            expectedBothResult:false,
            testDesc:'Two negative indices',
        },
    ];

    // Private helper asserts the `someInBounds` and `bothInBounds` functions work.
    private static runTest<T>(testCase:SomeOrBothTestCase<T>) : void {
        const {arrs, pos, expectedSomeResult, expectedBothResult, testDesc} = testCase;
        const [actualSomeResult, actualBothResult] = [someInBounds(pos, arrs), bothInBounds(pos, arrs)];
        assert.strictEqual(actualSomeResult, expectedSomeResult, `someInBounds failed: ${testDesc}`);
        assert.strictEqual(actualBothResult, expectedBothResult, `bothInBounds failed: ${testDesc}`);
    }

    // Run the `someInBounds` and `bothInBounds` tests.
    @test public runTests() {
        TestSomeOrBothInBounds.someOrBothTestCases.forEach(
            (currTest) => TestSomeOrBothInBounds.runTest(currTest),
        );
    }
}
