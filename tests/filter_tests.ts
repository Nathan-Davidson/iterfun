/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {Iter} from '../src/iter';
import {filter} from '../src/iterfun';

import {expect} from 'chai';

describe('filter tests', () => {
  it('returns only elements that match', () => {
    let testIter: Iter<number> = new ArrayIter([1, 2]);
    testIter = filter(testIter, x => x % 2 === 0);

    expect(testIter.next()).to.equal(2);
  });

  it('returns elements that match after non-matching elements', () => {
    let testIter: Iter<number> = new ArrayIter([1, 2, 3, 4, 5, 6]);
    testIter = filter(testIter, x => x % 2 === 0);

    testIter.next();
    expect(testIter.next()).to.equal(4);
    expect(testIter.next()).to.equal(6);
  });

  it('does not throw an exception if there are no matching elements', () => {
    expect(() => filter(new ArrayIter([]), x => x === 9)).to.not.throw();
    expect(() => filter(new ArrayIter([1, 2, 3]), x => x < 0)).to.not.throw();
  });

  it('does not share state between calls', () => {
    const arr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
    const iterA: Iter<number> = filter(new ArrayIter(arr), x => x % 2 === 1);
    const iterB: Iter<number> = filter(new ArrayIter(arr), x => x % 2 === 0);

    expect(iterA.next()).to.equal(1);
    expect(iterB.next()).to.equal(2);
    expect(iterA.next()).to.equal(3);
    expect(iterA.next()).to.equal(5);
    expect(iterB.next()).to.equal(4);
    expect(iterB.next()).to.equal(6);
    expect(iterA.next()).to.equal(7);
    expect(iterB.next()).to.equal(8);
  });
});
