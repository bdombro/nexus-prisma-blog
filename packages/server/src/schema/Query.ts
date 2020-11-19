import { queryType, stringArg } from '@nexus/schema'
import * as crypto from "@app/util/src/crypto";

export const Query = queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({ filtering: true, ordering: true, pagination: true })

    t.crud.post()
    t.crud.posts({ filtering: true, ordering: true, pagination: true })

    t.crud.tag()
    t.crud.tags({ filtering: true, ordering: true, pagination: true })

    t.crud.errorLog()
    t.crud.errorLogs({ filtering: true, ordering: true, pagination: true })


    t.field('token', {
      type: 'Token',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (_root, args, ctx) => {
        const user = await ctx.prisma.user
          .findOne({
            where: {
              email: args.email,
            },
          })
        if (user === null) {
          throw new Error(`Username or Password is invalid`)
        }
        if (!await crypto.verify(args.password, user.password)) {
          throw new Error(`Username or Password is invalid`)
        }
        return {
          accessToken: crypto.tokenize({ id: user.id, roles: user.roles }),
          userId: user.id,
          roles: user.roles,
        }
      },
    })
  },
})
