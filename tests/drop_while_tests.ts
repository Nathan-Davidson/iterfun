/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {Iter} from '../src/iter';
import {dropWhile} from '../src/iterfun';

import {expect} from 'chai';

describe('dropWhile tests', () => {
  let iter: Iter<number>;

  beforeEach(() => {
    iter = new ArrayIter([1, 2, 3, 4]);
  });

  it('drops values that match', () => {
    expect(dropWhile(iter, x => x < 3).next()).to.equal(3);
  });

  it('drops only until the first non-match', () => {
    let testIter: Iter<number> = new ArrayIter([1, 2, 3, 2, 1]);
    testIter = dropWhile(testIter, x => x < 3);
    expect(testIter.next()).to.equal(3);
    expect(testIter.next()).to.equal(2);
    expect(testIter.next()).to.equal(1);
  });

  it('does not throw an exception if no values match', () => {
    expect(() => dropWhile(iter, x => x < 5)).not.to.throw();
  });
});
