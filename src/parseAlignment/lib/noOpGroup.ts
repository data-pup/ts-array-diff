import {
    alignmentSeqElem,
    seqGroupType,
} from '../../alignmentTypes';

export class NoOpGroup<T> {
    public static readonly noOpGroupGivenInvalidArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:seqGroupType;
    public readonly count:number;

    constructor(items:alignmentSeqElem<T>[]) {
        if (items === undefined || items === null) {
            throw new Error(NoOpGroup.noOpGroupGivenInvalidArguments);
        }
        this.type = 'noop';
        this.count = items.length;
    }
}
