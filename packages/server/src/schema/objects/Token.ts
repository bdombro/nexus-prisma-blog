import * as crypto from "@app/util/src/crypto";
import { extendType, objectType, stringArg } from "@nexus/schema";

export const Token = objectType({
  name: 'Token',
  definition(t) {
    t.string('accessToken')
    t.string('userId')
    t.list.string('roles')
  },
})

export const Queries = extendType({
  type: "Query",
  definition(t) {
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
  }
})