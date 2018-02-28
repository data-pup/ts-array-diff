import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    getNextMatchingPositions,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetNextMatchingPositions {
    @test public testMatchIsForwardInTargetArray() {
        const base = [3];
        const target = [1, 2, 3];
        const [currBaseIndex, currTargetIndex] = [0, 0];
        const actualMatch:[number, number] = getNextMatchingPositions(
            base, target, currBaseIndex, currTargetIndex);
        const expectedMatch:[number, number] = [0, 2];
        assertArraysAreEqual(actualMatch, expectedMatch);
    }
}
