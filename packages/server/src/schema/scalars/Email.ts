import { scalarType } from "@nexus/schema";
import { assertEmail} from "@app/util/src/emails";

export const Email = scalarType({
  name: 'Email',
  asNexusMethod: 'email',
  description: 'The Email scalar type asserts email validity',
  parseValue(value) {
    return assertEmail(value)
  },
  serialize(value) {
    return value
  },
  // parseLiteral(value) {
  //   return assertEmail(value)
  // }
})