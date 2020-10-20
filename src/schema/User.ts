import { objectType } from '@nexus/schema'
import { UserRole } from '@prisma/client'
import auth from '../auth'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.posts({ filtering: true, ordering: true, pagination: true })
    t.string("email", {
      resolve: auth.resolveFieldIfOwner("email", [UserRole.EDITOR]),
    })
    t.list.string("roles", {
      resolve: auth.resolveFieldIfOwner("roles", []),
    })
  },
})
