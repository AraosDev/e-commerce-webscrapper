import { Socket } from "socket.io";
import catchWebSocketAsync from "../Utils/socketErrorHandler";
import AmazonLogin from "../playwright/AmazonLogin";

function handleLoginSession(websocket: Socket) {
    websocket.on('crawlAmazonHome', catchWebSocketAsync(async (ack: Function) => {
        await AmazonLogin.navigateToHome();
        ack({ message: 'Navigated to Amazon Home' });
        websocket.emit('amazonLogin');
    }, websocket));

    websocket.on('amazonLogin', catchWebSocketAsync(async (ack: Function) => {
        ack({ message: 'Navigating to Amazon login page...' });
        await AmazonLogin.navigateToLogin()
        ack({ message: 'Navigated to Amazon login Page !' })
    }, websocket));
}

export default handleLoginSession;