import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    arrTuple,
    bothInBounds,
    indexTuple,
    someInBounds,
} from '../importDependencies';

// [ [base, target], [base position, target position],
//   expected some result, expected both result, test desc. ]
type SomeOrBothTestCase<T> = [arrTuple<T>, indexTuple, boolean, boolean, string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestSomeOrBothInBounds {

    // Test cases for the `someInBounds` and `bothInBounds` functions.
    private static readonly someOrBothTestCases:SomeOrBothTestCase<any>[] = [
        [
            [[1, 2, 3], [1, 2, 3]],
            [0, 0], true, true, 'Simple base test',
        ],
        [
            [[1, 2, 3], [1, 2, 3]],
            [2, 2], true, true, 'Simple base test #2',
        ],
        [
            [[1, 2, 3], [1, 2, 3]],
            [0, 3], true, false, 'One out of bounds past tail',
        ],
        [
            [[1, 2, 3], [1, 2, 3]],
            [3, 3], false, false, 'Both out of bounds past tail',
        ],
        [
            [[1, 2, 3], [1, 2, 3]],
            [-1, -1], false, false, 'Two negative indices',
        ],
    ];

    // Private helper asserts the `someInBounds` and `bothInBounds` functions work.
    private static runTest<T>(testCase:SomeOrBothTestCase<T>) : void {
        const [arrs, pos, expectedSomeResult, expectedBothResult, testDesc] = testCase;
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
