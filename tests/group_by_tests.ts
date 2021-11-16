/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {Iter} from '../src/iter';
import {groupBy} from '../src/iterfun';

import {randInt} from './utils';

import {expect} from 'chai';

describe('groupby tests', () => {
  it('categorizes elements by the function', () => {
    const testIter: Iter<number> = new ArrayIter([1, 1, 1, 1]);
    const isOdd: (arg: number) => boolean = x => x % 2 === 1;
    const groups: Map<boolean, Array<number>> = groupBy(testIter, isOdd);

    expect(groups.get(true)).to.eql([1, 1, 1, 1]);
  });

  it('separates elements into multiple groups', () => {
    const testIter: Iter<number> = new ArrayIter([1, 2]);
    const isOdd: (arg: number) => boolean = x => x % 2 === 1;
    const groups: Map<boolean, Array<number>> = groupBy(testIter, isOdd);

    expect(groups.get(true)).to.eql([1]);
    expect(groups.get(false)).to.eql([2]);
  });

  it('preserves the order of the underlying iterator', () => {
    const testIter: Iter<number> = new ArrayIter([1, 2, 3, 4, 5, 6]);
    const isOdd: (arg: number) => boolean = x => x % 2 === 1;
    const groups: Map<boolean, Array<number>> = groupBy(testIter, isOdd);

    expect(groups.get(true)).to.eql([1, 3, 5]);
    expect(groups.get(false)).to.eql([2, 4, 6]);
  });

  it('produces groups whose size equals the size of the input', () => {
    const testArr: Array<number> = [];
    const testLen: number = randInt(2048) + 1;
    for (let i = 0; i < testLen; i++) {
      testArr.push(randInt(2048));
    }

    const testIter: Iter<number> = new ArrayIter(testArr);
    const isOdd: (arg: number) => boolean = x => x % 2 === 1;
    const groups: Map<boolean, Array<number>> = groupBy(testIter, isOdd);

    let groupsSizeSum = 0;
    for (const value of groups.values()) {
      groupsSizeSum += value.length;
    }

    expect(groupsSizeSum).to.equal(testLen);
  });
});
