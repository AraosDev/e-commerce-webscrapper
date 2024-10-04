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
    .on('connection', handleLoginSession);