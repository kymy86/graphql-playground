const {GraphQLServer} = require('graphql-yoga')
const {Prisma} = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
}

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: './generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/public-spangleantler-415/graph-node/dev',
            secret: 'prismasecret123',
            debug: true
        })
    })
})

server.start(()=> console.log('Server is running on port 4000'))