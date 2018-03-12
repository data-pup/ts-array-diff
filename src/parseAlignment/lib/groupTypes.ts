import { NoOpGroup   } from './noOpGroup';
import { OpGroup } from './opGroup';

// Edit group types.
export type groupType = 'noop' | 'edit';
export type editGroup<T> = OpGroup<T> | NoOpGroup<T>;
