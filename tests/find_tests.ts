/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {Iter} from '../src/iter';
import {find} from '../src/iterfun';

import {expect} from 'chai';

describe('find tests', () => {
  let iter: Iter<number>;

  beforeEach(() => {
    iter = new ArrayIter([1, 2, 3, 4]);
  });

  it('finds values that are present', () => {
    expect(find(iter, x => x === 4)).to.equal(4);
  });

  it('finds the first value when several values match', () => {
    expect(find(iter, x => x >= 2)).to.equal(2);
  });

  it('throws an exception when no values match', () => {
    expect(() => find(iter, x => x >= 20)).to.throw();
  });
});
