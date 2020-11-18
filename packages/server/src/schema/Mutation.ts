import { inputObjectType, mutationType, stringArg } from "@nexus/schema";
import { hash } from "@app/util/src/crypto";
import { ValidationError } from 'apollo-server-express'
import fs from "fs";
import path from "path";
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

    t.field('errorLog', {
      type: 'Empty',
      args: {
        message: stringArg({ required: true })
      },
      resolve: async (_root, args, ctx) => {
        let messageParsed;
        try {
          messageParsed = JSON.parse(args.message);
        } catch (e) {
          throw new ValidationError("Message is not JSON")
        }
        const message = {
          time: (new Date()).toISOString(),
          ip: ctx.req.headers['x-forwarded-for'] || ctx.req.headers['x-real-ip'] || ctx.req.ip,
          userId: ctx.req.user?.id,
          operationName: messageParsed?.operationName,
          body: messageParsed,
        }
        // if (!ctx.user.id) {
        //   throw new ForbiddenError(`Forbidden: Cannot post logs`);
        // }
        fs.appendFile(path.join(__dirname, '../../../../error.log'), JSON.stringify(message) + "\n", err => {
          if (err) throw err
        })
        return true
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