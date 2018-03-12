import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { checkBounds } from '../importGetAlignment';

type CheckBoundsTestCase<T> = {
    pos:number;
    arr:T[];
    expectedResult:boolean;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestCheckBounds {

    // Test cases for the `checkBounds` function.
    private static readonly checkBoundsTestCases:CheckBoundsTestCase<any>[] = [
        {
            pos:0, arr:undefined,
            expectedResult:false,
            testDesc:'Undefined array has no index in bounds',
        },
        {
            pos:0, arr:[],
            expectedResult:false,
            testDesc:'Empty array has no index in bounds',
        },
        {
            pos:0, arr:[1],
            expectedResult:true,
            testDesc:'Valid index must be in bounds',
        },
        {
            pos:1, arr:[1],
            expectedResult:false,
            testDesc:'Index equal to length cannot be in bounds',
        },
        {
            pos:-1, arr:[1],
            expectedResult:false,
            testDesc:'Negative index cannot be in bounds',
        },
    ];

    // Private helper asserts that a bounds check test case passes.
    private static runTest<T>(testCase:CheckBoundsTestCase<T>) : void {
        const {arr, pos, expectedResult, testDesc} = testCase;
        const actualResult = checkBounds(pos, arr);
        assert.strictEqual(expectedResult, actualResult, `Failed test: ${testDesc}`);
    }

    // Run the `checkBounds` tests.
    @test public runTests() {
        TestCheckBounds.checkBoundsTestCases.forEach(
            <T>(currTest:CheckBoundsTestCase<T>) : void =>
                TestCheckBounds.runTest(currTest),
        );
    }
}
