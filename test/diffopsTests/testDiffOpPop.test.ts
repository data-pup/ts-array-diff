import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    PopDiffOp,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpPop {
    @test public testDefaultPopObject() {
        const defaultPop = new PopDiffOp();
        assert.equal(defaultPop.count, 1);
        assert.equal(defaultPop.type, 'pop');
    }

    @test public testBasicPopOperations() {
        const arr = [1, 2, 3, 4, 5];
        const popOps:PopDiffOp<number>[] = [
            new PopDiffOp(),
            new PopDiffOp(2),
        ];

        popOps[0].runOp(arr);
        let expectedArr = [1, 2, 3, 4];
        assertArraysAreEqual(arr, expectedArr);

        popOps[1].runOp(arr);
        expectedArr = [1, 2];
        assertArraysAreEqual(arr, expectedArr);
    }
}
