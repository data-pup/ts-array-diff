export class AlignmentPosition<T> {

    private static validateParameters<T>(base:T[], target:T[],
                                         basePosition:number=0,
                                         targetPosition:number=0) : boolean {
        // Check that both array parameters are defined.
        const bothArraysAreDefined = [base, target]
            .every((arr:T[]) : boolean => arr != undefined);
        if (!bothArraysAreDefined) { return false; }

        // Check that both the base and target positions are valid.
        if (!AlignmentPosition.checkPosition(basePosition, base.length)) {
            return false;
        }
        if (!AlignmentPosition.checkPosition(targetPosition, target.length)) {
            return false;
        }

        return true; // Return true if none of the other checks failed.
    }

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
        if (!AlignmentPosition.validateParameters(
            base, target, basePosition, targetPosition)) {
                throw new Error(AlignmentPosition.invalidConstructorParamError);
        }

        this._basePosition = basePosition;
        this._targetPosition = targetPosition;
        this.baseLength = base.length;
        this.targetLength = target.length;
    }

    public basePositionIsInBounds() : boolean {
        return AlignmentPosition.checkPosition(
            this._basePosition, this.baseLength);
    }

    public targetPositionIsInBounds() : boolean {
        return AlignmentPosition.checkPosition(
            this._targetPosition, this.targetLength);
    }

    // Accessor Methods:
    // ------------------------------------------------------------------------

    public getBasePosition() : number {
        return this.basePositionIsInBounds()
            ? this._basePosition
            : undefined;
    }

    public getTargetPosition() : number {
        return this.targetPositionIsInBounds()
            ? this._targetPosition
            : undefined;
    }

    // Mutator Methods:
    // ------------------------------------------------------------------------

    public setBasePosition(newPosition:number) : void {
        this._basePosition = newPosition;
    }

    public setTargetPosition(newPosition:number) : void {
            this._targetPosition = newPosition;
    }
}
