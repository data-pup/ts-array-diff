export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

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
