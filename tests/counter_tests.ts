/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {Iter} from '../src/iter';
import {counter} from '../src/iterfun';

import {expect} from 'chai';

describe('counter tests', () => {
  it('returns the frequency of elements', () => {
    const testIter: Iter<number> = new ArrayIter([1, 1, 2, 3, 3]);
    const histo: Map<number, number> = counter(testIter);

    expect(histo.get(1)).to.equal(2);
    expect(histo.get(2)).to.equal(1);
    expect(histo.get(3)).to.equal(2);
  });

  it('counts non-consecutive instances of an element', () => {
    const testIter: Iter<number> = new ArrayIter([1, 2, 1, 2, 1]);
    const histo: Map<number, number> = counter(testIter);

    expect(histo.get(1)).to.equal(3);
    expect(histo.get(2)).to.equal(2);
  });
});
