/**
 * Simplified CSV handling
 */

import papa from "papaparse"

export { papa }

// Stringify javascript arrays into CSV, similar to JSON.stringify
export function stringify(arr: Record<string, CsvSupportedTypes>[], delimiter = ','): string {
  if (!arr.length) return '';

  // Ensure that the first row has ALL of the columns, b/c
  // papa detects column names by the first object. This is
  const allColumns = new Set<string>();
  arr.forEach(o => {
    const properties = Object.keys(o);
    properties.forEach(f => allColumns.add(f));
  });
  const columns = Array.from(allColumns);
  columns.forEach(c => {
    if (!(c in arr?.[0])) arr[0][c] = null;
  })

  const str = papa.unparse(arr, { delimiter })
  return str
}

// For stringifying [[1,2,3],[4,5,6]] into 1,2,3\n4,5,6
export function stringifyArrayOfArrays(arr: CsvSupportedTypes[][], delimiter = ','): string {
  const str = papa.unparse(arr, { delimiter })
  return str
}

// For stringifying [1,2,3] into 1,2,3
export function stringifySingle(arr: CsvSupportedTypes[], delimiter = ','): string {
  return stringifyArrayOfArrays([arr], delimiter)
}

// Parse a csv str into a javascript arrays into CSV, similar to JSON.parse
export function parseStr(str: string): Record<string, CsvSupportedTypes>[] {
  const res = papa.parse(str)
  if (res.errors.length) {
    const error = res.errors.map(e => `${e.type}:${e.code}:${e.row} - ${e.message}`).join("\n")
    throw new Error(error);
  }
  return res.data as any
}

export type CsvSupportedTypes = undefined | null | string | number | Date;