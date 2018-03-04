// import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    AlignmentPosition,
    arrDiffTuple,
} from '../importDependencies';
import { assertAlignmentsAreEqual } from '../testUtils/assertAlignmentsAreEqual';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestAlignmentPosition {
    @test public testAlignmentWhereTargetHasTail() {
        const arrs:arrDiffTuple<number> = [
            [1   ],
            [1, 2],
        ];
        const pos = new AlignmentPosition<number>(arrs);
        const actualAlignment:[number, number][] = pos.getAlignment();
        const expectedAlignment:[number, number][] = [
            [1, 1],
            [undefined, 2],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testAlignmentWhereTargetHasHead() {
        const arrs:arrDiffTuple<number> = [
            [   2],
            [1, 2],
        ];
        const pos = new AlignmentPosition<number>(arrs);
        const actualAlignment:[number, number][] = pos.getAlignment();
        const expectedAlignment:[number, number][] = [
            [undefined, 1],
            [2, 2],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }
}
