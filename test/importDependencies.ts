export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export { AlignmentPosition } from '../src/alignment/position/alignmentPosition';
export {
    arrDiffTuple,
    boundsTuple,
    indexTuple,
} from '../src/alignment/position/positionTypes';

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
