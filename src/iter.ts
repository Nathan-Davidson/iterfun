export interface Iter<T> {
  hasNext(): boolean;
  next(): T;
  current(): T;
}
