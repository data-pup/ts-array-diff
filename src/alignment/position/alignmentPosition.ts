export type arrDiffTuple<T> = [T[], T[]];
export type diffElemTuple<T> = [T, T];
export type boundsTuple = [boolean, boolean];
export type indexTuple = [number, number];

export class AlignmentPosition<T> {
    public static readonly undefinedParamError = 'AlignmentPosition constructor was given an undefined parameter!';

    private readonly _arrs:arrDiffTuple<T>;
    private _positions:indexTuple;

    constructor(arrs:arrDiffTuple<T>, positions:indexTuple=[0, 0]) {
        if (arrs.some((arr) => arr == undefined)) {
            throw new Error(AlignmentPosition.undefinedParamError);
        }
        this._arrs = arrs;
        this.setPositions(positions);
    }

    // This private static function is used by the constructor and mutator
    // methods to check that an index seems valid. Returns false if not.
    private boundsCheck(pos:number, length:number) : boolean {
        return (pos != undefined) && (pos >= 0) && (pos < length);
    }

    // This function will attempt to set the base and target positions using
    // a tuple containing the [base position, target position] respectively.
    public setPositions(positions:indexTuple) : void {
        const inBounds:boundsTuple = this.getBoundsTuple(positions);
        this._positions = positions.map(
            (pos, i) : number => inBounds[i] ? pos : undefined,
        ) as indexTuple;
    }

    public incrementPositions() : void {
        const newBasePos = this._positions[0] + 1;
        const newTargetPos = this._positions[1] + 1;
        this.setPositions([newBasePos, newTargetPos]);
    }

    public incrementBasePosition() : void {
        const newBasePos = this._positions[0] + 1;
        const newTargetPos = this._positions[1];
        this.setPositions([newBasePos, newTargetPos]);
    }

    public incrementTargetPosition() : void {
        const newBasePos = this._positions[0];
        const newTargetPos = this._positions[1] + 1;
        this.setPositions([newBasePos, newTargetPos]);
    }

    public getPositionTuple() : indexTuple { return this._positions; }

    public getLengthTuple() : indexTuple {
        return this._arrs.map((arr) : number => arr.length) as [number, number];
    }

    public getCurrentElems() : diffElemTuple<T> {
        return this._positions.map(
            (pos, i) => pos == undefined ? undefined : this._arrs[i][pos],
        ) as diffElemTuple<T>;
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

    public bothPositionsInBounds() : boolean {
        return this.getBoundsTuple().every((b) => b == true);
    }

    public somePositionInBounds() : boolean {
        return this.getBoundsTuple().some((b) => b == true);
    }
}
