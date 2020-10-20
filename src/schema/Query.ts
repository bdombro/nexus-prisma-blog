import { intArg, queryType, stringArg } from '@nexus/schema'
import bcrypt from 'bcrypt';
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
      resolve(_root, args, ctx) {
        return ctx.prisma.user
          .findOne({
            where: {
              email: args.email,
            },
          })
          .then((result) => {
            if (result === null) {
              throw new Error(`Username or Password is invalid`)
            }
            if (!bcrypt.compareSync(args.password, result.password)) {
              throw new Error(`Username or Password is invalid`)
            }
            return {
              accessToken: jwt.sign({ id: result.id, roles: result.roles }, "supersecret", { expiresIn: '1d' }),
              userId: result.id,
              roles: result.roles,
            }
          })
      },
    })
  },
})
