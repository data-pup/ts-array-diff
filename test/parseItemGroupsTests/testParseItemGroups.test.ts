import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';

// Import test case type and test case arrays.
import { parseItemGroupTestCase } from './ParseItemGroupsTestCases';
import {
    complexTestCases,
    pushAndPopTestCases,
    shiftAndUnshiftTestCases,
    spliceSimpleTestCases,
} from './ParseItemGroupsTestCases';

// Import diff operation interface and classes.
import { IDiffOp } from '../importDiffOps';
import {
    ShiftDiffOp,
    UnshiftDiffOp,
    PopDiffOp,
    PushDiffOp,
    SpliceDiffOp,
} from '../importDiffOps';

// Import test utility functions, as well as the parse function itself.
import { getAlignment } from '../importGetAlignment';
import { getItemGroups } from '../importGetItemGroups';
import { parse } from '../importParseItemGroups';
import { assertArraysAreEqual } from '../importTestUtils';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestParseItemGroups {

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
        const baseClone = base.slice();
        const alignment = getAlignment(baseClone, target);
        const itemGroups = getItemGroups(alignment);
        const actualOps = parse(itemGroups);

        assert.equal(actualOps.length, expectedOps.length);
        for (let i = 0; i < expectedOps.length; i++) {
            const [currActual, currExpected] = [actualOps[i], expectedOps[i]];
            TestParseItemGroups.compareDiffOps(currActual, currExpected, testDesc);
        }
    }

    @test public shiftAndUnshiftTests() { // Test the shift and unshift operations pass each test.
        shiftAndUnshiftTestCases.forEach((currTest) => TestParseItemGroups.runTest(currTest));
    }

    @test public pushAndPopTests() { // Test the push and pop operations pass each test.
        pushAndPopTestCases.forEach((currTest) => TestParseItemGroups.runTest(currTest));
    }

    @test public spliceTests() { // Test the splice operation passes each test.
        spliceSimpleTestCases.forEach((currTest) => TestParseItemGroups.runTest(currTest));
    }

    @test public complexTests() { // Test all of the operations together.
        complexTestCases.forEach((currTest) => TestParseItemGroups.runTest(currTest));
    }
}
