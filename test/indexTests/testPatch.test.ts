import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestPatch {
    @test public placeholderTest() {
        assert.equal(1, 1, 'patch tests not implemented');
    }
}
