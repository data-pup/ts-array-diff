import { DiffOpName, IDiffOp } from './IDiffOp';

// Pop items off of the front of a given array.
export class ShiftDiffOp<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly count:number;
    public runOp(arr:T[]) : void {
        let i = 0;
        while (i < this.count) {
            arr.shift();
            i++;
        }
    }
    constructor(count?:number) {
        this.count = (count || 1);
        this.type = 'shift';
    }
}
