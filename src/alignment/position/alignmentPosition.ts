import { arrDiffTuple, boundsTuple, indexTuple } from './diffTuples';
export { arrDiffTuple, boundsTuple, indexTuple };
export class AlignmentPosition<T> {
    public static readonly undefinedParamError = 'AlignmentPosition constructor was given an undefined parameter!';

    // private readonly arrDiffTuple
    private readonly _baseArr:T[];
    private readonly _targetArr:T[];

    private _positions:indexTuple;

    constructor(arrs:arrDiffTuple<T>, positions:indexTuple=[0, 0]) {
        if (arrs.some((arr) => arr == undefined)) {
            throw new Error(AlignmentPosition.undefinedParamError);
        }
        [this._baseArr, this._targetArr] = [arrs[0], arrs[1]];
        this.setPositions(positions);
    }

    // This private static function is used by the constructor and mutator
    // methods to check that an index seems valid. Returns false if not.
    private boundsCheck(pos:number, length:number) : boolean {
        return (pos != undefined) && (pos >= 0) && (pos < length);
    }

    // Get bounds flags, positions, and lengths in the form of index tuples.
    public getBoundsTuple(positions?:indexTuple) : boundsTuple {
        const lengths:indexTuple = this.getLengthTuple();
        const indices:indexTuple = (positions == undefined)
            ? this.getPositionTuple() : positions;
        return indices.map(
            (index, i) => this.boundsCheck(index, lengths[i]),
        ) as boundsTuple;
    }

    // This function will attempt to set the base and target positions using
    // a tuple containing the [base position, target position] respectively.
    public setPositions(positions:indexTuple) : void {
        const inBounds:boundsTuple = this.getBoundsTuple(positions);
        this._positions = positions.map(
            (pos, i) : number => inBounds[i] ? pos : undefined,
        ) as indexTuple;
    }

    public getPositionTuple() : indexTuple { return this._positions; }
    public getLengthTuple() : indexTuple { return [this._baseArr.length, this._targetArr.length]; }
}
