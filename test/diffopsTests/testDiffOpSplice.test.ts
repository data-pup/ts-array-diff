import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    runOps,
    SpliceDiffOp,
} from '../importDependencies';

type SpliceTestCase<T> = {
    base:T[];
    expectedResults:T[];
    ops:SpliceDiffOp<T>[];
    desc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpSplice {

    private static testCases:SpliceTestCase<any>[] = [
        {
            base:[1, 2, 3],
            expectedResults:[1, 3],
            ops:[new SpliceDiffOp<number>(1, 1)],
            desc:'Single item can be removed from array body.',
        },
        {
            base:[1, 2, 3, 4, 5],
            expectedResults:[1, 5],
            ops:[new SpliceDiffOp<number>(1, 3)],
            desc:'Multiple items can be removed from array body.',
        },
        {
            base:[1, 2, 3, 4, 5],
            expectedResults:[1, 7, 5],
            ops:[new SpliceDiffOp<number>(1, 3, [7])],
            desc:'Multiple items can be replaced in array body.',
        },
    ];

    private static runTest<T>(testCase:SpliceTestCase<T>) : void {
        const {base, expectedResults, ops, desc} = testCase;
        const actualResults:T[] = new Array(...base);
        runOps(actualResults, ops);
        assertArraysAreEqual(actualResults, expectedResults, `Test Failed: ${desc}`);
    }

    @test public runTests() {
        TestDiffOpSplice.testCases.forEach((currTest) => TestDiffOpSplice.runTest(currTest));
    }

    @test public typeNameIsCorrect() {
        const op = new SpliceDiffOp(0, 0);
        assert.equal(op.type, 'splice');
    }
}
