import { hash } from "@app/util/src/crypto";
import { extendType, inputObjectType, objectType } from "@nexus/schema";
import { UserRole } from '@prisma/client'
import { ValidationError } from "apollo-server-express";
import auth from '../lib/field-authorize-plugin-helpers'

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

export const Queries = extendType({
  type: "Query",
  definition(t) {
    t.crud.user()
    t.crud.users({ filtering: true, ordering: true, pagination: true })
  }
})

export const Mutations = extendType({
  type: "Mutation",
  definition(t) {
    // t.crud.createOneUser()
    t.field('createOneUser', {
      type: 'User',
      args: { data: RegisterInputType.asArg({required: true}) },
      resolve: async (_root, args, ctx) => {
        const passwordHash = await hash(args.data.password!)
        const res = await ctx.prisma.user.create({data: {...args.data, roles: ['AUTHOR'], password: passwordHash}})
          .catch((e: Error) => {
            if (e.message.includes('Unique constraint failed on the fields'))
              throw new ValidationError('Email is already registered')
            throw e
          })
        return res
      },
    })
    t.crud.updateOneUser()
    t.crud.deleteOneUser()
  }
})

export const RegisterInputType = inputObjectType({
  name: 'RegisterInputType',
  definition(t) {
    t.string('name', { required: true })
    t.email('email', { required: true })
    t.password('password', { required: true })
  },
})