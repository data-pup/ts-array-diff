import { getIsEditElem } from './isEditElem';
import { seqGroupType } from './groupTypes';
import { alignmentSeqElem } from '../../alignmentTypes';

export class OpGroup<T> {
    private static validateItems<T>(items:alignmentSeqElem<T>[]) : boolean {
        if (items === undefined || items === null || items.length === 0) {
            return false; // Check that items is not undefined, null, or empty.
        } // Check that every element is a 'noop' alignment sequence element.
        return items.every((elem) => getIsEditElem(elem));
    }

    public static readonly opGroupGivenInvalidArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:seqGroupType;
    public readonly removeCount?:number;
    public readonly addItems?:T[];

    constructor(items:alignmentSeqElem<T>[]) {
        if (!OpGroup.validateItems(items)) {
            throw new Error(OpGroup.opGroupGivenInvalidArguments);
        }
        this.type = 'edit';
    }
}
