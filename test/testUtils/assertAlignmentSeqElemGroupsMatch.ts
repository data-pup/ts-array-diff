import { assert } from 'chai';
import {
    alignmentSeq,
    assertAlignmentsAreEqual,
} from '../importDependencies';

export const assertGroupsAreSame = <T>(actualGroups:alignmentSeq<T>[],
                                       expectedGroups:alignmentSeq<T>[],
                                       message?:string) : void => {
    assertSameNumberOfGroups(actualGroups, expectedGroups, message);
    actualGroups.forEach(
        (actualGroup:alignmentSeq<T>, i:number) : void => {
            const expectedGroup:alignmentSeq<T> = expectedGroups[i];
            assertAlignmentsAreEqual(actualGroup, expectedGroup, message);
        },
    );
};

const assertSameNumberOfGroups =  <T>(actualGroups:alignmentSeq<T>[],
                                      expectedGroups:alignmentSeq<T>[],
                                      message?:string) : void => {
    if (message !== undefined) {
        assert.equal(actualGroups.length, expectedGroups.length, message);
    } else {
        assert.equal(actualGroups.length, expectedGroups.length);
    }
};
