// Test utilities.
export { assertAlignmentsAreEqual } from './testUtils/assertAlignmentsAreEqual';
export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

// Alignment type aliases.
export {
    alignmentSequence,
    arrTuple,
    boundsTuple,
    elemTuple,
    indexTuple,
    tupleType,
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
export { getEditGroups } from '../src/parseAlignment/alignmentParser';
export {
    getIsEditTupleFlags,
    getTupleTypes,
    invalidTupleErrorMessage,
} from '../src/parseAlignment/getTupleTypes';

// Array diff operations.
export {
    PopDiffOp,
    PushDiffOp,
    ShiftDiffOp,
    UnshiftDiffOp,
    runOps,
} from '../src/diffops';

// Delta encoding functions.
export {
    alloc,
    clone,
    diff,
    patch,
} from '../src/index';
