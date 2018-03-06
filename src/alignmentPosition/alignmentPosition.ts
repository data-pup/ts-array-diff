import { IAlignmentPosition } from './IAlignmentPosition';
import {
    alignmentSequence,
    arrTuple,
    boundsTuple,
    elemTuple,
    indexTuple,
} from '../alignmentTypes';

export class AlignmentPosition<T> implements IAlignmentPosition<T> {
    public static readonly undefinedParamError = 'AlignmentPosition constructor was given an undefined parameter!';
    public static readonly invalidIndexRangeError = 'getIndicesInRange given invalid parameters.';

    private readonly _arrs:arrTuple<T>;
    private _positions:indexTuple;

    constructor(arrs:arrTuple<T>, positions:indexTuple=[0, 0]) {
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
    public getCurrentElems() : elemTuple<T> {
        return [0, 1].map( // Check if the position is in bounds before accessing.
            (i) => this._positions[i] == undefined
                ? undefined // Return undefined if the position is out of bounds.
                : this._arrs[i][this._positions[i]], // Access the element.
        ) as elemTuple<T>; // Cast into an element tuple and return.
    }

    public atMatch() : boolean {
        if (!this.bothPositionsInBounds()) { return false; }
        const [currBaseElem, currTargetElem]:elemTuple<T> = this.getCurrentElems();
        return currBaseElem === currTargetElem;
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

    public getDistance(newPos:indexTuple) : number {
        if (!this.bothPositionsInBounds()) {
            throw new Error('Original position is not in bounds, cannot calculate distance!');
        }

        const lens:indexTuple = this.getLengthTuple();
        const newBounds:boundsTuple = this.getBoundsTuple(newPos);
        return [0, 1]
            .map((i) : number =>
                newBounds[i] && newPos[i] >= this._positions[i]
                    ? newPos[i] - this._positions[i]
                    : lens[i] - this._positions[i])
            .reduce((prev, curr) => prev + curr);
    }

    public getNextMatchPosition() : AlignmentPosition<T> {
        // First, check that both positions are in bounds, or if the current position is a match.
        if (!this.bothPositionsInBounds()) {
            const lens:indexTuple = this.getLengthTuple();
            const tailPositions:indexTuple = lens.map((len) => len > 0 ? len : 0) as indexTuple;
            return new AlignmentPosition(this._arrs, tailPositions);
        } else if (this.atMatch()) {
            return new AlignmentPosition(this._arrs, this.getPositionTuple());
        }

        const [currBaseIndex, currTargetIndex]:indexTuple = this.getPositionTuple();
        const possiblePaths:AlignmentPosition<T>[] = [
            new AlignmentPosition(this._arrs, [currBaseIndex + 1, currTargetIndex]),
            new AlignmentPosition(this._arrs, [currBaseIndex, currTargetIndex + 1]),
        ];
        const pathMatches = possiblePaths.map((pos) => pos.getNextMatchPosition());
        const pathMatchDistances:number[] =
            pathMatches
            .map((pos:AlignmentPosition<T>) : number =>
                 this.getDistance(pos.getPositionTuple()));
        const shortestDistance:number = Math.min(...pathMatchDistances);
        const bestPathIndex = pathMatchDistances.indexOf(shortestDistance);
        return pathMatches[bestPathIndex];
    }

    public getAlignment() : alignmentSequence<T> {
        const alignment:elemTuple<T>[] = new Array();
        while (this.somePositionInBounds()) {
            if (this.atMatch()) { // Process a match.
                alignment.push(this.getCurrentElems());
                this.incrementPositions();
            } else { // Process a difference where both positions are in bounds.
                if (this.bothPositionsInBounds()) {
                    const nextMatch:AlignmentPosition<T> = this.getNextMatchPosition();
                    const [bNextMatchIndex, tNextMatchIndex] = nextMatch.getPositionTuple();
                    alignment.push(...this.getBaseItemsToRemove(bNextMatchIndex));
                    alignment.push(...this.getTargetItemsToAdd(tNextMatchIndex));
                    this.setPositions([bNextMatchIndex, tNextMatchIndex]);
                } else { // Process the rest of an array if one position is out of bounds.
                    const [baseInBounds, targetInBounds]:boundsTuple = this.getBoundsTuple();
                    const [currBaseElem, currTargetElem]:elemTuple<T> = this.getCurrentElems();
                    if (baseInBounds) {
                        alignment.push([currBaseElem, undefined]);
                        this.incrementBasePosition();
                    } else if (targetInBounds) {
                        alignment.push([undefined, currTargetElem]);
                        this.incrementTargetPosition();
                    } else { throw new Error ('Unexpected Error occured creating alignment!'); }
                }
            }
        }
        return alignment;
    }

    private getBaseItemsToRemove(nextMatchIndex:number) : elemTuple<T>[] {
        const currBaseIndex = this.getPositionTuple()[0];
        const indexRange:number[] = this.getIndicesInRange(
            currBaseIndex, nextMatchIndex, this._arrs[0]);
        return indexRange.map((i) : elemTuple<T> => [this._arrs[0][i], undefined]);
    }

    private getTargetItemsToAdd(nextMatchIndex:number) : elemTuple<T>[] {
        const currentTargetIndex = this.getPositionTuple()[1];
        const indexRange:number[] = this.getIndicesInRange(
            currentTargetIndex, nextMatchIndex, this._arrs[1]);
        return indexRange.map((i) : elemTuple<T> => [undefined, this._arrs[1][i]]);
    }

    private getIndicesInRange(min:number, max:number, arr:T[]) : number[] {
        const [startIndex, endIndex] = [min, max === undefined ? arr.length : max];
        if (startIndex > endIndex) { throw new Error(AlignmentPosition.invalidIndexRangeError); }
        const rangeSize = endIndex - startIndex;
        const indexRange = [...Array(rangeSize)].map((_, i) => startIndex + i);
        return indexRange;
    }
}
