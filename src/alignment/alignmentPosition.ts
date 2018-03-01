export class AlignmentPosition<T> {

    // This private static function is used by the constructor and mutator
    // methods to check that an index seems valid. Returns false if not.
    private static checkPosition(pos:number, length:number) : boolean {
        return (length != undefined) && (length >= 0)
            && (pos != undefined) && (pos >= 0) && (pos < length);
    }

    public static readonly invalidConstructorParamError =
        'Invalid AlignmentPosition constructor parameter given!';

    private _basePosition:number;
    private _targetPosition:number;

    public readonly baseLength:number;
    public readonly targetLength:number;

    constructor(base:T[], target:T[],
                basePosition:number=0, targetPosition:number=0) {
        if (base == undefined || target == undefined) {
            throw new Error(AlignmentPosition.invalidConstructorParamError);
        }

        this._basePosition = basePosition;
        this._targetPosition = targetPosition;
        this.baseLength = base.length;
        this.targetLength = target.length;
    }

    // Returns a boolean value representing whether the position is in bounds.
    public basePositionIsInBounds() : boolean {
        return AlignmentPosition.checkPosition(
            this._basePosition, this.baseLength);
    }

    // Returns a boolean value representing whether the position is in bounds.
    public targetPositionIsInBounds() : boolean {
        return AlignmentPosition.checkPosition(
            this._targetPosition, this.targetLength);
    }

    // Accessor Methods:
    // ------------------------------------------------------------------------

    // Returns the current base position, or `undefined` if the value is not
    // within the bounds of the base array. (i.e. < 0, or >= base.length)
    public getBasePosition() : number {
        return this.basePositionIsInBounds()
            ? this._basePosition
            : undefined;
    }

    // Returns the current target position, or `undefined` if the value is not
    // within the bounds of the target array. (i.e. < 0, or >= target.length)
    public getTargetPosition() : number {
        return this.targetPositionIsInBounds()
            ? this._targetPosition
            : undefined;
    }

    // Return both the base and target positions in a number tuple.
    public getPositionTuple() : [number, number] {
        return [this.getBasePosition(), this.getTargetPosition()];
    }

    // Mutator Methods:
    // ------------------------------------------------------------------------

    public setPositions(newBasePos:number, newTargetPos:number) : void {
        this._basePosition = newBasePos;
        this._targetPosition = newTargetPos;
    }

    public setBasePosition(newPosition:number) : void {
        this._basePosition = newPosition;
    }

    public setTargetPosition(newPosition:number) : void {
            this._targetPosition = newPosition;
    }
}
