import { Socket } from "socket.io";
import catchWebSocketAsync from "../Utils/socketErrorHandler";
import EcommerceScrapper from "../playwright/EcommerceScrapper";
import { SOCKET_EVENTS, LOGS, SOCKET_MESSAGES } from '../Utils/constants';

function handleScrapDataSession(websocket: Socket) {
    const Scrapper = new EcommerceScrapper();
    websocket.on(SOCKET_EVENTS.LOGIN_TO_DASHBOARD, catchWebSocketAsync(async (message: LoginRequest, ack: Function) => {
        const { userName, password } = message;
        await Scrapper.loginToDashboard(userName, password, websocket);
        console.log(LOGS.DASHBOARD_NAVIGATED);
        ack({ message: SOCKET_MESSAGES.NAVIGATED_ECOMMERCE_DASHBOARD });
    }, websocket));

    websocket.on(SOCKET_EVENTS.SCRAP_ORDER_HISTORY, catchWebSocketAsync(async (_message: unknown, ack: Function) => {
        const productDetails = await Scrapper.scrapOrderHistory(websocket);
        console.log(JSON.stringify({ scrapped: productDetails }));
        ack({ data: productDetails });
    }, websocket));
}

export default handleScrapDataSession;