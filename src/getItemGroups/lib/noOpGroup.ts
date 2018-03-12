import { getIsEditElem } from './isEditElem';
import { itemGroupTag } from './groupTypes';
import { alignmentSeqElem } from '../../alignmentTypes';

export class NoOpGroup<T> {
    private static validateItems<T>(items:alignmentSeqElem<T>[]) : boolean {
        if (items === undefined || items === null || items.length === 0) {
            return false; // Check that items is not undefined, null, or empty.
        } // Check that every element is a 'noop' alignment sequence element.
        return items.every((elem) => !getIsEditElem(elem));
    }

    public static readonly noOpGroupGivenInvalidArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:itemGroupTag;
    public readonly count:number;

    constructor(items:alignmentSeqElem<T>[]) {
        if (!NoOpGroup.validateItems(items)) {
            throw new Error(NoOpGroup.noOpGroupGivenInvalidArguments);
        }
        this.type = 'noop';
        this.count = items.length;
    }
}
