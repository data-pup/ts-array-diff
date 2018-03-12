import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { alloc } from '../importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestAlloc {
    @test public testAllocCreatesAnEmptyArray() {
        const a = alloc<any>();
        assert.isEmpty(a);
    }

    @test public testTwoAllocedArraysAreIndividual() {
        const a = alloc<number>();
        const b = alloc<number>();
        a.push(1);
        assert.isEmpty(b);
    }
}
