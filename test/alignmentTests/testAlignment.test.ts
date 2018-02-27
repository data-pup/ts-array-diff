import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { findLargestLength } from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestAlignmentFunctions {
    @test public testTwoUndefinedArrays() {
        const a:any[] = undefined;
        const b:any[] = undefined;
        const largestLength = findLargestLength(a, b);
        const expectedResult = 0;
        assert.equal(largestLength, expectedResult);
    }

    @test public testOneEmptyAndOneUndefinedArray() {
        const a:any[] = [];
        const b:any[] = undefined;
        let largestLength = findLargestLength(a, b);
        let expectedResult = 0;
        assert.equal(largestLength, expectedResult);
        largestLength = findLargestLength(b, a);
        expectedResult = 0;
        assert.equal(largestLength, expectedResult);
    }

    @test public testOneEmptyAndOneExistingArray() {
        const a:number[] = [];
        const b:number[] = [1, 2, 3];
        let largestLength = findLargestLength(a, b);
        let expectedResult = 3;
        assert.equal(largestLength, expectedResult);
        largestLength = findLargestLength(b, a);
        expectedResult = 3;
        assert.equal(largestLength, expectedResult);
    }

    @test public testTwoArraysOfDifferentLength() {
        const a:number[] = [1];
        const b:number[] = [1, 2, 3];
        let largestLength = findLargestLength(a, b);
        let expectedResult = 3;
        assert.equal(largestLength, expectedResult);
        largestLength = findLargestLength(b, a);
        expectedResult = 3;
        assert.equal(largestLength, expectedResult);
    }
}
