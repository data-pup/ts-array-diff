import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
// import { patch } from './importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestPatch {
    @test public placeholderTest() {
        assert.equal(1, 2, 'patch tests not implemented');
    }
}
