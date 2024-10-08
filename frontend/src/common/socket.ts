import { io } from 'socket.io-client';
import { SOCKET_URLS } from './constants';

export const scrapOrdersSocket = io(
    SOCKET_URLS.ORDER_HISTORY_URL,
    { forceNew: true, autoConnect: false }
);

export const searchProductsSocket = io(
    SOCKET_URLS.SEARCH_PRODUCTS_URL,
    { forceNew: true, autoConnect: false },
);