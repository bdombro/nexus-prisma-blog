import { objectType } from '@nexus/schema'

export const Token = objectType({
  name: 'Token',
  definition(t) {
    t.string('accessToken')
    t.string('userId')
    t.list.string('roles')
  },
})
