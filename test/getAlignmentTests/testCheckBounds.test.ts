import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { checkBounds } from '../importDependencies';

type CheckBoundsTestCase<T> = [T[], number, boolean, string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestCheckBounds {

    private static testCases:CheckBoundsTestCase<any>[] = [
        [ undefined, 0, false, 'Undefined array has no index in bounds'],
        [ [], 0, false, 'Empty array has no index in bounds'],
        [ [1], 0, true, 'Valid index must be in bounds'],
        [ [1], 1, false, 'Index equal to length cannot be in bounds'],
        [ [1], -1, false, 'Negative index cannot be in bounds'],
    ];

    @test public boundsTests() {
        TestCheckBounds.testCases.forEach(
            <T>(currTest:CheckBoundsTestCase<T>) : void => {
                const [arr, i, expectedResult, testDesc]:[T[], number, boolean, string] = [
                    currTest[0], currTest[1], currTest[2], currTest[3]];
                const actualResult = checkBounds(i, arr);
                assert.strictEqual(expectedResult, actualResult, `Failed test: ${testDesc}`);
        });
    }
}
