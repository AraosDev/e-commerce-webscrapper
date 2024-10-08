import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handleScrapDataSession from './websockets/scrapOrderDetails';
import { PORT, LOGS, SOCKET_URLS, SOCKET_EVENTS } from './Utils/constants';
import handleSearchProductsSession from './websockets/searchProducts';

const app: Express = express();

const httpServer = createServer(app);
httpServer.listen(PORT, () => {
    console.log(LOGS.LISTENING_TO_PORT);
});

const io = new Server(httpServer, { cors: { origin: 'http://localhost:3000' } });

io
    .of(SOCKET_URLS.ORDER_HISTORY_URL)
    .on(SOCKET_EVENTS.CONNECTION, handleScrapDataSession)
    .on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log(LOGS.CLOSE_CONNECTIONS);
    });

io
    .of(SOCKET_URLS.SEARCH_PRODUCTS_URL)
    .on(SOCKET_EVENTS.CONNECTION, handleSearchProductsSession)
    .on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log(LOGS.CLOSE_CONNECTIONS);
    });


process.on('SIGTERM', () => {
    console.log(LOGS.CLOSE_CONNECTIONS);
    io.of(SOCKET_URLS.ORDER_HISTORY_URL).disconnectSockets(true);
    httpServer.closeAllConnections();
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log(LOGS.CLOSE_CONNECTIONS);
    io.of(SOCKET_URLS.ORDER_HISTORY_URL).disconnectSockets(true);
    httpServer.closeAllConnections();
    process.exit(1);
});