import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    AlignmentPosition,
    arrDiffTuple,
    assertArraysAreEqual,
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
        const bounds = pos.getBoundsTuple();
        [0, 1].forEach((i) => {
            assert.equal(lengths[i], 0);
            assert.isFalse(bounds[i]);
        });
    }

    @test public testPositionAccessorsForValidArray() {
        const arrs:[number[], number[]] = [
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5],
        ];
        const pos = new AlignmentPosition(arrs);
        const loopMax = arrs[0].length;
        for (let i = 0; i < loopMax; i++) {
            pos.setPositions([i, i]);
            assertArraysAreEqual(pos.getPositionTuple(), [i, i]);
        }
        const invalidPosition = loopMax;
        pos.setPositions([invalidPosition, invalidPosition]);
        assertArraysAreEqual(pos.getPositionTuple(), [undefined, undefined]);
    }

    @test public testElementAccessors() {
        const arrs:[number[], number[]] = [
            [1, 2, 3],
            [2, 3, 4],
        ];
        const pos = new AlignmentPosition(arrs);
        const loopMax = arrs[0].length;
        for (let i = 0; i < loopMax; i++) {
            pos.setPositions([i, i]);
            assertArraysAreEqual(pos.getPositionTuple(), [i, i]);
            const expectedElements = [i + 1, i + 2];
            assertArraysAreEqual(pos.getCurrentElems(), expectedElements);
        }
        const invalidPosition = loopMax;
        pos.setPositions([invalidPosition, invalidPosition]);
        assertArraysAreEqual(pos.getPositionTuple(), [undefined, undefined]);
    }
}
