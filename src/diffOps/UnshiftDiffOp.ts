import { unshiftOpGivenEmptyItemsArray } from './ErrorMessages';
import { DiffOpName, IDiffOp } from './IDiffOp';

// Insert items into the front of a given array.
export class UnshiftDiffOp<T> implements IDiffOp<T> {

    public readonly type:DiffOpName;
    public readonly items:T[]; // The items to unshift.

    // Unshift items onto the front of the array.
    public runOp(arr:T[]) : void {
        if (this.items === undefined || this.items.length === 0) { return; }
        const loopMax = this.items.length - 1;
        for (let i = loopMax; i >= 0; i--) {
            const item = this.items[i];
            arr.unshift(item);
        }
    }

    constructor(items:T[]) { // Throw an error if no items are given.
        if (items === null || items === undefined || items.length === 0) {
            throw new Error(unshiftOpGivenEmptyItemsArray);
        }
        this.items = items;
        this.type = 'unshift';
    }
}
