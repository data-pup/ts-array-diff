import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { assertArraysAreEqual, ShiftDiffOp } from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpShift {
    @test public testDefaultShiftObject() {
        const defaultShift = new ShiftDiffOp();
        assert.equal(defaultShift.count, 1);
        assert.equal(defaultShift.type, 'shift');
    }

    @test public testBasicShiftOperations() {
        const arr = [1, 2, 3, 4, 5];
        const shiftOps:ShiftDiffOp<number>[] = [
            new ShiftDiffOp(),
            new ShiftDiffOp(2),
        ];

        shiftOps[0].runOp(arr);
        let expectedArr = [2, 3, 4, 5];
        assertArraysAreEqual(arr, expectedArr);

        shiftOps[1].runOp(arr);
        expectedArr = [4, 5];
        assertArraysAreEqual(arr, expectedArr);
    }
}
