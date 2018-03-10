import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    arrTuple,
    bothInBounds,
    checkBounds,
    indexTuple,
    someInBounds,
} from '../importDependencies';

// [arr, position, expected result, test description]
type CheckBoundsTestCase<T> = [T[], number, boolean, string];

// [ [base, target], [base position, target position],
//   expected some result, expected both result, test desc. ]
type SomeOrBothTestCase<T> = [arrTuple<T>, indexTuple, boolean, boolean, string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestCheckBounds {

    // Test cases for the `checkBounds` function.
    private static checkBoundsTestCases:CheckBoundsTestCase<any>[] = [
        [ undefined, 0, false, 'Undefined array has no index in bounds'],
        [ [], 0, false, 'Empty array has no index in bounds'],
        [ [1], 0, true, 'Valid index must be in bounds'],
        [ [1], 1, false, 'Index equal to length cannot be in bounds'],
        [ [1], -1, false, 'Negative index cannot be in bounds'],
    ];

    // Test cases for the `someInBounds` and `bothInBounds` functions.
    private static someOrBothTestCases:SomeOrBothTestCase<any>[] = [
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

    // Private helper asserts that a bounds check test case passes.
    private static assertCheckBoundsTestPasses<T>(testCase:CheckBoundsTestCase<T>) : void {
        const [arr, i, expectedResult, testDesc]:[T[], number, boolean, string] = testCase;
        const actualResult = checkBounds(i, arr);
        assert.strictEqual(expectedResult, actualResult, `Failed test: ${testDesc}`);
    }

    // Private helper asserts the `someInBounds` and `bothInBounds` functions work.
    private static assertSomeAndBothBoundsCheckPasses<T>(testCase:SomeOrBothTestCase<T>) : void {
        const [arrs, pos, expectedSomeResult, expectedBothResult, testDesc] = testCase;
        const [actualSomeResult, actualBothResult] = [someInBounds(pos, arrs), bothInBounds(pos, arrs)];
        assert.strictEqual(actualSomeResult, expectedSomeResult, `someInBounds failed: ${testDesc}`);
        assert.strictEqual(actualBothResult, expectedBothResult, `bothInBounds failed: ${testDesc}`);
    }

    // Run the `checkBounds` tests.
    @test public runCheckBoundsTests() {
        TestCheckBounds.checkBoundsTestCases.forEach(
            <T>(currTest:CheckBoundsTestCase<T>) : void =>
                TestCheckBounds.assertCheckBoundsTestPasses(currTest),
        );
    }

    // Run the `someInBounds` and `bothInBounds` tests.
    @test public runPositionBoundsTests() {
        TestCheckBounds.someOrBothTestCases.forEach(
            <T>(currTest:SomeOrBothTestCase<T>) : void =>
                TestCheckBounds.assertSomeAndBothBoundsCheckPasses(currTest),
        );
    }
}
