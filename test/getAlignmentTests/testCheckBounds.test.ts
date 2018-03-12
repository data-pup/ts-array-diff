import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { checkBounds } from '../importDependencies';

// [arr, position, expected result, test description]
type CheckBoundsTestCase<T> = [T[], number, boolean, string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestCheckBounds {

    // Test cases for the `checkBounds` function.
    private static readonly checkBoundsTestCases:CheckBoundsTestCase<any>[] = [
        [ undefined, 0, false, 'Undefined array has no index in bounds'],
        [ [], 0, false, 'Empty array has no index in bounds'],
        [ [1], 0, true, 'Valid index must be in bounds'],
        [ [1], 1, false, 'Index equal to length cannot be in bounds'],
        [ [1], -1, false, 'Negative index cannot be in bounds'],
    ];

    // Private helper asserts that a bounds check test case passes.
    private static assertCheckBoundsTestPasses<T>(testCase:CheckBoundsTestCase<T>) : void {
        const [arr, i, expectedResult, testDesc]:[T[], number, boolean, string] = testCase;
        const actualResult = checkBounds(i, arr);
        assert.strictEqual(expectedResult, actualResult, `Failed test: ${testDesc}`);
    }

    // Run the `checkBounds` tests.
    @test public runCheckBoundsTests() {
        TestCheckBounds.checkBoundsTestCases.forEach(
            <T>(currTest:CheckBoundsTestCase<T>) : void =>
                TestCheckBounds.assertCheckBoundsTestPasses(currTest),
        );
    }
}
