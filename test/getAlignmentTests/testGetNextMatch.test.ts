import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    getNextMatch,
    indexTuple,
} from '../importDependencies';

type matchTestCase<T> = {
    base:T[];
    target:T[];
    pos:indexTuple;
    expectedMatch:indexTuple;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetNextMatch {

    private static readonly testCases:matchTestCase<any>[] = [
        {
            base:[1, 2, 0],
            target:[3, 4, 0],
            pos:[0, 0],
            expectedMatch:[2, 2],
            testDesc:'Finding match at tail.',
        },
        {
            base:[1, 2, 3],
            target:[4, 5, 6],
            pos:[0, 0],
            expectedMatch:[3, 3],
            testDesc:'Lengths returned for no match.',
        },
        {
            base:[0, 1, 2],
            target:[2, 0, 1],
            pos:[0, 0],
            expectedMatch:[0, 1],
            testDesc:'Closest match is found',
        },
        {
            base:[1, 2, 3],
            target:[1, 2, 3],
            pos:[0, 0],
            expectedMatch:[0, 0],
            testDesc:'Current pos. is returned if match.',
        },
        {
            base:[0, 1],
            target:[0, 1],
            pos:[3, 3],
            expectedMatch:[2, 2],
            testDesc:'Lengths returned if out of bounds',
        },
    ];

    private static runTest<T>(testCase:matchTestCase<T>) : void {
        const {base, target, pos, expectedMatch, testDesc} = testCase;
        const actualMatch = getNextMatch(pos, [base, target]);
        assertArraysAreEqual(actualMatch, expectedMatch, `Test Failed: ${testDesc}`);
    }

    @test public runTests() {
        TestGetNextMatch.testCases.forEach(
            (currCase) => TestGetNextMatch.runTest(currCase),
        );
    }
}
