import { DiffOpName, IDiffOp } from './IDiffOp';

// Push a set of items on to the end of a given array.
export class DiffOpPush<T> implements IDiffOp<T> {
    public readonly type:DiffOpName;
    public readonly items:T[];
    public runOp(arr:T[]) : void {
        for (const item of this.items) {
            arr.push(item);
        }
    }
    constructor(items:T[]) {
        this.items = items;
        this.type = 'push';
    }
}
