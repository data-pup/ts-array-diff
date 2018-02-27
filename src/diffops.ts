// Diff edit operations:
// -------------------------------------------------------------------------
// These are edit operations for the diff(..) function. Each type
// represents an operation (or a series of operations) that can be performed
// on an array to edit it to move from a given base to a target state.
// -------------------------------------------------------------------------

import { IDiffOp } from './diffOps/IDiffOp';

// Run a series of operations on the array in sequence.
export const runOps = <T>(arr:T[], ops:IDiffOp<T>[]) : void => {
    ops.forEach((op) : void => {
        op.runOp(arr);
    });
};

// Export diff operation interface, classes, and name type.
export { DiffOpName, IDiffOp } from './diffOps/IDiffOp';
export { DiffOpPop } from './diffOps/PopDiffOp';
export { DiffOpPush } from './diffOps/PushDiffOp';
export { DiffOpShift } from './diffOps/ShiftDiffOp';
export { DiffOpSplice } from './diffOps/SpliceDiffOp';
export { DiffOpUnshift } from './diffOps/UnshiftDiffOp';
