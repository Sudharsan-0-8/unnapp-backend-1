const http = require('http');
const express = require('express');
const { Server: ServerSocket } = require('socket.io');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const { typeDefs } = require('./schema/typedefs.js');
const { resolvers } = require('./schema/resolvers.js');

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const io = new ServerSocket(httpServer , { 
    cors: {
        origin: ['http://localhost:3000'],
    }
 });
const PORT = 3010;

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.start().then( () => apolloServer.applyMiddleware({ app }) );

app.get('/test', (req , res) => {
    res.send('test');
})

io.on('connection' , (socket) => console.log(socket.id) );

app.listen({ port: PORT } , () => console.log(`server running at port: ${PORT}`));