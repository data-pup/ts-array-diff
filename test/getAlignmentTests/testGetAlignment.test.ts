import { suite, test } from 'mocha-typescript';
import {
    alignmentTestCase,
    testCases,
} from './testGetAlignmentTestCases';
import { getAlignment } from '../importGetAlignment';
import { assertAlignmentsAreEqual } from '../importTestUtils';
import { alignmentSeq } from '../importTypes';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetAlignment {
    private static assertCorrectAlignmentIsCreated<T>(testCase:alignmentTestCase<T>) : void {
        const {base, target, expectedAlignment, testDesc} = testCase;
        const actualAlignment:alignmentSeq<T> = getAlignment(base, target);
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment,
                                 `Test Failed: ${testDesc}`);
    }

    @test public runTests() {
        testCases.forEach(
            <T>(i:alignmentTestCase<T>) : void =>
                TestGetAlignment.assertCorrectAlignmentIsCreated(i),
        );
    }
}
