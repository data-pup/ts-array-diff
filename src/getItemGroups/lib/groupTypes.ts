// Tag item groups representing an edit region or a noop region accordingly.
export type itemGroupTag = 'noop' | 'edit';

// Create a type union of the OpGroup and NoOpGroup types.
import { NoOpGroup } from './noOpGroup';
import { OpGroup } from './opGroup';
export type itemGroup<T> = OpGroup<T> | NoOpGroup<T>;
