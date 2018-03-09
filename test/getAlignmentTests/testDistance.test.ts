import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { indexTuple, getDistance } from '../importDependencies';

type DistanceTestCase = [indexTuple, indexTuple, number, string];

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDistance {

    private static testCases:DistanceTestCase[] = [
        [ [0, 0], [0, 1], 1, 'Target incremented by 1 has distance 1' ],
        [ [0, 0], [1, 0], 1, 'Base incremented by 1 has distance 1' ],
        [ [0, 0], [1, 1], 2, 'Both incremented by 1 has distance 2' ],
    ];

    @test public basicTests() {
        TestDistance.testCases.forEach(
            (currTest:DistanceTestCase) : void => {
                const [startPos, newPos, expectedDistance, testDesc]
                    :[indexTuple, indexTuple, number, string] = currTest;
                const actualDistance = getDistance(startPos, newPos);
                assert.equal(actualDistance, expectedDistance, `Test Failed: ${testDesc}`);
        });
    }
}
