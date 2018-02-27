import { DiffOpName, IDiffOp } from './IDiffOp';

// Pop a number of items off of the end of a given array.
export class DiffOpPop<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly count:number;
    public runOp(arr:T[]) : void {
        let i = 0;
        while (i < this.count) {
            arr.pop();
            i++;
        }
    }
    constructor(count?:number) {
        this.count = (count || 1);
        this.type = 'pop';
    }
}
