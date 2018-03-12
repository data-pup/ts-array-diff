import {
    alignmentSeqElem,
    seqGroupType,
} from '../../alignmentTypes';

export class OpGroup<T> {
    public static readonly opGroupGivenInvalidArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:seqGroupType;
    public readonly removeCount?:number;
    public readonly addItems?:T[];

    constructor(items:alignmentSeqElem<T>[]) {
        if (items === undefined || items === null) {
            throw new Error(OpGroup.opGroupGivenInvalidArguments);
        }
        // OpGroup.validateItems(..)
        // this.addItems = TODO...
        // this.removeItems = TODO...
        this.type = 'edit';
    }
}
