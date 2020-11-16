/**
 * Will return an array containing what's in the first array but NOT in the other arrays.
 * adapted from https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_difference
 */

const arrayDifference: ArrayDifferenceType = (...arrays: any[][]) => {
  return arrays.reduce((a, b) => a.filter((c) => !b.includes(c)));
};
export default arrayDifference;

// Returns the same type as args
export type ArrayDifferenceType = <T extends any>(...arrays: T[][]) => T[];
