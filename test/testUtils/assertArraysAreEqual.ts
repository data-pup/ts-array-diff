import { assert } from 'chai';

export const assertArraysAreEqual = <T>(a:T[], b:T[]) => {
    assert.equal(a.length, b.length);
    const length = a.length;
    for (let i = 0; i < length; i++) {
        assert.equal(a[i], b[i]);
    }
};
