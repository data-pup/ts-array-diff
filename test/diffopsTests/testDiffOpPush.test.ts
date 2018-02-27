import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    PushDiffOp,
    runOps,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpPush {
    @test public typeNameIsCorrect() {
        const pushOp = new PushDiffOp([]);
        assert.equal(pushOp.type, 'push');
    }

    @test public canPushOntoEmptyArray() {
        const arr:number[] = [];
        const pushOps:PushDiffOp<number>[] = [
            new PushDiffOp([1, 2]),
            new PushDiffOp([3, 4]),
        ];
        runOps(arr, pushOps);
        const expectedArray = [1, 2, 3, 4];
        assertArraysAreEqual(arr, expectedArray);
    }
}
