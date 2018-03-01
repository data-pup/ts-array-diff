export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export { getAlignment } from '../src/alignment/getAlignment';
export { getIndicesInRange } from '../src/alignment/getIndicesInRange';
export { AlignmentPosition } from '../src/alignment/position/alignmentPosition';
export {
    getNextMatchingPositions,
} from '../src/alignment/getNextMatchingPositions';

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
