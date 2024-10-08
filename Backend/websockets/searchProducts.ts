import { Socket } from "socket.io";
import catchWebSocketAsync from "../Utils/socketErrorHandler";
import { SOCKET_EVENTS, LOGS, SOCKET_MESSAGES } from '../Utils/constants';
import AmazonScrapper from "../playwright/AmazonScrapper";

function handleSearchProductsSession(websocket: Socket) {
    const Scrapper = new AmazonScrapper();
    websocket.on(SOCKET_EVENTS.NAVIGATE_TO_SEARCH_PAGE, catchWebSocketAsync(async (seachText: string, ack: Function) => {
        const products = await Scrapper.navigateToSearchResults(seachText, websocket);
        console.log(LOGS.SEARCH_RESULTS_FETCHED);
        console.log(JSON.stringify(products));
        ack({ data: products });
    }, websocket));
}

export default handleSearchProductsSession;