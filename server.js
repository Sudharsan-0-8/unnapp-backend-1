const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./schema/typedefs.js');
const { resolvers } = require('./schema/resolvers.js');

const app = express();
const PORT = 3010;

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.start().then( ()=> apolloServer.applyMiddleware({ app }))

app.get('/test', (req , res) => {
    res.send('test');
})

app.listen({ port: PORT } , () => console.log(`server running at port: ${PORT}`));