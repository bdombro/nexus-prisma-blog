import { mutationType } from '@nexus/schema'

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOnePost()
    t.crud.updateOnePost()
    t.crud.deleteOnePost()
  },
})
