import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    AlignmentPosition,
    arrDiffTuple,
    // assertArraysAreEqual,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestAlignmentPosition {
    @test public testConstructorIdentifiesUndefinedParam() {
        const expectedError = AlignmentPosition.undefinedParamError;
        const invalidArrTuples:arrDiffTuple<number>[] = [
            [undefined, []],
            [[], undefined],
            [undefined, undefined],
        ];
        /* tslint:disable:no-unused-variable */
        invalidArrTuples.forEach((invalidTuple) =>
            assert.throws(
                () => { const pos = new AlignmentPosition(invalidTuple); },
                expectedError,
            ),
        );
        /* tslint:enable:no-unused-variable */
    }

    @test public testDefaultConstructorForTwoEmptyArrays() {
        const arrs:[number[], number[]] = [
            [], [],
        ];
        const pos = new AlignmentPosition(arrs);
        const lengths = pos.getLengthTuple();
        assert.equal(lengths[0], 0);
        assert.equal(lengths[1], 0);
        const bounds = pos.getBoundsTuple();
        assert.isFalse(bounds[0]);
        assert.isFalse(bounds[1]);
    }

    // @test public testPositionAccessorsForValidArray() {
    //     const base = [1, 2, 3, 4, 5];
    //     const target = [1, 2, 3, 4, 5];
    //     const pos = new AlignmentPosition(base, target);
    //     for (let i = 0; i < base.length; i++) {
    //         pos.setBasePosition(i);
    //         assert.equal(pos.getBasePosition(), i);
    //         pos.setTargetPosition(i);
    //         assert.equal(pos.getTargetPosition(), i);
    //         pos.setPositions(i, i);
    //         assertArraysAreEqual(pos.getPositionTuple(), [i, i]);
    //     }
    //     pos.setBasePosition(5);
    //     assert.isUndefined(pos.getBasePosition());
    //     pos.setTargetPosition(5);
    //     assert.isUndefined(pos.getTargetPosition());
    //     assertArraysAreEqual(pos.getPositionTuple(), [undefined, undefined]);
    // }
}
