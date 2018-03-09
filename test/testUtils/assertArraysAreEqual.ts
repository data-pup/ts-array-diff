import { assert } from 'chai';

export const assertArraysAreEqual = <T>(a:T[], b:T[], message?:string) : void => {
    assertLengthsAreEqual(a, b, message);
    const length = a.length;
    for (let i = 0; i < length; i++) {
        assertElemsAreEqual(a[i], b[i], message);
    }
};

const assertLengthsAreEqual = <T>(a:T[], b:T[], message?:string) : void => {
    if (message !== undefined) {
        assert.equal(a.length, b.length, message);
    } else {
        assert.equal(a.length, b.length);
    }
};

const assertElemsAreEqual = <T>(a:T, b:T, message?:string) : void => {
    if (message !== undefined) {
        assert.equal(a, b, message);
    } else {
        assert.equal(a, b);
    }
};
