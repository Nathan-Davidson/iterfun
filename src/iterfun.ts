import {Iter} from './iter';

/** Custom error used when an expected element is not present. */
export class NoSuchElementError extends Error {}

/**
 * Advances the iterator until it finds an element matching the provided
 * predicate, then returns that element. Theows NoSuchElementError if the end
 * of the iterator is reached without finding a matching element.
 * @param {Iter<T>} iter the iterator to find the element in.
 * @param {(T) => boolean} pred the predicate the element to find should
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
 * @param {(T) => boolean} pred the predicate used to decide if an element
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
 * Returns an iterator that returns values from the provided iterator as long
 * as they match the provided predicate. At the first element that does not
 * match the predicate, the returned iterator will signal that it has
 * terminated.
 * @param {Iter<T>} iter the iterator to select elements from.
 * @param {(T) => boolean} pred the predicate the elements should satisfy.
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
