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

  it('produces a total equal to the size of the input', () => {
    const testArr: Array<number> = [];
    const testLen: number = randInt(2048) + 1;
    for (let i = 0; i < testLen; i++) {
      testArr.push(randInt(2048));
    }

    const testIter: Iter<number> = new ArrayIter(testArr);
    const histo: Map<number, number> = counter(testIter);

    let histoValuesSum = 0;
    for (const value of histo.values()) {
      histoValuesSum += value;
    }

    expect(histoValuesSum).to.equal(testLen);
  });
});

function randInt(ceil: number): number {
  return Math.floor(Math.random() * ceil);
}
