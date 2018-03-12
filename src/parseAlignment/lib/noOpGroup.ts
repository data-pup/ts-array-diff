import {
    alignmentSeqElem,
    seqGroupType,
} from '../../alignmentTypes';

export class NoOpGroup<T> {

    // private static validateParams(..) : void // TODO

    public static readonly noOpGroupConstructorGivenNoArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:seqGroupType;
    public readonly size:number;

    constructor(items:alignmentSeqElem<T>[]) {
        // NoOpGroup.validateItems(items);
        // this.items = items;
        this.type = 'noop';
    }
}
