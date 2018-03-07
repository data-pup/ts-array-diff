import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import {
    alignmentSequence,
    assertArraysAreEqual,
    elemTuple,
    getTupleTypes,
    invalidTupleErrorMessage,
    tupleType,
} from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestGetTupleTypes {

    @test public getValidTupleTypes() {
        const tuples:alignmentSequence<number> = [
            [undefined, 0],
            [1, 1],
            [2, undefined],
        ];
        const actualTupleTypes = getTupleTypes(tuples);
        const expectedTupleTypes:tupleType[] = [
            'add',
            'noop',
            'remove',
        ];
        assertArraysAreEqual(actualTupleTypes, expectedTupleTypes);
    }

    @test public invalidTuplesRaiseException() {
        const invalidTuples:alignmentSequence<number> = [
            [1, 2],
            [undefined, undefined],
        ];
        invalidTuples.forEach((invalidTuple:elemTuple<number>) : void => {
            assert.throws(
                (tuple:elemTuple<number>) => getTupleTypes([tuple]),
                invalidTupleErrorMessage,
            );
        });
    }
}
