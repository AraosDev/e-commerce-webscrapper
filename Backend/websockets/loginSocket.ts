import { Socket } from "socket.io";
import catchWebSocketAsync from "../Utils/socketErrorHandler";
import EcommerceScrapper from "../playwright/EcommerceScrapper";

function handleLoginSession(websocket: Socket) {
    websocket.on('loginToDashboard', catchWebSocketAsync(async (message: LoginRequest, ack: Function) => {
        const { userName, password } = message;
        await EcommerceScrapper.loginToDashboard(userName, password, websocket);
        console.log('Navigated to dashboard✨');
        ack({ message: 'Navigated to Ecommerce dashboard!🎉' });
    }, websocket));

    websocket.on('scrapOrderHistory', catchWebSocketAsync(async (_message: unknown, ack: Function) => {
        const productDetails = await EcommerceScrapper.scrapOrderHistory(websocket);
        console.log(JSON.stringify({ scrapped: productDetails }));
        ack({ data: productDetails });
    }, websocket));
}

export default handleLoginSession;