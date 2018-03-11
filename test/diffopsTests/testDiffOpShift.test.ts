import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    runOps,
    ShiftDiffOp,
} from '../importDependencies';

type ShiftTestCase<T> = {
    base:T[];
    expectedResults:T[];
    ops:ShiftDiffOp<T>[];
    desc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpShift {

    private static testCases:ShiftTestCase<any>[] = [
        {
            base:[1],
            expectedResults:[],
            ops:[new ShiftDiffOp()],
            desc:'Default object shifts one element.',
        },
        {
            base:[1],
            expectedResults:[],
            ops:[new ShiftDiffOp(2)],
            desc:'Empty array can be shifted without exception.',
        },
        {
            base:[1, 2, 3],
            expectedResults:[3],
            ops:[new ShiftDiffOp(2)],
            desc:'Multiple objects can be shifted at once.',
        },
    ];

    private static runTest<T>(testCase:ShiftTestCase<T>) {
        const {base, expectedResults, ops, desc} = testCase;
        const actualResults:T[] = new Array(...base);
        runOps(actualResults, ops);
        assertArraysAreEqual(actualResults, expectedResults, `Test Failed: ${desc}`);
    }

    @test public runTests() {
        TestDiffOpShift.testCases.forEach((currTest) => TestDiffOpShift.runTest(currTest));
    }

    @test public typeNameIsCorrect() {
        const shiftOp = new ShiftDiffOp();
        assert.equal(shiftOp.type, 'shift');
    }
}
