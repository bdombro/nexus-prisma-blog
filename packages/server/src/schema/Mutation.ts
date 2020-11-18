import { inputObjectType, mutationType } from "@nexus/schema";
import { hash } from "@app/util/src/crypto";
import { User } from "./User";

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser()
    t.crud.updateOneUser()
    t.crud.deleteOneUser()
    t.field('register', {
      type: 'User',
      args: {
        data: RegisterInputType.asArg({required: true})
      },
      resolve: async (_root, args, ctx) => {
        const passwordHash = await hash(args.data.password)
        const res = await ctx.prisma.user.create({data: {...args.data, roles: ['AUTHOR'], password: passwordHash}})
          .catch((e: Error) => {
            if (e.message.includes('Unique constraint failed on the fields'))
              throw new Error('Email is already registered')
            throw e
          })
        return res
      },
    })

    t.crud.createOnePost()
    t.crud.updateOnePost()
    t.crud.deleteOnePost()

    t.crud.createOneTag()
    t.crud.updateOneTag()
    t.crud.deleteOneTag()
  },
})

export const RegisterInputType = inputObjectType({
  name: 'RegisterInputType',
  definition(t) {
    t.string('name', { required: true })
    t.email('email', { required: true })
    t.password('password', { required: true })
  },
})