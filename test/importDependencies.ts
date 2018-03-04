export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export { AlignmentPosition } from '../src/alignmentPosition/alignmentPosition';
export {
    arrDiffTuple,
    boundsTuple,
    indexTuple,
} from '../src/alignmentPosition/positionTypes';

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
