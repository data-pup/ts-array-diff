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

    @test public testMatchIsForwardInBaseArray() {
        const base = [1, 2, 3];
        const target = [3];
        const [currBaseIndex, currTargetIndex] = [0, 0];
        const actualMatch:[number, number] = getNextMatchingPositions(
            base, target, currBaseIndex, currTargetIndex);
        const expectedMatch:[number, number] = [2, 0];
        assertArraysAreEqual(actualMatch, expectedMatch);
    }

    @test public testFunctionCanRecurseSuccessfully() {
        const base = [3, 4, 5];
        const target = [1, 2, 4];
        const [currBaseIndex, currTargetIndex] = [0, 0];
        const actualMatch:[number, number] = getNextMatchingPositions(
            base, target, currBaseIndex, currTargetIndex);
        const expectedMatch:[number, number] = [1, 2];
        assertArraysAreEqual(actualMatch, expectedMatch);
    }

    @test public testArraysWithNoFurtherMatchesReturnUndefined() {
        const base = [1, 2, 3, 4, 5, 6];
        const target = [1, 2, 7, 8, 9, 0];
        const [currBaseIndex, currTargetIndex] = [2, 2];
        const actualMatch:[number, number] = getNextMatchingPositions(
            base, target, currBaseIndex, currTargetIndex);
        const expectedMatch:[number, number] = [undefined, undefined];
        assertArraysAreEqual(actualMatch, expectedMatch);
    }
}
