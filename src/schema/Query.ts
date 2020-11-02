import { intArg, queryType, stringArg } from '@nexus/schema'
import argon from 'argon2';
import jwt from 'jsonwebtoken';

export const Query = queryType({
  definition(t) {
    t.crud.users({ filtering: true, ordering: true })
    t.crud.posts({ filtering: true, ordering: true })
    t.crud.tags({ filtering: true, ordering: true })

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
        if (!await argon.verify(user.password, args.password)) {
          throw new Error(`Username or Password is invalid`)
        }
        return {
          accessToken: jwt.sign({ id: user.id, roles: user.roles }, "supersecret", { expiresIn: '1d' }),
          userId: user.id,
          roles: user.roles,
        }
      },
    })
  },
})
