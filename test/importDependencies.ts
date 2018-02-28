export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export { getAlignment } from '../src/alignment/getAlignment';

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
