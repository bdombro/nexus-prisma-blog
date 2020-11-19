import { extendType, objectType } from "@nexus/schema";

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.tags()
    t.model.status()
    t.model.author()
    t.model.authorId()
  },
})

export const Queries = extendType({
  type: "Query",
  definition(t) {
    t.crud.post()
    t.crud.posts({ filtering: true, ordering: true, pagination: true })
  }
})

export const Mutations = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOnePost()
    t.crud.updateOnePost()
    t.crud.deleteOnePost()
  }
})