export { assertAlignmentsAreEqual } from './testUtils/assertAlignmentsAreEqual';
export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export {
    alignmentSequence,
    arrTuple,
    boundsTuple,
    elemTuple,
    indexTuple,
    tupleType,
} from '../src/alignmentTypes';

export { getEditGroups } from '../src/alignmentParser/alignmentParser';

export {
    getIsEditTupleFlags,
    getTupleTypes,
    invalidTupleErrorMessage,
} from '../src/alignmentParser/getTupleTypes';

export { AlignmentPosition } from '../src/getAlignment/alignmentPosition';

export {
    PopDiffOp,
    PushDiffOp,
    ShiftDiffOp,
    UnshiftDiffOp,
    runOps,
} from '../src/diffops';

export {
    alloc,
    clone,
    diff,
    patch,
} from '../src/index';

// FIXUP: Refactoring work for getAlignment
export { getAlignment } from '../src/getAlignment/getAlignment';
export { checkBounds } from '../src/getAlignment/lib/checkBounds';
export { getDistance } from '../src/getAlignment/lib/distance';
export { invalidIndexRangeError, undefinedParamError } from '../src/getAlignment/lib/errorMessages';
export { getIndexRange } from '../src/getAlignment/lib/getIndexRange';
export { getNextMatch } from '../src/getAlignment/lib/getNextMatch';
export { incrementBase, incrementBaseAndTarget, incrementTarget } from '../src/getAlignment/lib/increment';
