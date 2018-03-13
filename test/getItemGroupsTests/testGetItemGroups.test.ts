import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { NoOpGroup, OpGroup, getItemGroups } from '../importGetItemGroups';
import { assertArraysAreEqual } from '../importTestUtils';
import { alignmentSeq, itemGroup } from '../importTypes';

type expectedNoOpGroup = { type:'noop'; count:number; };
type expectedOpGroup<T> = { type:'edit'; removeCount:number; addItems:T[] };
type expectedItemGroup<T> = expectedNoOpGroup | expectedOpGroup<T>;

type getItemGroupsTestCase<T> = {
    alignment:alignmentSeq<T>;
    expectedResults:expectedItemGroup<T>[];
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetItemGroups {

    private static readonly testCases:getItemGroupsTestCase<any>[] = [
        {
            alignment:[{elemValue:0, elemType:'noop'}],
            expectedResults:[{type:'noop', count:1}],
            testDesc:'Single noop results in one NoOpGroup.',
        },
    ];

    private static checkOpGroup<T>(actualGroup:OpGroup<T>,
                                   expectedGroup:expectedOpGroup<T>,
                                   testDesc:string) : void {
        assert.equal(actualGroup.removeCount, expectedGroup.removeCount, testDesc);
        assertArraysAreEqual(actualGroup.addItems, expectedGroup.addItems, testDesc);
    }

    private static checkNoOpGroup<T>(actualGroup:NoOpGroup<T>,
                                     expectedGroup:expectedNoOpGroup,
                                     testDesc:string) : void {
        assert.equal(actualGroup.count, expectedGroup.count, testDesc);
    }

    private static checkItemGroup<T>(actualGroup:itemGroup<T>,
                                     expectedGroup:expectedItemGroup<T>,
                                     testDesc:string)
                                     : void {
        assert.equal(actualGroup.type, expectedGroup.type, testDesc);
        switch (actualGroup.type) {
            case 'edit':
                TestGetItemGroups.checkOpGroup(
                    actualGroup as OpGroup<T>,
                    expectedGroup as expectedOpGroup<T>,
                    testDesc);
                break;

            case 'noop':
                TestGetItemGroups.checkNoOpGroup(
                    actualGroup as NoOpGroup<T>,
                    expectedGroup as expectedNoOpGroup,
                    testDesc);
                break;

            default:
                throw new Error('Unexpected type encountered during test!');
        }
    }

    private static runTest<T>(testCase:getItemGroupsTestCase<T>) {
        const {alignment, expectedResults, testDesc} = testCase;
        const actualItemGroups = getItemGroups(alignment);
        assert.equal(actualItemGroups.length, expectedResults.length, testDesc);
        for (let i = 0; i < actualItemGroups.length; i++) {
            const actualGroup = actualItemGroups[i];
            const expectedGroup = expectedResults[i];
            this.checkItemGroup(actualGroup, expectedGroup, testDesc);
        }
    }

    @test public runTests() {
        TestGetItemGroups.testCases.forEach((currTest) => TestGetItemGroups.runTest(currTest));
    }
}
