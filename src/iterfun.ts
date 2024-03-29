import {Iter} from './iter';

/** Custom error used when an expected element is not present. */
export class NoSuchElementError extends Error {}

/**
 * Returns a histogram of the frequencies of values in the input iterator.
 * @param {Iter<T>} iter the iterator to count values in.
 * @return {Map<T,number>} the frequencies of each value in the input iterator.
 */
export function counter<T>(iter: Iter<T>): Map<T, number> {
  const histo: Map<T, number> = new Map();
  while (iter.hasNext()) {
    const curr: T = iter.next();
    const currValue: number = histo.get(curr) || 0;
    histo.set(curr, currValue + 1);
  }
  return histo;
}

/**
 * Returns an iterator that yields only the elements in the provided iterator
 * that match the specified predicate. Does not throw an exception even if no
 * elements match.
 * @param {Iter<T>} iter the iterator to filter.
 * @param {(arg: T) => boolean} pred the predicate to filter by.
 * @return {Iter<T>} an iterator tha returns the elements from the provided
 * iterator that match the predicate.
 */
export function filter<T>(iter: Iter<T>, pred: (arg: T) => boolean): Iter<T> {
  // dropWhile mutates the underlying iterator, so we don't need to save the
  // returned value
  dropWhile(iter, x => !pred(x));
  return {
    hasNext(): boolean {
      return iter.hasNext();
    },

    next(): T {
      if (!iter.hasNext()) {
        throw new RangeError();
      }

      // next() is the only method that changes the iterator's state, so this
      // is where we go into the underlying iterator and fast forward it past
      // non-matching elements
      const toReturn: T = iter.next();
      dropWhile(iter, x => !pred(x));
      return toReturn;
    },

    current(): T {
      if (!iter.hasNext()) {
        throw new RangeError();
      }

      return iter.current();
    },
  };
}

/**
 * Advances the iterator until it finds an element matching the provided
 * predicate, then returns that element. Theows NoSuchElementError if the end
 * of the iterator is reached without finding a matching element.
 * @param {Iter<T>} iter the iterator to find the element in.
 * @param {(arg: T) => boolean} pred the predicate the element to find should
 * satisfy.
 * @return {T} the first element returned by the iterator that satisfies the
 * predicate.
 */
export function find<T>(iter: Iter<T>, pred: (arg: T) => boolean): T {
  while (iter.hasNext()) {
    const curr: T = iter.next();
    if (pred(curr)) return curr;
  }
  throw new NoSuchElementError();
}

/**
 * Advances the provided iterator past each element that matches the provided
 * predicate. If there are no elements that do not match, the iterator is
 * returned in an empty state, but no exception is thrown.
 * @param {Iter<T>} iter the iterator to drop elements from.
 * @param {(arg: T) => boolean} pred the predicate used to decide if an element
 * should be dropped.
 * @return {Iter<T>} the provided iterator, advanced to the first element that
 * did not match pred.
 */
export function dropWhile<T>(
  iter: Iter<T>,
  pred: (arg: T) => boolean
): Iter<T> {
  while (iter.hasNext() && pred(iter.current())) iter.next();
  return iter;
}

/**
 * Separates elements of the iterator into groups defined by a provided
 * function.
 * @param {Iter<T>} iter the iterator to group the elements of
 * @param {(arg: T) => K} grouper the function to use to divide elements into
 * groups
 * @return a Map of the elements in the iterator. Keys are the return values
 * of the grouper function, values are lists of elements that produce that
 * value when the function is applied to them.
 */
export function groupBy<T, K>(
  iter: Iter<T>,
  grouper: (arg: T) => K
): Map<K, Array<T>> {
  const groups: Map<K, Array<T>> = new Map();

  while (iter.hasNext()) {
    const curr: T = iter.next();
    const group: K = grouper(curr);

    groups.set(group, groups.get(group)?.concat([curr]) || [curr]);
  }

  return groups;
}

/**
 * Returns an iterator that returns values from the provided iterator as long
 * as they match the provided predicate. At the first element that does not
 * match the predicate, the returned iterator will signal that it has
 * terminated.
 * @param {Iter<T>} iter the iterator to select elements from.
 * @param {(arg: T) => boolean} pred the predicate the elements should satisfy.
 * @return {Iter<T>} an iterator that will return the elements from the
 * provided iterator until it would return one which violates pred.
 */
export function keepWhile<T>(
  iter: Iter<T>,
  pred: (arg: T) => boolean
): Iter<T> {
  return {
    hasNext(): boolean {
      return pred(iter.current());
    },

    next(): T {
      if (!pred(iter.current())) {
        throw new RangeError();
      }

      return iter.next();
    },

    current(): T {
      if (!pred(iter.current())) {
        throw new RangeError();
      }

      return iter.current();
    },
  };
}

/**
 * Identifies the maximum value returned by an iterator, as defined by a
 * specified key function. If the provided iterator is empty, an exception is
 * thrown. If there are multiple largest elements, the first is returned.
 * @param {Iter<T>} iter the iterator to identify the maximum value of
 * @param {T => number} keyfunc a function that maps the elements of the iterator
 * to numbers, such that a smaller number represents a smaller element
 * @return {T} the largest element returned by the input iterator
 */
export function max<T>(iter: Iter<T>, keyfunc: (arg: T) => number): T {
  if (iter.hasNext()) {
    return minmax(iter, keyfunc)[1];
  } else {
    throw new Error('no max of empty iterator');
  }
}

/**
 * Maps the provided function (mapper) over an iterator. Returns a new iterator
 * that yields the values of the original iterator, but modified by the mapper.
 * @param {Iter<T1>} iter the iterator to map over
 * @param {(T1) => T2} mapper the function to map over the iterator'
 * @return {Iter<T2>} an iterator that applies the mapper over elements returned
 * by the original iterator.
 */
export function map<T1, T2>(iter: Iter<T1>, mapper: (arg: T1) => T2): Iter<T2> {
  return {
    hasNext(): boolean {
      return iter.hasNext();
    },

    next(): T2 {
      return mapper(iter.next());
    },

    current(): T2 {
      return mapper(iter.current());
    },
  };
}

/**
 * Identifies the minimum value returned by an iterator, as defined by a
 * specified key function. If the provided iterator is empty, an exception is
 * thrown. If there are multiple smallest elements, the first is returned.
 * @param {Iter<T>} iter the iterator to identify the minimum value of
 * @param {T => number} keyfunc a function that maps the elements of the iterator
 * to numbers, such that a smaller number represents a smaller element
 * @return {T} the smallest element returned by the input iterator
 */
export function min<T>(iter: Iter<T>, keyfunc: (arg: T) => number): T {
  if (iter.hasNext()) {
    return minmax(iter, keyfunc)[0];
  } else {
    throw new Error('no min of empty iterator');
  }
}

/**
 * Identifies the minimum and maximum values returned by an iterator, as defined
 * by a specified key function. If the provided iterator is empty, an exception
 * is thrown. The first extreme element is preferentially returned.
 * @param {Iter<T>} iter the iterator to identify the minimum and maximum values
 * of
 * @param {T => number} keyfunc a function that maps the elements of the iterator
 * to numbers, such that a smaller number represents a smaller element
 * @return {[T, T]} the smallest and largest elements returned by the input
 * iterator
 */
export function minmax<T>(iter: Iter<T>, keyfunc: (arg: T) => number): [T, T] {
  if (!iter.hasNext()) {
    throw new Error('no min or max of empty iterator');
  }

  let minVal: T = iter.next();
  let maxVal: T = iter.next();

  let minKey: number = keyfunc(minVal);
  let maxKey: number = keyfunc(maxVal);

  while (iter.hasNext()) {
    const currVal: T = iter.next();
    const currKey: number = keyfunc(currVal);

    if (currKey > maxKey) {
      maxVal = currVal;
      maxKey = currKey;
    }

    if (currKey < minKey) {
      minVal = currVal;
      minKey = currKey;
    }
  }

  return [minVal, maxVal];
}

/**
 * Repeatedly applies the provided function (reducer) to each value provided by
 * the iterator. Starts from a provided base value, which is returned if the
 * iterator contains no elements.
 * @param {Iter<T>} iter the iterator to reduce
 * @param {T} baseVal the starting value to use when reducing
 * @param {(T, T) => T} reduce the function to reduce by
 * @return {T} the result of reducing all values provided by the iterator, or
 * baseVal if there were no values in the iterator
 */
export function reduce<T>(
  iter: Iter<T>,
  baseVal: T,
  reducer: (arg1: T, arg2: T) => T
): T {
  if (!iter.hasNext()) return baseVal;
  while (iter.hasNext()) baseVal = reducer(baseVal, iter.next());
  return baseVal;
}
