import { Socket } from "socket.io";
import catchWebSocketAsync from "../Utils/socketErrorHandler";
import AmazonLogin from "../playwright/AmazonLogin";
import { LoginRequest } from "../@types/websockets/loginSocket";

function handleLoginSession(websocket: Socket) {
    websocket.on('amzLoginScrapper', catchWebSocketAsync(async (message: LoginRequest, callback: Function) => {
        const { userName, password } = message;
        const amazonLogin = new AmazonLogin(userName, password);
        await amazonLogin.navigateToLogin();
        callback('Navigated to Amazon login');
    }, websocket));
}

export default handleLoginSession;