import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    PushDiffOp,
    runOps,
} from '../importDependencies';

type PushTestCase<T> = {
    base:T[];
    expectedResults:T[];
    ops:PushDiffOp<T>[];
    desc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpPush {

    private static testCases:PushTestCase<any>[] = [
        {
            base:[],
            expectedResults:[1],
            ops:[new PushDiffOp<number>([1])],
            desc:'Single item can be pushed onto empty array.',
        },
        {
            base:[],
            expectedResults:[1, 2],
            ops:[new PushDiffOp<number>([1]), new PushDiffOp<number>([2])],
            desc:'Two push operations work correctly.',
        },
        {
            base:[],
            expectedResults:[1, 2],
            ops:[new PushDiffOp<number>([1, 2])],
            desc:'Two elements can be pushed onto the array at once.',
        },
    ];

    private static runTest<T>(testCase:PushTestCase<T>) : void {
        const {base, expectedResults, ops, desc} = testCase;
        const actualResults:T[] = new Array(...base);
        runOps(actualResults, ops);
        assertArraysAreEqual(actualResults, expectedResults, `Test Failed: ${desc}`);
    }

    @test public runTests() {
        TestDiffOpPush.testCases.forEach((currTest) => TestDiffOpPush.runTest(currTest));
    }

    @test public typeNameIsCorrect() {
        const pushOp = new PushDiffOp([]);
        assert.equal(pushOp.type, 'push');
    }
}
