import { DiffOpName, IDiffOp } from './IDiffOp';

export class NoOpDiffOp<T> implements IDiffOp<T> {

    public readonly type:DiffOpName;
    public readonly count:number; // The number of items to skip.

    public runOp(arr:T[]) : void { return; }

    constructor(count:number) {
        this.count = count;
        this.type = 'noop';
    }
}
