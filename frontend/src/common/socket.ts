import { io } from 'socket.io-client';
import { SOCKET_URLS } from './constants';

const scrapOrdersSocket = io(
    SOCKET_URLS.ORDER_HISTORY_URL,
    { forceNew: true, autoConnect: false }
);

export default scrapOrdersSocket;