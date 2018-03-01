import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    AlignmentPosition,
    assertArraysAreEqual,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestAlignmentPosition {
    @test public testConstructorIdentifiesUndefinedParam() {
        const expectedError = AlignmentPosition.invalidConstructorParamError;
        /* tslint:disable:no-unused-variable */
        assert.throws(
            () => { const pos = new AlignmentPosition(undefined, []); },
            expectedError,
        );
        assert.throws(
            () => { const pos = new AlignmentPosition([], undefined); },
            expectedError,
        );
        assert.throws(
            () => { const pos = new AlignmentPosition(undefined, undefined); },
            expectedError,
        );
        /* tslint:enable:no-unused-variable */
    }

    @test public testDefaultConstructorForTwoEmptyArrays() {
        const base:number[] = [];
        const target:number[] = [];
        const pos = new AlignmentPosition(base, target);
        assert.isUndefined(pos.getBasePosition());
        assert.isUndefined(pos.getTargetPosition());
        pos.setBasePosition(1);
        assert.isUndefined(pos.getBasePosition());
        pos.setBasePosition(-1);
        assert.isUndefined(pos.getBasePosition());
    }

    @test public testPositionAccessorsForValidArray() {
        const base = [1, 2, 3, 4, 5];
        const target = [1, 2, 3, 4, 5];
        const pos = new AlignmentPosition(base, target);
        for (let i = 0; i < base.length; i++) {
            pos.setBasePosition(i);
            assert.equal(pos.getBasePosition(), i);
            pos.setTargetPosition(i);
            assert.equal(pos.getTargetPosition(), i);
            pos.setPositions(i, i);
            assertArraysAreEqual(pos.getPositionTuple(), [i, i]);
        }
        pos.setBasePosition(5);
        assert.isUndefined(pos.getBasePosition());
        pos.setTargetPosition(5);
        assert.isUndefined(pos.getTargetPosition());
        assertArraysAreEqual(pos.getPositionTuple(), [undefined, undefined]);
    }
}
