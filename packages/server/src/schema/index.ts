import {
  // connectionPlugin,
  fieldAuthorizePlugin,
  makeSchema,
  nullabilityGuardPlugin,
  queryComplexityPlugin,
} from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as path from 'path'
import * as Mutation from './Mutation'
import * as Post from './Post'
import * as Query from './Query'
import * as Empty from './Empty'
import * as Tag from './Tag'
import * as User from './User'
import * as Token from './Token'
import * as Email from './Email'
import * as Password from './Password'

const DEBUGGING_CURSOR = false
let fn = DEBUGGING_CURSOR ? (i: string) => i : undefined

export default makeSchema({
  types: [Query, Mutation, Empty, Post, User, Token, Email, Password, Tag],
  outputs: {
    // typegen: path.join(__dirname, '../typegen.gen.ts'),
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts',
    ),
    schema: path.join(__dirname, '../../schema.graphql'),
  },
  plugins: [
    nexusPrisma({ experimentalCRUD: true }),
    // connectionPlugin({
    //   encodeCursor: fn,
    //   decodeCursor: fn,
    // }),
    queryComplexityPlugin(),
    fieldAuthorizePlugin(),
    nullabilityGuardPlugin({
      shouldGuard: true,
      fallbackValues: {
        Int: () => -1,
        DateTime: () => new Date(0),
        Boolean: () => false,
        String: () => '',
        Email: () => '',
        Password: () => '',
        Empty: () => null,
      },
    }),
  ],
  // prettierConfig: require.resolve('../../../.prettierrc'),
  // features: {
  //   abstractTypeStrategies: {
  //     __typename: true,
  //     resolveType: true,
  //   },
  // },
})
