import { boundsTuple, diffElemTuple, indexTuple } from './positionTypes';

export interface IAlignmentPosition<T> {

    // Position mutators
    setPositions(positions:indexTuple) : void;
    incrementPositions() : void;
    incrementBasePosition() : void;
    incrementTargetPosition() : void;

    // Accessor methods
    getPositionTuple() : indexTuple;
    getLengthTuple() : indexTuple;
    getCurrentElems() : diffElemTuple<T>;
    getBoundsTuple(positions?:indexTuple) : boundsTuple;

    // Bounds check methods
    bothPositionsInBounds() : boolean;
    somePositionInBounds() : boolean;
}
