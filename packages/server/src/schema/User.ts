import { objectType } from "@nexus/schema";
import { UserRole } from '@prisma/client'
import auth from './lib/field-authorize-plugin-helpers'


export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()

    t.model.name()
    t.model.posts({ filtering: true, ordering: true, pagination: true })

    t.model.roles()
    // Below sadly doesn't expose the enum, so skipping security for now
    // t.list.string("roles", {
    //   resolve: auth.resolveFieldIfOwner("roles", []),
    // })

    t.email("email", {
      resolve: auth.resolveFieldIfOwner("email", [UserRole.EDITOR]),
    })

    t.password("password", {
      resolve: auth.never('password'),
    })
  },
})
