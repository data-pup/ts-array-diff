import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { OpGroup } from '../importGetItemGroups';
import { assertArraysAreEqual } from '../importTestUtils';
import { alignmentSeqElem } from '../importTypes';

type OpGroupTestCase<T> = {
    items:alignmentSeqElem<T>[];
    expectedAddItems:T[];
    expectedRemoveCount:number;
    isValid:boolean;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestOpGroup {

    private static readonly testCases:OpGroupTestCase<any>[] = [
        {
            items:[],
            expectedAddItems:undefined,
            expectedRemoveCount:undefined,
            isValid:false,
            testDesc:'Empty group is not valid.',
        },
        {
            items:[{elemValue:0, elemType:'add'}],
            expectedAddItems:[0],
            expectedRemoveCount:0,
            isValid:true,
            testDesc:'Group containing a single add op is valid.',
        },
        {
            items:[{elemValue:0, elemType:'remove'}],
            expectedAddItems:[],
            expectedRemoveCount:1,
            isValid:true,
            testDesc:'Group containing a single remove op is valid.',
        },
        {
            items:[{elemValue:0, elemType:'noop'}],
            expectedAddItems:undefined,
            expectedRemoveCount:undefined,
            isValid:false,
            testDesc:'Group containing a single noop is not valid.',
        },
        {
            items:[
                {elemValue:0, elemType:'add'},
                {elemValue:0, elemType:'remove'},
            ],
            expectedAddItems:[0],
            expectedRemoveCount:1,
            isValid:true,
            testDesc:'Group containing multiple edits is valid.',
        },
        {
            items:[
                {elemValue:0, elemType:'add'},
                {elemValue:0, elemType:'noop'},
            ],
            expectedAddItems:[0],
            expectedRemoveCount:0,
            isValid:false,
            testDesc:'Group containing a noop and an edit is not valid.',
        },
    ];

    private static checkGroupIsCorrect<T>(testCase:OpGroupTestCase<T>) {
        const {items, expectedAddItems, expectedRemoveCount, testDesc} = testCase;
        const failString = `Test Failed: ${testDesc}`;
        const group = new OpGroup(items);
        assert.equal(group.type, 'edit', failString);
        assert.equal(group.removeCount, expectedRemoveCount, failString);
        assert.isDefined(group.addItems, failString);
        assertArraysAreEqual(group.addItems, expectedAddItems, failString);
    }

    private static runTest<T>(testCase:OpGroupTestCase<T>) {
        const {isValid} = testCase;
        if (isValid) {
            TestOpGroup.checkGroupIsCorrect(testCase);
        } else {
            assert.throws(
                (invalidItems:alignmentSeqElem<T>[]) : void => {
                    /* tslint:disable-next-line:no-unused-variable */
                    const invalidGroup = new OpGroup(invalidItems);
                },
                OpGroup.opGroupGivenInvalidArguments,
            );
        }
    }

    @test public runTests() {
        TestOpGroup.testCases.forEach((currTest) => TestOpGroup.runTest(currTest));
    }
}
