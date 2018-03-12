import {
    alignmentSeqElem,
    seqGroupType,
} from '../../alignmentTypes';

export class OpGroup<T> {

    // private static validateParams(..) : void // TODO

    public static readonly opGroupConstructorGivenNoArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:seqGroupType;
    public readonly addItems?:T[];
    public readonly removeItems?:T[];

    constructor(items:alignmentSeqElem<T>[]) {
        // OpGroup.validateItems(..)
        // this.addItems = TODO...
        // this.removeItems = TODO...
        this.type = 'edit';
    }
}
