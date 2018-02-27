import { DiffOpName, IDiffOp } from './IDiffOp';

// Insert items into the front of a given array.
export class DiffOpUnshift<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        if (!this.items || this.items.length === 0) { return; }
        const loopMax = this.items.length - 1;
        for (let i = loopMax; i >= 0; i--) {
            const item = this.items[i];
            arr.unshift(item);
        }
    }
    constructor(items:T[]) {
        this.items = items;
        this.type = 'unshift';
    }
}
