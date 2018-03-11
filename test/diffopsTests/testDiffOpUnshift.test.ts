import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    assertArraysAreEqual,
    runOps,
    UnshiftDiffOp,
    unshiftOpGivenEmptyItemsArray,
} from '../importDependencies';

type UnshiftTestCase<T> = {
    base:T[];
    expectedResults:T[];
    ops:UnshiftDiffOp<T>[];
    desc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiffOpUnshift {

    private static testCases:UnshiftTestCase<any>[] = [
        {
            base:[],
            expectedResults:[1],
            ops:[new UnshiftDiffOp([1])],
            desc:'Single element can be unshifted onto an empty array.',
        },
        {
            base:[3, 4, 5],
            expectedResults:[1, 2, 3, 4, 5],
            ops:[new UnshiftDiffOp([2]), new UnshiftDiffOp([1])],
            desc:'Two elements can be unshifted onto an array in two operations.',
        },
        {
            base:[3, 4, 5],
            expectedResults:[1, 2, 3, 4, 5],
            ops:[new UnshiftDiffOp([1, 2])],
            desc:'Two elements can be unshifted onto an array in two operations.',
        },
    ];

    private static runTest<T>(testCase:UnshiftTestCase<T>) : void {
        const {base, expectedResults, ops, desc} = testCase;
        const actualResults:T[] = new Array(...base);
        runOps(actualResults, ops);
        assertArraysAreEqual(actualResults, expectedResults, `Test Failed: ${desc}`);
    }

    @test public runTests() {
        TestDiffOpUnshift.testCases.forEach((currTest) => TestDiffOpUnshift.runTest(currTest));
    }

    @test public typeNameIsCorrect() {
        const op = new UnshiftDiffOp(['hello', 'world']);
        assert.equal(op.type, 'unshift');
    }

    @test public emptyConstructorArgumentsThrowsException() {
        assert.throws(
            () => {
                /* tslint:disable-next-line:no-unused-variable */
                const invalidOp = new UnshiftDiffOp([]);
            },
            unshiftOpGivenEmptyItemsArray,
        );
    }
}
