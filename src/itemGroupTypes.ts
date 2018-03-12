import { NoOpGroup } from './getItemGroups/lib/noOpGroup';
import { OpGroup } from './getItemGroups/lib/opGroup';
export type seqGroupType = 'noop' | 'edit';
export type seqGroup<T> = OpGroup<T> | NoOpGroup<T>;
