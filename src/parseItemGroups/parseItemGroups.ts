import { itemGroup } from '../itemGroupTypes';
// import {
//     itemGroupTag,
//     NoOpGroup,
//     OpGroup
// } from '../itemGroupTypes';
import { IDiffOp } from '../diffops';
// import {
    // ShiftDiffOp, UnshiftDiffOp,
    // SpliceDiffOp,
    // PopDiffOp, PushDiffOp,
// } from '../diffops';

// Parse a sequence of item groups, and return an array of diff operations.
export const parse = <T>(itemGroups:itemGroup<T>[]) : IDiffOp<T>[] => {
    throw new Error('Not Implemented Yet!');
};
