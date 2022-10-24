const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const { typeDefs } = require('./schema/typedefs.js');
const { resolvers } = require('./schema/resolvers.js');

// express
const app = express();
app.use(cors());
app.use(express.json());
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
    res.send('test sucessfull!!');
});
app.post('/post-test', (req , res) => {
    console.log('post-test socketId: ' + req.body.socketId);
    const socketId = req.body.socketId;
    console.log(io.sockets);
    const senderSocket = io.sockets.sockets.get(socketId);
    senderSocket.emit('requestGot' , { message: "request reached" });
    res.send('post-test' );
});

io.on('connection' , (socket) => console.log(socket.id) );

httpServer.listen({ port: PORT } , () => console.log(`server running at port: ${PORT}`));