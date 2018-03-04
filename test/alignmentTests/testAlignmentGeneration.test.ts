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

    @test public testAlignmentWhereBaseHasHead() {
        const arrs:arrDiffTuple<number> = [
            [1, 2],
            [   2],
        ];
        const pos = new AlignmentPosition<number>(arrs);
        const actualAlignment:[number, number][] = pos.getAlignment();
        const expectedAlignment:[number, number][] = [
            [1, undefined],
            [2, 2],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testAlignmentWhereBaseHasTail() {
        const arrs:arrDiffTuple<number> = [
            [1, 2],
            [1   ],
        ];
        const pos = new AlignmentPosition<number>(arrs);
        const actualAlignment:[number, number][] = pos.getAlignment();
        const expectedAlignment:[number, number][] = [
            [1, 1],
            [2, undefined],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testAlignmentWhereBaseHasExtraMiddleElement() {
        const arrs:arrDiffTuple<number> = [
            [1, 2, 3],
            [1,    3],
        ];
        const pos = new AlignmentPosition<number>(arrs);
        const actualAlignment:[number, number][] = pos.getAlignment();
        const expectedAlignment:[number, number][] = [
            [1, 1],
            [2, undefined],
            [3, 3],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testAlignmentForBaseAndTargetWithVariousChanges() {
        const arrs:arrDiffTuple<number> = [
            [   2, 3, 3, 4,    5, 6, 8   ],
            [1, 2, 3,    4, 4, 5, 7, 8, 9],
        ];
        const pos = new AlignmentPosition<number>(arrs);
        const actualAlignment:[number, number][] = pos.getAlignment();
        const expectedAlignment:[number, number][] = [
            [undefined, 1],
            [2, 2],
            [3, 3],
            [3, undefined],
            [4, 4],
            [undefined, 4],
            [5, 5],
            [6, undefined],
            [undefined, 7],
            [8, 8],
            [undefined, 9],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }
}
