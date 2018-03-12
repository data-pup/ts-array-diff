import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { clone } from '../importIndex';

/* tslint:disable-next-line:no-unused-variable */
@suite class TestClone {
    @test public emptyArrayCanBeCloned() {
        const a = new Array<string>();
        const b = clone<string>(a);
        assert.strictEqual(a.length, b.length);
        b.push('');
        assert.notEqual(a.length, b.length);
    }

    @test public arrayCanBeCloned() {
        const a = [1, 2, 3, 4, 5];
        const b = clone<number>(a);
        assert.strictEqual(a.length, b.length);
        for (let i = 0; i < a.length; i++) {
            assert.equal(a[i], b[i]);
        }
    }
}
