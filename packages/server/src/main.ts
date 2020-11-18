import { PrismaClient } from "@prisma/client"
import { ApolloServer } from 'apollo-server-express'
import compression from "compression"
import express from "express"
import { separateOperations } from 'graphql'
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity'
import morgan from "morgan"
import sirv from "sirv"
import { jwtMiddleware } from "@app/util/src/crypto"
import schema from './schema'

const { PORT = 4000, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

const prisma = new PrismaClient()

const apolloServer = new ApolloServer({
  schema,
  context: (ctx) => {
    const user = ctx.req.user ?? { id: "", roles: [] }
    return { ...ctx, prisma, user }
  },
  plugins: [
    {
      requestDidStart: () => ({
        didResolveOperation({ request, document }) {
          const complexity = getComplexity({
            schema,
            // To calculate query complexity properly,
            // we have to check if the document contains multiple operations
            // and eventually extract it operation from the whole query document.
            query: request.operationName ? separateOperations(document)[request.operationName] : document,
            // The variables for our GraphQL query
            variables: request.variables,
            // Add any number of estimators. The estimators are invoked in order, the first
            // numeric value that is being returned by an estimator is used as the field complexity.
            // If no estimator returns a value, an exception is raised.
            estimators: [
              fieldExtensionsEstimator(),
              // Add more estimators here...
              // This will assign each field a complexity of 1
              // if no other estimator returned a value.
              simpleEstimator({ defaultComplexity: 1 }),
            ],
          })
          // Here we can react to the calculated complexity,
          // like compare it with max and throw error when the threshold is reached.
          if (complexity >= 100) {
            throw new Error(
              `Sorry, too complicated query! ${complexity} is over 100 that is the max allowed complexity.`
            )
          }
          // And here we can e.g. subtract the complexity point from hourly API calls limit.
          // console.log('Used query complexity points:', complexity)
        },
      }),
    },
  ],
})


const app = express();
app.use(jwtMiddleware);
app.use(compression())
app.use(morgan((tokens, req, res) => {
  let body = req.body
  if (body?.variables?.password)
    body = {...body, variables: {...body.variables, password: 'redacted'}}
  return [
    tokens.date(req, res, 'iso'),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length')+'b',
    tokens['response-time'](req, res)+'ms',
    JSON.stringify(body),
  ].join(' ')
}))
apolloServer.applyMiddleware({ app });
app.use(sirv("../client/build", { dev, etag: true, maxAge: 10*60*1000, immutable: true, single: true }))

const server = app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));

// server
//   .on("error", (e) => {
//     // @ts-ignore: ts doesn't know of code attribute
//     if (e.code === "EADDRINUSE")
//       console.log("Address in use :-(")
//     else
//       console.log("Unknown express error!")
//     server.close()
//   })
//   .on("close", () => console.log("Http server closed."))


// function handleExit(signal: string) {
//   if (dev) return
//   console.log(`Received exit signal ${signal}`);
//   server.close()
//   // Force exit if express doesn't close in a reasonable amount of time.
//   setTimeout(() => process.exit(1), 60000);
// }
// if (!dev) {
//   process.on('exit', handleExit);
//   process.on('SIGINT', handleExit);
//   process.on('SIGTERM', handleExit);
// }

// TODO: Logging - checkout dombro-apollo-stack and the nexus docs
// TODO: Serve static files from @app/client/build
// TODO: Upgrade the seed.js to use faker like the homepoint demo
// TODO: Images
// TODO: Internationalization - maybe https://enappd.com/blog/how-to-translate-in-ionic-internationalization-and-localization/143/
