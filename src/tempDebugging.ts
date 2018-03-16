import { itemGroup } from './itemGroupTypes';
// import {
//     itemGroupTag,
//     NoOpGroup,
//     OpGroup
// } from './itemGroupTypes';
import { IDiffOp } from './diffops';
// import {
    // ShiftDiffOp, UnshiftDiffOp,
    // SpliceDiffOp,
    // PopDiffOp, PushDiffOp,
// } from './diffops';

import { getAlignment } from './getAlignment/getAlignment';
import { getItemGroups } from './getItemGroups/getItemGroups';
import { parse } from './parseItemGroups/parseItemGroups';

import {
    pushAndPopTestCases,
 } from '../test/parseItemGroupsTests/ParseItemGroupsTestCases';

const temp = () => {
    const testCase = pushAndPopTestCases[0];
    const {base, target, expectedOps, testDesc} = testCase;
    const baseClone = base.slice();
    const alignment = getAlignment(baseClone, target);
    const itemGroups = getItemGroups(alignment);
    const actualOps = parse(itemGroups);
    process.stdout.write('All Done!');
};

temp();
