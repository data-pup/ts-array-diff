import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { indexTuple } from '../importTypes';
import { getDistance } from '../importGetAlignment';

type DistanceTestCase = {
    startPos:indexTuple;
    newPos:indexTuple;
    expectedDistance:number;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDistance {

    private static readonly testCases:DistanceTestCase[] = [
        {
            startPos:[0, 0], newPos:[0, 1],
            expectedDistance:1,
            testDesc:'Target incremented by 1 has distance 1',
        },
        {
            startPos:[0, 0], newPos:[1, 0],
            expectedDistance:1,
            testDesc:'Base incremented by 1 has distance 1',
        },
        {
            startPos:[0, 0], newPos:[1, 1],
            expectedDistance:2,
            testDesc:'Both incremented by 1 has distance 2',
        },
    ];

    private static runTest(testCase:DistanceTestCase) {
        const {startPos, newPos, expectedDistance, testDesc} = testCase;
        const actualDistance = getDistance(startPos, newPos);
        assert.equal(actualDistance, expectedDistance, `Test Failed: ${testDesc}`);
    }

    @test public runTests() {
        TestDistance.testCases.forEach((currTest) => TestDistance.runTest(currTest));
    }
}
