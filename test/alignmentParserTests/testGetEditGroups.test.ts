import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
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
}
