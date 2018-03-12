import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestOpGroup {
    @test public placeholder() {
        assert.equal(1, 2, 'Not Implemented');
    }
}
