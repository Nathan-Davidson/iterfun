/* eslint-disable node/no-unpublished-import */
import {Iter} from '../src/iter';
import {ArrayIter} from '../src/array_iter';
import {map} from '../src/iterfun';

import {expect} from 'chai';

describe('map tests', () => {
  it('applies a function to values from an iterator', () => {
    const iter: Iter<number> = new ArrayIter([1, 2, 3, 4]);
    const mappedIter: Iter<number> = map(iter, x => x * x);
    expect(mappedIter.next()).to.equal(1);
    expect(mappedIter.next()).to.equal(4);
    expect(mappedIter.next()).to.equal(9);
    expect(mappedIter.next()).to.equal(16);
  });

  it('does not throw an exception for an empty iterator', () => {
    const iter: Iter<number> = new ArrayIter(new Array<number>());
    expect(() => map(iter, x => x)).not.to.throw();
  });
});
