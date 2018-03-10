import { suite, test } from 'mocha-typescript';
import {
    incrementBase,
    incrementBaseAndTarget,
    incrementTarget,
    indexTuple,
} from '../importDependencies';
import { assertArraysAreEqual } from '../testUtils/assertArraysAreEqual';

// [ input, expected base result, expected target result, expected both result ]
type incrementTestCase = [indexTuple, indexTuple, indexTuple, indexTuple, string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestIncrement {

    private static testCases:incrementTestCase[] = [
        [ [0, 0], [1, 0], [0, 1], [1, 1], 'Simple Increment Test' ],
    ];

    private static assertIncrementTestPasses(testCase:incrementTestCase) : void {
        const [pos, expectedBaseResult, expectedTargetResult,
               expectedBothResult, testDesc] = testCase;
        const [actualBaseResult, actualTargetResult, actualBothResult] = [
            incrementBase(pos), incrementTarget(pos), incrementBaseAndTarget(pos),
        ];

        const expectedResults:indexTuple[] = [
            expectedBaseResult, expectedTargetResult, expectedBothResult];
        const actualResult:indexTuple[] = [
            actualBaseResult, actualTargetResult, actualBothResult];
        const errorMessages:string[] = [
            `incrementBase failed test: ${testDesc}`,
            `incrementTarget failed test: ${testDesc}`,
            `incrementBaseAndTarget failed test: ${testDesc}`,
        ];

        [0, 1, 2].forEach((i) : void =>
            assertArraysAreEqual(actualResult[i], expectedResults[i], errorMessages[i]),
        );
    }

    @test public runIncrementTests() {
        TestIncrement.testCases.forEach(
            (currTest:incrementTestCase) : void =>
                TestIncrement.assertIncrementTestPasses(currTest),
        );
    }
}
