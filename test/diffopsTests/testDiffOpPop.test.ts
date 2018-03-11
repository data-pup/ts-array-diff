import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    PopDiffOp,
    runOps,
} from '../importDependencies';

type PopTestCase<T> = {
    base:T[];
    expectedResults:T[];
    ops:PopDiffOp<T>[];
    desc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpPop {

    private static testCases:PopTestCase<any>[] = [
        {
            base:[1, 2, 3],
            expectedResults:[1, 2],
            ops:[new PopDiffOp<number>()],
            desc:'Default pop removes one item.',
        },
        {
            base:[],
            expectedResults:[],
            ops:[new PopDiffOp<number>()],
            desc:'Empty array can be popped without exception.',
        },
        {
            base:[1, 2, 3, 4, 5],
            expectedResults:[],
            ops:[new PopDiffOp<number>(5)],
            desc:'Array can be emptied with pop.',
        },
    ];

    private static runTest<T>(testCase:PopTestCase<T>) : void {
        const {base, expectedResults, ops, desc} = testCase;
        const actualResults:T[] = new Array(...base);
        runOps(actualResults, ops);
        assertArraysAreEqual(actualResults, expectedResults, `Test Failed: ${desc}`);
    }

    @test public runTests() {
        TestDiffOpPop.testCases.forEach((currTest) => TestDiffOpPop.runTest(currTest));
    }
}
