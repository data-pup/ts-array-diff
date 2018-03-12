// Test utilities.
export { assertAlignmentsAreEqual } from './testUtils/assertAlignmentsAreEqual';
export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';
export { assertEditGroupsAreSame } from './testUtils/assertEditGroupsMatch';

// Alignment type aliases.
export {
    alignmentSeq,
    alignmentSeqElem,
    alignmentSeqElemType,
    arrTuple,
    boundsTuple,
    indexTuple,
} from '../src/alignmentTypes';

// Alignment generation functions.
export { getAlignment } from '../src/getAlignment/getAlignment';
export {
    bothInBounds,
    checkBounds,
    someInBounds,
} from '../src/getAlignment/lib/checkBounds';
export { getDistance } from '../src/getAlignment/lib/distance';
export {
    incrementBase,
    incrementBaseAndTarget,
    incrementTarget,
} from '../src/getAlignment/lib/increment';
export {
    invalidIndexRangeError,
    undefinedParamError,
} from '../src/getAlignment/lib/errorMessages';
export { getIndexRange } from '../src/getAlignment/lib/getIndexRange';
export { getNextMatch } from '../src/getAlignment/lib/getNextMatch';

// Alignment parsing tuple types.
export { getAlignmentSeqElemGroups } from '../src/parseAlignment/lib/getGroups';

// Array diff operations.
export {
    PopDiffOp,
    PushDiffOp,
    ShiftDiffOp,
    SpliceDiffOp,
    UnshiftDiffOp,
    runOps,
} from '../src/diffops';
export { // Error messages.
    pushOpGivenEmptyItemsArray,
    unshiftOpGivenEmptyItemsArray,
} from '../src/diffops';

// Delta encoding functions.
export {
    alloc,
    clone,
    diff,
    patch,
} from '../src/index';
