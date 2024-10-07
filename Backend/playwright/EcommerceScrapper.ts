import pw from 'playwright';
import ScrapperUtility from './ScrapperUtility';
import { Socket } from 'socket.io';
import { SOCKET_EVENTS, SOCKET_MESSAGES, SCREENSHOT_FILE_NAMES, LOCATORS, ERROR_MSG, LOGS, APP_URLS } from '../Utils/constants';

const { RECEIVE_UPDATES_FOR_LOGIN, RECEIVE_UPDATES_FOR_SCRAPPING } = SOCKET_EVENTS;

const {
    BROWSER_OPENING,
    BROWSER_OPENED,
    NAVIGATED_TO_SITE,
    NAVIGATING_TO_SITE,
    EMAIL_TYPING,
    PASSWORD_TYPING,
    NAVIGATING_ORDER_HISTORY,
    NAVIGATED_ORDER_HISTORY,
    STARTING_SCRAPING_PROCESS,
} = SOCKET_MESSAGES;

const {
    EMAIL_PLACEHOLDER,
    PASSWORD_PLACEHOLDER,
    ENTER_KEY,
    PRODUCT_DETAILS_LINK_XPATH,
    PRODUCT_DETAILS_IDENTIFIER,
    NAME_XPATH,
    PRICE_XPATH,
    BACK_BTN_XPATH,
    ORDER_HISTORY_IDENTIFIER,
    ORDERS_LIST_SELECTOR,
    ORDER_HISTORY_BTN,
    ORDER_HISTORY_TITLE,
    DASHBOARD_IDENTIFIER,
} = LOCATORS;

const { DASHBOARD, DEBUG, ORDER_HISTORY } = SCREENSHOT_FILE_NAMES;

const { UNKNOWN_ERROR_OCCURRED } = ERROR_MSG;

const { CLOSE_CONNECTIONS } = LOGS;
class EcommerceScrapper {
    private ecommercePage: pw.Page = null as unknown as pw.Page;
    constructor() { }

    async setup() {
        const browser = await pw.firefox.launch();
        const context = await browser.newContext();
        this.ecommercePage = await context.newPage();
    }

    async loginToDashboard(userName: string, password: string, websocket: Socket) {
        try {
            if (this.ecommercePage) {
                websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, NAVIGATING_TO_SITE);
                await this.ecommercePage.goto(APP_URLS.ECOMMERCE_PLAYGROUND);
                websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, NAVIGATED_TO_SITE);

                websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, EMAIL_TYPING);
                const emailInput = this.ecommercePage.getByPlaceholder(EMAIL_PLACEHOLDER);
                await emailInput.fill(userName);
                await this.ecommercePage.waitForTimeout(3000);

                websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, PASSWORD_TYPING);
                const passwordInput = this.ecommercePage.getByPlaceholder(PASSWORD_PLACEHOLDER);
                passwordInput.fill(password);
                await this.ecommercePage.waitForTimeout(3000);

                await this.ecommercePage.keyboard.press(ENTER_KEY);

                const dashboardIdentifier = this.ecommercePage.getByText(DASHBOARD_IDENTIFIER);
                await dashboardIdentifier.first().waitFor();

                await ScrapperUtility.takeScreenshot(this.ecommercePage, DASHBOARD);
            } else {
                websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, BROWSER_OPENING);
                await this.setup();
                websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, BROWSER_OPENED);

                await this.loginToDashboard(userName, password, websocket);
            }
        } catch (e: any) {
            await ScrapperUtility.takeScreenshot(this.ecommercePage, DEBUG());

            websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, `${e.message || UNKNOWN_ERROR_OCCURRED} 🔴❗`);
            websocket.emit(RECEIVE_UPDATES_FOR_LOGIN, CLOSE_CONNECTIONS);

            await this.ecommercePage.close();
            websocket.disconnect();

            throw e;
        }
    }
    private async iterateProduct(index: number) {
        const xpath = PRODUCT_DETAILS_LINK_XPATH(index);
        const productLocator = this.ecommercePage.locator(xpath);
        if (await productLocator.isVisible()) {
            await productLocator.click();
            const productDetailsLocator = this.ecommercePage.getByText(PRODUCT_DETAILS_IDENTIFIER);
            await productDetailsLocator.waitFor();
            return true;
        }

        return false;
    }

    private async appendProductDetails(productsArr: ProductDetails[]) {
        const name = await this.ecommercePage.locator(NAME_XPATH).innerText();
        const price = await this.ecommercePage.locator(PRICE_XPATH).innerText();
        productsArr.push({ name, price });
    }

    private async backToOrderHistory() {
        await this.ecommercePage.locator(BACK_BTN_XPATH).click();
        await this.ecommercePage.getByText(ORDER_HISTORY_IDENTIFIER).nth(1).waitFor();
    }

    private async getOrderDetails(): Promise<ProductDetails[]> {
        const productDetails: ProductDetails[] = []
        const orderSelector = await this.ecommercePage.locator(ORDERS_LIST_SELECTOR).all();
        const tenOrders = orderSelector.slice(0, 10);
        for (let [index, _cell] of tenOrders.entries()) {
            if (await this.iterateProduct(Number(index))) {
                await this.appendProductDetails(productDetails);
                await this.backToOrderHistory();
            } else {
                ScrapperUtility.takeScreenshot(this.ecommercePage, DEBUG());
                break;
            }
        }

        return productDetails;
    }

    async scrapOrderHistory(websocket: Socket): Promise<ProductDetails[]> {
        try {
            if (this.ecommercePage) {
                await this.ecommercePage.getByText(ORDER_HISTORY_BTN).first().click();
                websocket.emit(RECEIVE_UPDATES_FOR_SCRAPPING, NAVIGATING_ORDER_HISTORY);

                await this.ecommercePage.getByText(ORDER_HISTORY_TITLE).first().waitFor();
                await ScrapperUtility.takeScreenshot(this.ecommercePage, ORDER_HISTORY);
                websocket.emit(RECEIVE_UPDATES_FOR_SCRAPPING, NAVIGATED_ORDER_HISTORY);

                websocket.emit(RECEIVE_UPDATES_FOR_SCRAPPING, STARTING_SCRAPING_PROCESS);

                return await this.getOrderDetails();
            } else {
                await this.setup();
                return await this.scrapOrderHistory(websocket);
            }
        } catch (e: any) {
            await ScrapperUtility.takeScreenshot(this.ecommercePage, DEBUG());

            websocket.emit(RECEIVE_UPDATES_FOR_SCRAPPING, `${e.message || UNKNOWN_ERROR_OCCURRED} 🔴❗`);
            websocket.emit(RECEIVE_UPDATES_FOR_SCRAPPING, CLOSE_CONNECTIONS);

            await this.ecommercePage.close();
            websocket.disconnect();

            throw e;
        }
    }
}

export default EcommerceScrapper;