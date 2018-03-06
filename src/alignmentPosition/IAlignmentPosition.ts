import { boundsTuple, elemTuple, indexTuple } from './positionTypes';

export interface IAlignmentPosition<T> {

    // Position mutators
    setPositions(positions:indexTuple) : void;
    incrementPositions() : void;
    incrementBasePosition() : void;
    incrementTargetPosition() : void;

    // Accessor methods
    getPositionTuple() : indexTuple;
    getLengthTuple() : indexTuple;
    getCurrentElems() : elemTuple<T>;
    atMatch() : boolean;
    getBoundsTuple(positions?:indexTuple) : boundsTuple;

    // Bounds check methods
    bothPositionsInBounds() : boolean;
    somePositionInBounds() : boolean;

    // This function will return an object at the next matching position.
    getDistance(newPos:indexTuple) : number;
    getNextMatchPosition() : IAlignmentPosition<T>;
}
