export type itemGroupTag = 'noop' | 'edit';

import { NoOpGroup } from './noOpGroup';
import { OpGroup } from './opGroup';
export type itemGroup<T> = OpGroup<T> | NoOpGroup<T>;
