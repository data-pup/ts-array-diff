import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    getIndexRange,
} from '../importDependencies';

// Test Case: [start, end, array, expected range, test description]
type GetIndexRangeTestCase = {
    min:number;
    max:number;
    expectedRange:number[];
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetIndexRange {

    private static readonly testCases:GetIndexRangeTestCase[] = [
        {
            min:0, max:3,
            expectedRange:[0, 1, 2],
            testDesc:'Valid index range can be created',
        },
        {
            min:0, max:1,
            expectedRange:[0],
            testDesc:'Test Range inclusivity',
        },
    ];

    @test public runTests() {
        TestGetIndexRange.testCases.forEach(
            (currTest:GetIndexRangeTestCase) : void => {
                const {min, max, expectedRange, testDesc}:GetIndexRangeTestCase = currTest;
                const actualRange:number[] = getIndexRange(min, max);
                assertArraysAreEqual(actualRange, expectedRange, `Test Failed: ${testDesc}`);
        });
    }
}
