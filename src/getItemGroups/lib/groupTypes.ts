export type seqGroupType = 'noop' | 'edit';

import { NoOpGroup } from './noOpGroup';
import { OpGroup } from './opGroup';
export type seqGroup<T> = OpGroup<T> | NoOpGroup<T>;
