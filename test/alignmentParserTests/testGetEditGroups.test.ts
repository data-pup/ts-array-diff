import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    AlignmentPosition,
    alignmentSequence,
    assertAlignmentsAreEqual,
    getEditGroups,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetEditGroups {
    private checkEditGroupsAreSame<T>(a:alignmentSequence<T>[], b:alignmentSequence<T>[]) {
        assert.equal(a.length, b.length);
        for (let i = 0; i < a.length; i++) {
            assertAlignmentsAreEqual(a[i], b[i]);
        }
    }

    @test public basicEditGroupTest() {
        const seq:alignmentSequence<number> = [
            [undefined, 0],
            [1, 1],
            [2, undefined],
            [3, undefined],
            [4, 4],
            [5, 5],
            [undefined, 6],
        ];
        const actualGroups:alignmentSequence<number>[] = getEditGroups(seq);
        const expectedGroups:alignmentSequence<number>[] = [
            [ [undefined, 0] ],
            [ [1, 1] ],
            [ [2, undefined], [3, undefined] ],
            [ [4, 4], [5, 5] ],
            [ [undefined, 6] ],
        ];
        this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    }

    @test public testSpliceGroupIsIdentified() {
        const base = [1, 2, 4];
        const target = [1, 3, 4];
        const seq:alignmentSequence<number> =
            new AlignmentPosition([base, target]).getAlignment();
        const actualGroups:alignmentSequence<number>[] = getEditGroups(seq);
        const expectedGroups:alignmentSequence<number>[] = [
            [ [1, 1] ],
            [ [2, undefined], [undefined, 3] ],
            [ [4, 4] ],
        ];
        this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    }

    @test public testShiftAndUnshiftAreIdentified() {
        const base = [0, 2, 3];
        const target = [1, 2, 3];
        const seq:alignmentSequence<number> =
            new AlignmentPosition([base, target]).getAlignment();
        const actualGroups:alignmentSequence<number>[] = getEditGroups(seq);
        const expectedGroups:alignmentSequence<number>[] = [
            [ [0, undefined], [undefined, 1] ],
            [ [2, 2], [3, 3] ],
        ];
        this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    }
}
