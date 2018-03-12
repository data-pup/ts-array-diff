import { getIsEditElem } from './isEditElem';
import { itemGroupTag } from './groupTypes';
import { alignmentSeqElem } from '../../alignmentTypes';

export class OpGroup<T> {
    private static validateItems<T>(items:alignmentSeqElem<T>[]) : boolean {
        if (items === undefined || items === null || items.length === 0) {
            return false; // Check that items is not undefined, null, or empty.
        } // Check that every element is a 'noop' alignment sequence element.
        return items.every((elem) => getIsEditElem(elem));
    }

    private static getRemoveCount<T>(items:alignmentSeqElem<T>[]) : number {
        return items.filter((elem) => elem.elemType === 'remove').length;
    }

    private static getAddItems<T>(items:alignmentSeqElem<T>[]) : T[] {
        return items
            .filter((elem) => elem.elemType === 'add')
            .map((elem) => elem.elemValue);
    }

    public static readonly opGroupGivenInvalidArguments:string =
        'editGroup constructor was given no arguments.';

    public readonly type:itemGroupTag;
    public readonly removeCount:number;
    public readonly addItems:T[];

    constructor(items:alignmentSeqElem<T>[]) {
        if (!OpGroup.validateItems(items)) {
            throw new Error(OpGroup.opGroupGivenInvalidArguments);
        }
        this.type = 'edit';
        this.removeCount = OpGroup.getRemoveCount(items);
        this.addItems = OpGroup.getAddItems(items);
    }
}
