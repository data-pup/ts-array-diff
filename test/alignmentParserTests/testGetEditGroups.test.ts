import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    alignmentSequence,
    assertAlignmentsAreEqual,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetEditGroups {
    private checkEditGroupsAreSame<T>(a:alignmentSequence<T>[], b:alignmentSequence<T>[]) {
        assert.equal(a.length, b.length);
        for (let i = 0; i < a.length; i++) {
            assertAlignmentsAreEqual(a[i], b[i]);
        }
    }

    @test public placeholderTest() {
        const a:alignmentSequence<number>[] = [
            [ [undefined, 0] ],
            [ [1, 1] ],
            [ [2, undefined] ],
        ];
        const b:alignmentSequence<number>[] = [
            [ [undefined, 0] ],
            [ [1, 1] ],
            [ [2, undefined] ],
        ];
        this.checkEditGroupsAreSame(a, b);
    }
}
