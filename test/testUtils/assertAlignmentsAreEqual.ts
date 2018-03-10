import { assert } from 'chai';
import { assertArraysAreEqual } from './assertArraysAreEqual';

export const assertAlignmentsAreEqual = <T>(a:[T, T][], b:[T, T][], message?:string) : void => {
    assertLengthsAreEqual(a, b, message);
    const length = a.length;
    for (let i = 0; i < length; i++) {
        assertSequenceElementsAreEqual(a[i], b[i], message);
    }
};

const assertLengthsAreEqual = <T>(a:[T, T][], b:[T, T][], message?:string) : void => {
    if (message !== undefined) {
        assert.equal(a.length, b.length, message);
    } else {
        assert.equal(a.length, b.length);
    }
};

const assertSequenceElementsAreEqual = <T>(a:[T, T], b:[T, T], message?:string) : void => {
    if (message !== undefined) {
        assertArraysAreEqual(a, b, message);
    } else {
        assertArraysAreEqual(a, b);
    }
};
