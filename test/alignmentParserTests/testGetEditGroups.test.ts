import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
// import {
//     // alignmentSeq,
//     // assertAlignmentsAreEqual,
//     // getAlignment,
//     // getEditGroups,
// } from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetEditGroups {
    // private checkEditGroupsAreSame<T>(a:alignmentSeq<T>[], b:alignmentSeq<T>[]) {
    //     assert.equal(a.length, b.length);
    //     for (let i = 0; i < a.length; i++) {
    //         assertAlignmentsAreEqual(a[i], b[i]);
    //     }
    // }

    @test public placeholder() {
        assert.equal(1, 2, 'Todo!');
    }

    // @test public basicEditGroupTest() {
    //     const seq:alignmentSeq<number> = [
    //         [undefined, 0],
    //         [1, 1],
    //         [2, undefined],
    //         [3, undefined],
    //         [4, 4],
    //         [5, 5],
    //         [undefined, 6],
    //     ];
    //     const actualGroups:alignmentSeq<number>[] = getEditGroups(seq);
    //     const expectedGroups:alignmentSeq<number>[] = [
    //         [ [undefined, 0] ],
    //         [ [1, 1] ],
    //         [ [2, undefined], [3, undefined] ],
    //         [ [4, 4], [5, 5] ],
    //         [ [undefined, 6] ],
    //     ];
    //     this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    // }

    // @test public testSpliceGroupIsIdentified() {
    //     const base = [1, 2, 4];
    //     const target = [1, 3, 4];
    //     const seq:alignmentSeq<number> = getAlignment(base, target);
    //     const actualGroups:alignmentSeq<number>[] = getEditGroups(seq);
    //     const expectedGroups:alignmentSeq<number>[] = [
    //         [ [1, 1] ],
    //         [ [2, undefined], [undefined, 3] ],
    //         [ [4, 4] ],
    //     ];
    //     this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    // }

    // @test public testShiftAndUnshiftAreIdentified() {
    //     const base = [0, 2, 3];
    //     const target = [1, 2, 3];
    //     const seq:alignmentSeq<number> = getAlignment(base, target);
    //     const actualGroups:alignmentSeq<number>[] = getEditGroups(seq);
    //     const expectedGroups:alignmentSeq<number>[] = [
    //         [ [0, undefined], [undefined, 1] ],
    //         [ [2, 2], [3, 3] ],
    //     ];
    //     this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    // }

    // @test public testPopAndPushAreIdentified() {
    //     const base = [1, 2];
    //     const target = [1, 3];
    //     const seq:alignmentSeq<number> = getAlignment(base, target);
    //     const actualGroups:alignmentSeq<number>[] = getEditGroups(seq);
    //     const expectedGroups:alignmentSeq<number>[] = [
    //         [ [1, 1] ], [ [2, undefined], [undefined, 3] ],
    //     ];
    //     this.checkEditGroupsAreSame(actualGroups, expectedGroups);
    // }
}
