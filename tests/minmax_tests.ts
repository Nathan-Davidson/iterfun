/* eslint-disable node/no-unpublished-import */
import {ArrayIter} from '../src/array_iter';
import {Iter} from '../src/iter';
import {min} from '../src/iterfun';
import {minmax} from '../src/iterfun';
import {max} from '../src/iterfun';

import {expect} from 'chai';

describe('min tests', () => {
  it('errors with a specific message', () => {
    const testIter: Iter<number> = new ArrayIter([]);

    expect(() => min(testIter, x => x)).to.throw('no min of empty iterator');
  });
});

describe('max tests', () => {
  it('errors with a specific message', () => {
    const testIter: Iter<number> = new ArrayIter([]);

    expect(() => max(testIter, x => x)).to.throw('no max of empty iterator');
  });
});

describe('minmax tests', () => {
  it('returns min and max values', () => {
    const testIter: Iter<number> = new ArrayIter([1, 2, 3, 4, 5]);
    const results: [number, number] = minmax(testIter, x => x);

    expect(results[0]).to.equal(1);
    expect(results[1]).to.equal(5);
  });

  it('returns the first of each value', () => {
    const testIter: Iter<string> = new ArrayIter([
      'foo',
      'foobar',
      'bar',
      'foobaz',
    ]);
    const results: [string, string] = minmax(testIter, x => x.length);

    expect(results[0]).to.equal('foo');
    expect(results[1]).to.equal('foobar');
  });
});
