import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
// import { diff } from './importDependencies';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestDiff {
    @test public placeholderTest() {
        // process.stdout.write('Hello?\n');
        assert.equal(1, 1);
    }
}
