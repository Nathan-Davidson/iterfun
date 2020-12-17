/* eslint-disable node/no-unpublished-import */
import {Iter} from '../src/iter';
import {ArrayIter} from '../src/array_iter';

import {expect} from 'chai';

describe('ArrayIter tests', () => {
  const sampleArr: Array<number> = [0, 1, 2, 4];

  it('is has a next element at the start of the list', () => {
    const iter: Iter<number> = new ArrayIter(sampleArr);

    expect(iter.hasNext()).to.equal(true);
  });

  it('is has no next element at the end of the list', () => {
    const iter: Iter<number> = new ArrayIter(sampleArr);

    iter.next();
    iter.next();
    iter.next();
    iter.next();

    expect(iter.hasNext()).to.equal(false);
  });

  it('iterates in order', () => {
    const iter: Iter<number> = new ArrayIter(sampleArr);

    sampleArr.forEach(x => expect(iter.next()).to.equal(x));
  });

  // Ideally, this would check for RangeError specifically, but I've been
  // unable to get chai to check that properly.
  it('throws an exception if next is called with no next element', () => {
    const iter: Iter<number> = new ArrayIter(new Array<number>());
    expect(iter.next.bind(iter)).to.throw();
  });
});
