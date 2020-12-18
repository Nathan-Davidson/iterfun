/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {Iter} from '../src/iter';
import {keepWhile} from '../src/iterfun';

import {expect} from 'chai';

describe('keepWhile tests', () => {
  let iter: Iter<number>;

  beforeEach(() => {
    iter = new ArrayIter([1, 2, 3, 4]);
  });

  it('does not return non-matching values', () => {
    iter = keepWhile(iter, x => x < 3);
    iter.next();
    iter.next();

    expect(iter.hasNext()).to.equal(false);
  });

  it('returns matching values', () => {
    expect(keepWhile(iter, x => x < 3).next()).to.equal(1);
  });

  it('cannot access past a non-matching element', () => {
    iter = keepWhile(iter, x => x === 0);
    expect(() => iter.next()).to.throw();
    expect(() => iter.current()).to.throw();
  });
});
