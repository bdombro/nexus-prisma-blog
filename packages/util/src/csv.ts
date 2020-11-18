/**
 * Simplified CSV handling
 */

import papa from "papaparse";

export { papa };

// Stringify javascript arrays into CSV, similar to JSON.stringify
export function stringify(arr: any[], delimiter = ","): string {
  if (!arr.length) return "";

  // If and array of arrays, like pattern [[1,2,3],[4,5,6]]
  if (Array.isArray(arr[0]))
    return papa.unparse(arr, { delimiter })

  // If an array of scalars, like pattern [1,2,3]
  else if (typeof arr[0] !== "object" || arr[0] instanceof Date)
    return papa.unparse([arr], { delimiter })

  // Else is an array of objects.

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
  });

  const str = papa.unparse(arr, { delimiter });
  return str;
}


// Parse a csv str into a javascript arrays into CSV, similar to JSON.parse
export function parseStr(str: string): any[] {
  const res = papa.parse(str);
  if (res.errors.length) {
    const error = res.errors.map(e => `${e.type}:${e.code}:${e.row} - ${e.message}`).join("\n");
    throw new Error(error);
  }
  return res.data as any;
}

export async function downloadAsCsv(filename: string, records: any[]) {
  const csvStr = await stringify(records);
  const a = document.createElement("a");
  a.href = `data:text/csv;charset=UTF-8,\uFEFF${encodeURIComponent(csvStr)}`;
  a.download = filename;
  a.click();
  a.remove();
}
