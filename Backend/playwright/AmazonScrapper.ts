import pw from 'playwright';
import ScrapperUtility from './ScrapperUtility';
import { Socket } from 'socket.io';
import { SOCKET_EVENTS, SOCKET_MESSAGES, SCREENSHOT_FILE_NAMES, LOCATORS, ERROR_MSG, LOGS, APP_URLS } from '../Utils/constants';

const {
    RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS,
} = SOCKET_EVENTS;

const {
    BROWSER_OPENING,
    BROWSER_OPENED,
    NAVIGATING_TO_AMZ_SITE,
    NAVIGATED_TO_AMZ_SITE,
    SEARCH_TXT_TYPING,
    NAVIGATING_TO_SEARCH_RESULTS,
    NAVIGATED_TO_SEARCH_RESULTS,
    STARTING_SCRAPING_PROCESS,
} = SOCKET_MESSAGES;

const {
    SEARCH_AMZ_INPUT,
    FIRST_SEARCH_RES,
    SEARCH_RESULTS_IDENTIFIER,
    PRODUCT_TITLE,
    PRODUCT_LINK,
    PRODUCT_PRICE,
} = LOCATORS;

const {
    DEBUG,
    AMZ_SEARCH_RESULT,
} = SCREENSHOT_FILE_NAMES;

const { UNKNOWN_ERROR_OCCURRED } = ERROR_MSG;

const { CLOSE_CONNECTIONS } = LOGS;
class AmazonScrapper {
    private amazonPage: pw.Page = null as unknown as pw.Page;
    constructor() {}

    private async setup() {
        const browser = await pw.firefox.launch();
        const context = await browser.newContext();
        this.amazonPage = await context.newPage();
    }

    private async getSearchResults(): Promise<ProductDetails[]> {
        const products: ProductDetails[] = [];
        
        const nameSelectors = await this.amazonPage.locator(PRODUCT_TITLE).all();
        const linkSelectors = await this.amazonPage.locator(PRODUCT_LINK).all();
        const priceSelectors = await this.amazonPage.locator(PRODUCT_PRICE).all();

        for (let [index, cell] of nameSelectors.entries()) {
            const name = await cell.innerText();
            const link = await linkSelectors[index].getAttribute('href');
            const absLink = link?.startsWith('http') ? link : link ? `${APP_URLS.AMAZON}${link}` : 'Not Available'
            const price = (await priceSelectors[index].innerText()).split('\n')?.[1]?.split(' ')?.[0];
            products.push({ name, link: absLink, price: price || 'Not Available' });
        }

        return products;
    }

    async navigateToSearchResults(searchText: string, websocket: Socket): Promise<ProductDetails[]> {
        try {
            if (this.amazonPage) {
                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, NAVIGATING_TO_AMZ_SITE);
                await this.amazonPage.goto(APP_URLS.AMAZON);
                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, NAVIGATED_TO_AMZ_SITE);

                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, SEARCH_TXT_TYPING);
                await this.amazonPage.getByPlaceholder(SEARCH_AMZ_INPUT).fill(searchText);
                
                const firstResult = this.amazonPage.locator(FIRST_SEARCH_RES);
                await firstResult.first().waitFor();
                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, NAVIGATING_TO_SEARCH_RESULTS);
                await firstResult.first().click();
                
                await this.amazonPage.getByText(SEARCH_RESULTS_IDENTIFIER).first().waitFor();
                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, NAVIGATED_TO_SEARCH_RESULTS);

                await ScrapperUtility.takeScreenshot(this.amazonPage, AMZ_SEARCH_RESULT);
                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, STARTING_SCRAPING_PROCESS);

                const products = await this.getSearchResults();

                return products;
            } else {
                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, BROWSER_OPENING);
                await this.setup();
                websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, BROWSER_OPENED);

                return await this.navigateToSearchResults(searchText, websocket);
            }
        } catch (e: any) {
            await ScrapperUtility.takeScreenshot(this.amazonPage, DEBUG());

            websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, `${e.message || UNKNOWN_ERROR_OCCURRED} 🔴❗`);
            websocket.emit(RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS, CLOSE_CONNECTIONS);

            await this.amazonPage.close();
            websocket.disconnect();

            throw e;
        }
    }
}

export default AmazonScrapper