export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';

export {
    DiffOpPop,
    DiffOpPush,
    DiffOpShift,
    // DiffOpSplice,
    DiffOpUnshift,
    runOps,
} from '../src/diffops';

export {
    alloc,
    clone,
    diff,
    patch,
} from '../src/index';
