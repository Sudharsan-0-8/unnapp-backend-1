const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const { typeDefs } = require('./schema/typedefs.js');
const { resolvers } = require('./schema/resolvers.js');
 
const app = express();
app.use(cors());
const httpServer = http.createServer(app);

const io = require('socket.io')(
    httpServer , { 
        cors: {
            methods: ['GET', 'POST'],
            origin: ['https://unnapp-frontend-1--3000.local.webcontainer.io'],
        }
    }
)
const PORT = 3010;

// const apolloServer = new ApolloServer({ typeDefs, resolvers });

// apolloServer.start().then( () => apolloServer.applyMiddleware({ app }) );

app.get('/test', (req , res) => {
    res.send('test');
})

io.on('connection' , (socket) => console.log(socket.id) );

httpServer.listen({ port: PORT } , () => console.log(`server running at port: ${PORT}`));