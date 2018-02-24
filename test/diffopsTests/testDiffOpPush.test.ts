import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { DiffOpPush, runOps } from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpPush {

    private static assertArraysAreEqual<T>(a:T[], b:T[]) {
        // [a, b].forEach((i) => assert.isDefined(i));
        assert.equal(a.length, b.length);
        const length = a.length;
        for (let i = 0; i < length; i++) {
            assert.equal(a[i], b[i]);
        }
    }

    @test public canPushOntoEmptyArray() {
        const arr:number[] = [];
        const pushOps:DiffOpPush<number>[] = [
            new DiffOpPush([1, 2]),
            new DiffOpPush([3, 4]),
        ];
        runOps(arr, pushOps);
        const expectedArray = [1, 2, 3, 4];
        TestDiffOpPush.assertArraysAreEqual(arr, expectedArray);
    }
}
