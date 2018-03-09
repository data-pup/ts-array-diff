import { suite, test } from 'mocha-typescript';
import { getIndexRange } from '../importDependencies';
import { assertArraysAreEqual } from '../testUtils/assertArraysAreEqual';

// Test Case: [start, end, array, expected range, test description]
type GetIndexRangeTestCase<T> = [number, number, T[], number[], string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetIndexRange {
    private static testCases:GetIndexRangeTestCase<any>[] = [
        [0, 3, ['hello', 'there', 'world'], [0, 1, 2], 'Valid index range can be created'],
        [0, 1, [5, 6, 7], [0], 'Test Range inclusivity'],
    ];

    @test public runTests() {
        TestGetIndexRange.testCases.forEach(
            <T>(currTest:GetIndexRangeTestCase<T>) : void => {
                const [min, max, arr, expectedRange, testDesc]:GetIndexRangeTestCase<T> = currTest;
                const actualRange:number[] = getIndexRange(min, max, arr);
                assertArraysAreEqual(actualRange, expectedRange, `Test Failed: ${testDesc}`);
        });
    }
}
