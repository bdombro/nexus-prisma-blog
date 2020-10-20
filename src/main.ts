import { GraphQLServer } from 'graphql-yoga'
import expressJwt from 'express-jwt';
import schema from './schema'
import { createContext } from './context'

const server = new GraphQLServer({
  // @ts-ignore yoga schema sillyness
  schema,
  context: createContext,
})

server.express.use(expressJwt({ secret: "supersecret", algorithms: ['HS256'], credentialsRequired: false }));

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`))
