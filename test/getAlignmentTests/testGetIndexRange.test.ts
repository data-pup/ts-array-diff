import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    getIndexRange,
} from '../importDependencies';

// Test Case: [start, end, array, expected range, test description]
type GetIndexRangeTestCase = [number, number, number[], string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetIndexRange {
    private static testCases:GetIndexRangeTestCase[] = [
        [0, 3, [0, 1, 2], 'Valid index range can be created'],
        [0, 1, [0], 'Test Range inclusivity'],
    ];

    @test public runTests() {
        TestGetIndexRange.testCases.forEach(
            (currTest:GetIndexRangeTestCase) : void => {
                const [min, max, expectedRange, testDesc]:GetIndexRangeTestCase = currTest;
                const actualRange:number[] = getIndexRange(min, max);
                assertArraysAreEqual(actualRange, expectedRange, `Test Failed: ${testDesc}`);
        });
    }
}
