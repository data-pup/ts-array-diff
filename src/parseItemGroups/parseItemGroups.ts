import { itemGroup } from '../itemGroupTypes';
import { IDiffOp } from '../diffops';

// Parse a sequence of item groups, and return an array of diff operations.
export const parse = <T>(itemGroups:itemGroup<T>[]) : IDiffOp<T>[] => {
    throw new Error('Not Implemented Yet!');
};
