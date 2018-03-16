import { getAlignment } from './getAlignment/getAlignment';
import { getItemGroups } from './getItemGroups/getItemGroups';
import { parse } from './parseItemGroups/parseItemGroups';

import {
    pushAndPopTestCases,
 } from '../test/parseItemGroupsTests/ParseItemGroupsTestCases';

const temp = () => {
    const testCase = pushAndPopTestCases[0];
    const {base, target} = testCase;
    const baseClone = base.slice();
    const alignment = getAlignment(baseClone, target);
    const itemGroups = getItemGroups(alignment);
    const actualOps = parse(itemGroups);
    process.stdout.write(`${actualOps}`); // Won't print useful info, use as debug breakpoint.
};

temp();
