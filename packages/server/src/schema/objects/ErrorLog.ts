import { extendType, objectType } from "@nexus/schema";

export const ErrorLog = objectType({
  name: 'ErrorLog',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.createdById()
    t.model.createdBy()
    t.model.updatedAt()
    t.model.message()
    t.model.stack()
    t.model.reqBody()
    t.model.resBody()
  },
})

export const Queries = extendType({
  type: "Query",
  definition(t) {
    t.crud.errorLog()
    t.crud.errorLogs({ filtering: true, ordering: true, pagination: true })
  }
})

export const ErrorLogMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneErrorLog({
      computedInputs:  {
        createdBy: ({ ctx }) => ({
          connect: {id: ctx.user.id}
        })
      }
    })
    t.crud.updateOneErrorLog()
  }
})