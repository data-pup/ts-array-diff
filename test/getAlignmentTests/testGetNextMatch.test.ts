import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { getNextMatch, indexTuple } from '../importDependencies';
import { assertArraysAreEqual } from '../testUtils/assertArraysAreEqual';

// [ base state, target state, start pos, expected match, test description ]
type matchTestCase<T> = [T[], T[], indexTuple, indexTuple, string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetNextMatch {

    private static testCases:matchTestCase<any>[] = [
        [[1, 2, 0], [3, 4, 0], [0, 0], [2, 2], 'Finding match at tail.'],
        [[1, 2, 3], [4, 5, 6], [0, 0], [3, 3], 'Lengths returned for no match.'],
        [[0, 1, 2], [2, 0, 1], [0, 0], [0, 1], 'Closest match is found'],
        [[1, 2, 3], [1, 2, 3], [0, 0], [0, 0], 'Current pos. is returned if match.'],
        [[0, 1], [0, 1], [3, 3], [2, 2], 'Lengths returned if out of bounds'],
    ];

    private static assertTestCasePasses<T>(test:matchTestCase<T>) : void {
        const [base, target, pos, expectedMatch, testDesc]:matchTestCase<T> = test;
        const actualMatch = getNextMatch(pos, [base, target]);
        assertArraysAreEqual(actualMatch, expectedMatch, `Test Failed: ${testDesc}`);
    }

    @test public runTests() {
        TestGetNextMatch.testCases.forEach(
            (currCase) => TestGetNextMatch.assertTestCasePasses(currCase)
        );
    }
}
