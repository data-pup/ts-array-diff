import { DiffOpName, IDiffOp } from './IDiffOp';

// This class is used to invoke the splice method on a given array. Splice
// is used to remove a number of items from an array, starting at a specific
// index, and optionally replacing the deleted values with a new set of items.
export class SpliceDiffOp<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly startIndex:number;
    public readonly count:number;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        arr.splice(this.startIndex, this.count, ...this.items);
    }
    constructor(start:number, count:number, items?:T[]) {
        this.startIndex = start;
        this.count = count;
        this.items = (items || []);
        this.type = 'splice';
    }
}
