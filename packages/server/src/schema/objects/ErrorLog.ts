import { objectType } from "@nexus/schema";
import { RequestWithUserContext } from "../lib/field-authorize-plugin-helpers";


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
