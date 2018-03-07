export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export {
    alignmentSequence,
    arrTuple,
    boundsTuple,
    elemTuple,
    indexTuple,
    tupleType,
} from '../src/alignmentTypes';

export {
    getTupleTypes,
    invalidTupleErrorMessage,
} from '../src/alignmentParser/getTupleTypes';

export { AlignmentPosition } from '../src/alignmentPosition/alignmentPosition';

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
