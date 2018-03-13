import { getIsEditElem } from './isEditElem';
import { itemGroupTag } from './groupTypes';
import { alignmentSeqElem } from '../../alignmentTypes';

export class OpGroup<T> {

    // Checks whether or not the constructor params are valid.
    private static validateItems<T>(items:alignmentSeqElem<T>[]) : boolean {
        if (items === undefined || items === null || items.length === 0) {
            return false; // Check that items is not undefined, null, or empty.
        } // Check that every element is a 'noop' alignment sequence element.
        return items.every((elem) => getIsEditElem(elem));
    }

    // Calculates the total number of items to be removed in this group.
    private static getRemoveCount<T>(items:alignmentSeqElem<T>[]) : number {
        return items.filter((elem) => elem.elemType === 'remove').length;
    }

    // Creates an array storing the items to be added in this group.
    private static getAddItems<T>(items:alignmentSeqElem<T>[]) : T[] {
        return items
            .filter((elem) => elem.elemType === 'add')
            .map((elem) => elem.elemValue);
    }

    public static readonly opGroupGivenInvalidArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:itemGroupTag;
    public readonly removeCount:number; // Number of items to remove.
    public readonly addItems:T[];       // Items to add to the array.

    constructor(items:alignmentSeqElem<T>[]) {
        if (!OpGroup.validateItems(items)) {
            throw new Error(OpGroup.opGroupGivenInvalidArguments);
        }
        this.type = 'edit';
        this.removeCount = OpGroup.getRemoveCount(items);
        this.addItems = OpGroup.getAddItems(items);
    }
}
