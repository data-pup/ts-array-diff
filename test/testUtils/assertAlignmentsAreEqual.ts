import { assert } from 'chai';
import {
    alignmentSeq,
    alignmentSeqElem,
} from '../importDependencies';

// Assert two alignments are equal using the helper functions defined below.
export const assertAlignmentsAreEqual = <T>(actualAlignment:alignmentSeq<T>,
                                            expectedAlignment:alignmentSeq<T>,
                                            message?:string) : void => {
    assertLengthsAreEqual(actualAlignment, expectedAlignment, message);
    const length = actualAlignment.length;
    for (let i = 0; i < length; i++) {
        assertSequenceElementsAreEqual(actualAlignment[i], expectedAlignment[i], message);
    }
};

// Assert the actual alignment's length matches the expected alignment's length.
const assertLengthsAreEqual = <T>(actualAlignment:alignmentSeq<T>,
                                  expectedAlignment:alignmentSeq<T>,
                                  message?:string) : void => {
    if (message !== undefined) {
        assert.equal(actualAlignment.length, expectedAlignment.length, message);
    } else {
        assert.equal(actualAlignment.length, expectedAlignment.length);
    }
};

// Assert two sequence elements are equal.
const assertSequenceElementsAreEqual = <T>(actualAlignment:alignmentSeqElem<T>,
                                           expectedAlignment:alignmentSeqElem<T>,
                                           message?:string) : void => {
    if (message !== undefined) {
        assert.equal(actualAlignment.elemType, expectedAlignment.elemType, message);
        assert.equal(actualAlignment.elemValue, expectedAlignment.elemValue, message);
    } else {
        assert.equal(actualAlignment.elemType, expectedAlignment.elemType);
        assert.equal(actualAlignment.elemValue, expectedAlignment.elemValue);
    }
};
