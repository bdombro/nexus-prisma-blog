import { mutationType } from '@nexus/schema'

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser()
    t.crud.updateOneUser()
    t.crud.deleteOneUser()

    t.crud.createOnePost()
    t.crud.updateOnePost()
    t.crud.deleteOnePost()

    t.crud.createOneTag()
    t.crud.updateOneTag()
    t.crud.deleteOneTag()
  },
})
