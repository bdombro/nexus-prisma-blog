import { objectType, scalarType } from "@nexus/schema";

export const Empty = scalarType({
  name: 'Empty',
  description: 'The Empty scalar has no fields',
  // definition(t) {
  //   dummy
  // }
})