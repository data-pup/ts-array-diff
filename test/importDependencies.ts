export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export { AlignmentPosition } from '../src/alignment/alignmentPosition';
export {
    arrDiffTuple,
    boundsTuple,
    indexTuple,
} from '../src/alignment/positionTypes';

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
