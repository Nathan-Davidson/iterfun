import {Iter} from './iter';

/** An implementation of the Iter interface over Typescript arrays */
export class ArrayIter<T> implements Iter<T> {
  pos: number;
  arr: Array<T>;

  /**
   * Constructs an iterator over the provided Array.
   * @param {Array<T>} arr the Array to iterate over
   */
  constructor(arr: Array<T>) {
    this.arr = arr;
    this.pos = 0;
  }

  /**
   * pos is used as an index into the underlying Array, so the iterator can
   * continue as long as it's a valid index (less than the list's length).
   * @return {boolean} true if next can safely be called, false if it cannot
   */
  hasNext(): boolean {
    return this.pos < this.arr.length;
  }

  /**
   * Returns the next element in the underyling Array. Throws RangeError if
   * the iterator has reached the end of the Array.
   * @return {T} the next element in the Array, if one exists.
   */
  next(): T {
    if (!this.hasNext()) {
      throw new RangeError();
    }

    return this.arr[this.pos++];
  }
}
