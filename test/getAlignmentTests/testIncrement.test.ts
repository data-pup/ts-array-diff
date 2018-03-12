import { suite, test } from 'mocha-typescript';
import { assertArraysAreEqual } from '../importTestUtils';
import { indexTuple } from '../importTypes';
import {
    incrementBase,
    incrementBaseAndTarget,
    incrementTarget,
} from '../importGetAlignment';

type incrementTestCase = {
    pos:indexTuple;
    expectedBaseResult:indexTuple;
    expectedTargetResult:indexTuple;
    expectedBothResult:indexTuple;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestIncrement {

    private static readonly testCases:incrementTestCase[] = [
        {
            pos:[0, 0],
            expectedBaseResult:[1, 0],
            expectedTargetResult:[0, 1],
            expectedBothResult:[1, 1],
            testDesc:'Simple Increment Test',
        },
    ];

    private static runTest(testCase:incrementTestCase) : void {
        // Destructure the test case, and get the actual results of each function.
        const {pos, expectedBaseResult, expectedTargetResult,
               expectedBothResult, testDesc} = testCase;

        const expectedResults:indexTuple[] = [
            expectedBaseResult, expectedTargetResult, expectedBothResult];
        const actualResults:indexTuple[] = [
            incrementBase(pos), incrementTarget(pos), incrementBaseAndTarget(pos),
        ];
        const errorMessages:string[] = [
            `incrementBase failed test: ${testDesc}`,
            `incrementTarget failed test: ${testDesc}`,
            `incrementBaseAndTarget failed test: ${testDesc}`,
        ];

        [0, 1, 2].forEach((i) : void =>
            assertArraysAreEqual(actualResults[i], expectedResults[i], errorMessages[i]),
        );
    }

    @test public runTests() {
        TestIncrement.testCases.forEach(
            (currTest:incrementTestCase) : void =>
                TestIncrement.runTest(currTest),
        );
    }
}
