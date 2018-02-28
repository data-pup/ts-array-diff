import { assert } from 'chai';
import { assertArraysAreEqual } from './assertArraysAreEqual';

export const assertAlignmentsAreEqual = <T>(a:[T, T][], b:[T, T][]) => {
    assert.equal(a.length, b.length);
    const length = a.length;
    for (let i = 0; i < length; i++) {
        assertArraysAreEqual(a[i], b[i]);
    }
};
