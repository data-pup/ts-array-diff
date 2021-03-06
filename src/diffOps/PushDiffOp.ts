import { pushOpGivenEmptyItemsArray } from './ErrorMessages';
import { DiffOpName, IDiffOp } from './IDiffOp';

// Push a set of items on to the end of a given array.
export class PushDiffOp<T> implements IDiffOp<T> {

    public readonly type:DiffOpName;
    public readonly items:T[]; // The items to push onto the array.

    // Push the stored items onto the tail of the array.
    public runOp(arr:T[]) : void {
        for (const item of this.items) {
            arr.push(item);
        }
    }

    constructor(items:T[]) { // Throw an error if no items are given.
        if (items === null || items === undefined || items.length === 0) {
            throw new Error(pushOpGivenEmptyItemsArray);
        }
        this.items = items;
        this.type = 'push';
    }
}
