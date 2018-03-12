import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    alignmentSeqElem,
    getIsEditElem,
} from '../importDependencies';

type IsEditElemTestCase<T> = {
    elem:alignmentSeqElem<T>;
    expectedResult:boolean;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestIsEditElem {

    private static readonly testCases:IsEditElemTestCase<any>[] = [
        {
            elem:{elemValue:0, elemType:'add'},
            expectedResult:true,
            testDesc:'Item to be added is an edit element.',
        },
        {
            elem:{elemValue:0, elemType:'noop'},
            expectedResult:false,
            testDesc:'Noop is not an edit element.',
        },
        {
            elem:{elemValue:0, elemType:'remove'},
            expectedResult:true,
            testDesc:'Item to be removed is an edit element.',
        },
    ];

    private static runTest<T>(testCase:IsEditElemTestCase<T>) : void {
        const {elem, expectedResult, testDesc} = testCase;
        const actualResult:boolean = getIsEditElem(elem);
        assert.equal(actualResult, expectedResult, `Test Failed ${testDesc}`);
    }

    @test public runTests() {
        TestIsEditElem.testCases.forEach((currTest) => TestIsEditElem.runTest(currTest));
    }
}
