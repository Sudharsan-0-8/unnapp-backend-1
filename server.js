const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const { typeDefs } = require('./schema/typedefs.js');
const { resolvers } = require('./schema/resolvers.js');

// express
const app = express();
app.use(cors());
//http server
const httpServer = http.createServer(app);

//socket server
const io = require('socket.io')(
    httpServer , { 
        cors: {
            methods: ['GET', 'POST'],
            origin: ['http://localhost:4010'],
        }
    }
)
const PORT = 3010;

//apollo server
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.start().then( () => apolloServer.applyMiddleware({ app }) );

// express-socket
app.set('socketio' , io);

// express server routes
app.get('/test', (req , res) => {
    console.log(req.body);
    res.send('test' );
})

io.on('connection' , (socket) => console.log(socket.id) );

httpServer.listen({ port: PORT } , () => console.log(`server running at port: ${PORT}`));