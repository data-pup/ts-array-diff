import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    getIndicesInRange,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetIndicesInRange {
    @test public testInvalidParamsCauseError() {
        assert.throws(() => { getIndicesInRange(-1, 0); });
        assert.throws(() => { getIndicesInRange(0, -1); });
        assert.throws(() => { getIndicesInRange(2, 1); });
    }

    @test public testEqualValuesReturnEmptyArray() {
        const actualRange = getIndicesInRange(0, 0);
        assert.isEmpty(actualRange);
    }

    @test public testBasicRange() {
        const actualRange = getIndicesInRange(0, 5);
        const expectedRange = [0, 1, 2, 3, 4];
        assertArraysAreEqual(actualRange, expectedRange);
    }
}
