// Test utilities.
export { assertAlignmentsAreEqual } from './testUtils/assertAlignmentsAreEqual';
export { assertArraysAreEqual } from './testUtils/assertArraysAreEqual';
export { assertGroupsAreSame } from './testUtils/assertAlignmentSeqElemGroupsMatch';

// Alignment type aliases.
export {
    alignmentSeq,
    alignmentSeqElem,
    alignmentSeqElemType,
    arrTuple,
    boundsTuple,
    indexTuple,
    seqGroup,
    seqGroupType,
} from '../src/alignmentTypes';

// Alignment parsing function and types.
export { getAlignmentSeqElemGroups } from '../src/getItemGroups/lib/getAlignmentSeqElemGroups';
export { getIsEditElem } from '../src/getItemGroups/lib/isEditElem';
export { NoOpGroup } from '../src/getItemGroups/lib/noOpGroup';
export { OpGroup } from '../src/getItemGroups/lib/opGroup';

// Array diff operations.
export {
    PopDiffOp,
    PushDiffOp,
    ShiftDiffOp,
    SpliceDiffOp,
    UnshiftDiffOp,
    runOps,
} from '../src/diffops';
export { // Error messages.
    pushOpGivenEmptyItemsArray,
    unshiftOpGivenEmptyItemsArray,
} from '../src/diffops';
