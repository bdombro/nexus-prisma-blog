/**
 * Return an intersection array of two or multiple arrays
 *
 * Example: arrayIntersection([1,2], [1]) => [1]
 */
// @ts-ignore any props
export function intersection(...arrays) {
  return arrays.reduce((a, b) => b.filter(Set.prototype.has.bind(new Set(a))));
}
