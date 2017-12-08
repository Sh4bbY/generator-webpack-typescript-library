// unit under test
import {Example} from '../src/Example';

import {expect} from 'chai';

describe('Example', () => {

    describe('constructor', () => {
        it('should create a new Example without failing', () => {
            const example = new Example('John');
            expect(example).to.be.instanceOf(Example);
        });
    });

    describe('sayHello', () => {
        it('should say hello to the provided name', () => {
            const example = new Example('Johnny');

            expect(example.sayHello()).to.equal('Hello Johnny!');
        });
    });
});
