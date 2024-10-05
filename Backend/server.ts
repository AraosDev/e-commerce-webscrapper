import dotenv from 'dotenv';
import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handleLoginSession from './websockets/loginSocket';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

const httpServer = createServer(app);
httpServer.listen(PORT, () => {
    console.log('Listening on Port: ' + PORT);
});

const io = new Server(httpServer, { cors: { origin: 'http://localhost:3001' } });

io
    .of('api/scrapper/amz')
    .on('connection', handleLoginSession)
    .on('disconnect', () => {
        console.log('Closing the connections...');
    });

process.on('SIGTERM', () => {
    console.log('Closing the connections...');
    io.of('api/scrapper/amz').disconnectSockets(true);
    httpServer.closeAllConnections();
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('Closing the connections...');
    io.of('api/scrapper/amz').disconnectSockets(true);
    httpServer.closeAllConnections();
    process.exit(1);
});