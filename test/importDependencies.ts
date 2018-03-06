export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export { AlignmentPosition } from '../src/alignmentPosition/alignmentPosition';
export {
    arrTuple,
    boundsTuple,
    indexTuple,
} from '../src/positionTypes';

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
