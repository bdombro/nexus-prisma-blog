import * as NexusSchema from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as path from 'path'
import * as Mutation from './Mutation'
import * as Post from './Post'
import * as Query from './Query'
import * as Tag from './Tag'
import * as User from './User'
import * as Token from './Token'

export default NexusSchema.makeSchema({
  types: [Query, Mutation, Post, User, Token, Tag],
  plugins: [
    nexusPrisma({ experimentalCRUD: true }),
    NexusSchema.fieldAuthorizePlugin(),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '.prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
})
