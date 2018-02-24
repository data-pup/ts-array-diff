import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { assertArraysAreEqual, DiffOpUnshift } from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpUnshift {
    @test public testDefaultUnshiftObject() {
        const op = new DiffOpUnshift<number>([]);
        assert.equal(op.type, 'unshift');
        assert.isEmpty(op.items);
    }

    @test public testBasicUnshiftOps() {
        const op = new DiffOpUnshift<number>([1, 2, 3]);
        const arr = [4];
        op.runOp(arr);
        const expectedArr = [1, 2, 3, 4];
        assertArraysAreEqual(arr, expectedArr);
    }
}
