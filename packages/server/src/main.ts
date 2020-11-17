import { GraphQLServer } from 'graphql-yoga'
import { jwtMiddleware } from "./lib/crypto"
import schema from './schema'
import { createContext } from './context'

const server = new GraphQLServer({
  // @ts-ignore yoga schema sillyness
  schema,
  context: createContext,
})

server.express.use(jwtMiddleware);

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`))
