import { suite, test } from 'mocha-typescript';
import { alignmentSequence, getAlignment } from '../importDependencies';
import { assertAlignmentsAreEqual } from '../testUtils/assertAlignmentsAreEqual';

// [ base state, target state, expected alignment sequence, test description ]
type alignmentTestCase<T> = [T[], T[], alignmentSequence<T>, string];
// type alignmentTestCase<T> = [T[], T[]];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetAlignment {

    private static testCases:alignmentTestCase<any>[] = [
        [
            [1   ],
            [1, 2],
            [ [1, 1], [undefined, 2] ],
            'Target state has new tail element',
        ],
        [
            [   2],
            [1, 2],
            [ [undefined, 1], [2, 2] ],
            'Target state has new head element',
        ],
        [
            [1, 2],
            [   2],
            [ [1, undefined], [2, 2] ],
            'Base state has extra head element',
        ],
        [
            [1, 2],
            [1   ],
            [ [1, 1], [2, undefined] ],
            'Base state has extra tail element',
        ],
        [
            [1, 2, 3],
            [1,    3],
            [ [1, 1], [2, undefined], [3, 3] ],
            'Base state has extra middle element',
        ],
        [
            [1,    3],
            [1, 2, 3],
            [ [1, 1], [undefined, 2], [3, 3] ],
            'Target state has extra middle element',
        ],
    ];

    private static assertCorrectAlignmentIsCreated<T>(testCase:alignmentTestCase<T>) : void {
        const [base, target, expectedAlignment, testDesc] = testCase;
        const actualAlignment:alignmentSequence<T> = getAlignment(base, target);
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment,
                                 `Test Failed: ${testDesc}`);
    }

    @test public runTests() {
        TestGetAlignment.testCases.forEach(
            <T>(i:alignmentTestCase<T>) : void =>
                TestGetAlignment.assertCorrectAlignmentIsCreated(i),
        );
    }
}
