// import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { getAlignment } from '../importDependencies';
import { assertAlignmentsAreEqual } from '../testUtils/assertAlignmentsAreEqual';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestAlignmentFunctions {
    @test public testTargetHasExtraTail() {
        const base = [1];
        const target = [1, 2];
        const actualAlignment:[number, number][] = getAlignment(base, target);
        const expectedAlignment:[number, number][] = [
            [1, 1],
            [undefined, 2],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testTargetHasExtraHead() {
        const base = [2];
        const target = [1, 2];
        const actualAlignment:[number, number][] = getAlignment(base, target);
        const expectedAlignment:[number, number][] = [
            [undefined, 1],
            [2, 2],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testBaseHasExtraHead() {
        const base = [1, 2];
        const target = [2];
        const actualAlignment:[number, number][] = getAlignment(base, target);
        const expectedAlignment:[number, number][] = [
            [1, undefined],
            [2, 2],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testBaseHasExtraTail() {
        const base = [1, 2];
        const target = [1];
        const actualAlignment:[number, number][] = getAlignment(base, target);
        const expectedAlignment:[number, number][] = [
            [1, 1],
            [2, undefined],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }

    @test public testBaseHasExtraMiddleElement() {
        const base = [1, 2, 3];
        const target = [1, 3];
        const actualAlignment:[number, number][] = getAlignment(base, target);
        const expectedAlignment:[number, number][] = [
            [1, 1],
            [2, undefined],
            [3, 3],
        ];
        assertAlignmentsAreEqual(actualAlignment, expectedAlignment);
    }
}
