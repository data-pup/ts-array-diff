import { IAlignmentPosition } from './IAlignmentPosition';
import { arrDiffTuple, boundsTuple, diffElemTuple, indexTuple } from './positionTypes';

export class AlignmentPosition<T> implements IAlignmentPosition<T> {
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

    // Increment both the base and target positions.
    public incrementPositions() : void {
        const newBasePos = this._positions[0] + 1;
        const newTargetPos = this._positions[1] + 1;
        this.setPositions([newBasePos, newTargetPos]);
    }

    // Increment only the base position.
    public incrementBasePosition() : void {
        const newBasePos = this._positions[0] + 1;
        const newTargetPos = this._positions[1];
        this.setPositions([newBasePos, newTargetPos]);
    }

    // Increment only the target position.
    public incrementTargetPosition() : void {
        const newBasePos = this._positions[0];
        const newTargetPos = this._positions[1] + 1;
        this.setPositions([newBasePos, newTargetPos]);
    }

    // Fetch a tuple containing the base and target positions.
    public getPositionTuple() : indexTuple { return this._positions; }

    // Fetch a tuple containing the length of the base and target array.
    public getLengthTuple() : indexTuple {
        return this._arrs.map((arr) : number => arr.length) as [number, number];
    }

    // Fetch the elements in the base and target arrays at the current position.
    public getCurrentElems() : diffElemTuple<T> {
        return [0, 1].map( // Check if the position is in bounds before accessing.
            (i) => this._positions[i] == undefined
                ? undefined // Return undefined if the position is out of bounds.
                : this._arrs[i][this._positions[i]], // Access the element.
        ) as diffElemTuple<T>; // Cast into an element tuple and return.
    }

    // Get bounds flags, positions, and lengths in the form of index tuples.
    public getBoundsTuple(positions?:indexTuple) : boundsTuple {
        const lens:indexTuple = this.getLengthTuple();
        const indices:indexTuple = (positions == undefined)
            ? this.getPositionTuple() // If no parameter given, use the internal position.
            : positions; // If a position was given, use the position values.
        return [0, 1].map( // Apply a bounds check to the base and target positions.
            (i) : boolean => this.boundsCheck(indices[i], lens[i]),
        ) as boundsTuple;
    }

    // Returns true if every position is within the bounds of its array.
    public bothPositionsInBounds() : boolean {
        return this.getBoundsTuple().every((b) => b == true);
    }

    // Returns true if at least one position is within the bounds of its array.
    public somePositionInBounds() : boolean {
        return this.getBoundsTuple().some((b) => b == true);
    }
}
