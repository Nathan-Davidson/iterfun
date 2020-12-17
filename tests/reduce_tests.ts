/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {reduce} from '../src/iterfun';

import {expect} from 'chai';

describe('reduce tests', () => {
  it('processes each value', () => {
    expect(reduce(new ArrayIter([1, 2, 3, 4]), 0, (x, y) => x + y)).to.equal(
      10
    );
    expect(reduce(new ArrayIter([1, 2, 3]), 1, (x, y) => x * y)).to.equal(6);
    expect(reduce(new ArrayIter([9]), 1, (x, y) => x * y)).to.equal(9);
  });

  it('returns the base value for an empty iterator', () => {
    expect(reduce(new ArrayIter([]), 0, (x, y) => x + y)).to.equal(0);
  });
});
