import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';

import { IDiffOp, SpliceDiffOp } from '../importDiffOps';
import {
    ShiftDiffOp,
    UnshiftDiffOp,
    PopDiffOp,
    PushDiffOp,
} from '../importDiffOps';

import { getAlignment } from '../importGetAlignment';
import { getItemGroups } from '../importGetItemGroups';
import { parse } from '../importParseItemGroups';
import { assertArraysAreEqual } from '../importTestUtils';

type parseItemGroupTestCase<T> = {
    base:T[];
    target:T[];
    expectedOps:IDiffOp<T>[];
    testDesc:string;
};

/* tslint:disable-next-line:no-unused-variable */
@suite class TestParseItemGroups {

    private static readonly testCases:parseItemGroupTestCase<any>[] = [
        {
            base:[0, 1, 2, 3],
            target:[1, 2, 3],
            expectedOps:[new ShiftDiffOp(1)],
            testDesc:'Basic shift test.',
        },
        {
            base:[1, 2, 3],
            target:[0, 1, 2, 3],
            expectedOps:[new UnshiftDiffOp([0])],
            testDesc:'Basic unshift test.',
        },
        {
            base:[1, 2, 3],
            target:[1, 2, 3, 4],
            expectedOps:[new PushDiffOp([4])],
            testDesc:'Basic push test.',
        },
        {
            base:[1, 2, 3, 4],
            target:[1, 2, 3],
            expectedOps:[new PopDiffOp(1)],
            testDesc:'Basic push test.',
        },
    ];

    private static compareDiffOps<T>(actualOp:IDiffOp<T>,
                                     expectedOp:IDiffOp<T>,
                                     testDesc:string) {
        assert.strictEqual(actualOp.type, expectedOp.type, testDesc);
        switch (actualOp.type) {
            case 'shift':
                const actualShift = actualOp as ShiftDiffOp<T>;
                const expectedShift = expectedOp as ShiftDiffOp<T>;
                assert.equal(actualShift.count, expectedShift.count, testDesc);
                break;

            case 'unshift':
                const actualUnshift = actualOp as UnshiftDiffOp<T>;
                const expectedUnshift = expectedOp as UnshiftDiffOp<T>;
                assertArraysAreEqual(actualUnshift.items, expectedUnshift.items, testDesc);
                break;

            case 'splice':
                const actualSplice = actualOp as SpliceDiffOp<T>;
                const expectedSplice = actualOp as SpliceDiffOp<T>;
                assert.equal(actualSplice.count, expectedSplice.count, testDesc);
                assert.equal(actualSplice.startIndex, expectedSplice.startIndex, testDesc);
                assertArraysAreEqual(actualSplice.items, expectedSplice.items, testDesc);
                break;

            case 'pop':
                const actualPop = actualOp as PopDiffOp<T>;
                const expectedPop = expectedOp as PopDiffOp<T>;
                assert.equal(actualPop.count, expectedPop.count, testDesc);
                break;

            case 'push':
                const actualPush = actualOp as PushDiffOp<T>;
                const expectedPush = expectedOp as PushDiffOp<T>;
                assertArraysAreEqual(actualPush.items, expectedPush.items, testDesc);
                break;

            default:
                throw new Error('Unexpected operation found!');
        }
    }

    private static runTest<T>(testCase:parseItemGroupTestCase<T>) {
        const {base, target, expectedOps, testDesc} = testCase;
        const alignment = getAlignment(base, target);
        const itemGroups = getItemGroups(alignment);
        const actualOps = parse(itemGroups);

        assert.equal(actualOps.length, expectedOps.length);
        for (let i = 0; i < expectedOps.length; i++) {
            const [currActual, currExpected] = [actualOps[i], expectedOps[i]];
            TestParseItemGroups.compareDiffOps(currActual, currExpected, testDesc);
        }
    }

    @test public runTests() {
        TestParseItemGroups.testCases.forEach(
            (currTest) => TestParseItemGroups.runTest(currTest),
        );
    }
}
