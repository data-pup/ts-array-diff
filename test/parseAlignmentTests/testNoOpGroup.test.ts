import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { alignmentSeqElem, NoOpGroup } from '../importDependencies';

type NoOpGroupTestCase<T> = {
    group:alignmentSeqElem<T>[];
    expectedCount:number;
    isValid:boolean;
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestNoOpGroup {

    private static readonly testCases:NoOpGroupTestCase<any>[] = [
        {
            group:[],
            expectedCount:undefined,
            isValid:false,
            testDesc:'Empty group is not valid.',
        },
        {
            group:[{elemValue:0, elemType:'add'}],
            expectedCount:undefined,
            isValid:false,
            testDesc:'Group containing a add op is not valid.',
        },
        {
            group:[{elemValue:0, elemType:'remove'}],
            expectedCount:undefined,
            isValid:false,
            testDesc:'Group containing a remove op is not valid.',
        },
        {
            group:[{elemValue:0, elemType:'noop'}],
            expectedCount:1,
            isValid:true,
            testDesc:'Group containing a single noop is valid.',
        },
        {
            group:[
                {elemValue:0, elemType:'noop'},
                {elemValue:0, elemType:'noop'},
            ],
            expectedCount:2,
            isValid:true,
            testDesc:'Group containing multiple noops is valid.',
        },
        {
            group:[
                {elemValue:0, elemType:'add'},
                {elemValue:0, elemType:'noop'},
            ],
            expectedCount:undefined,
            isValid:false,
            testDesc:'Group containing a noop and an edit is not valid.',
        },
    ];

    private static runTest<T>(testCase:NoOpGroupTestCase<T>) {
        const {group, expectedCount, isValid, testDesc} = testCase;
        const failString = `Test Failed: ${testDesc}`;
        if (isValid) {
            const testGroup = new NoOpGroup(group);
            assert.equal(testGroup.type, 'noop', failString);
            assert.strictEqual(testGroup.count, expectedCount, failString);
        } else {
            assert.throws(
                (items:alignmentSeqElem<T>[]) : void => {
                    /* tslint:disable-next-line:no-unused-variable */
                    const invalidGroup = new NoOpGroup(items);
                },
                NoOpGroup.noOpGroupGivenInvalidArguments,
            );
        }
    }

    @test public runTests() {
        TestNoOpGroup.testCases.forEach((currTest) => TestNoOpGroup.runTest(currTest));
    }
}
