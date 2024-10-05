import pw from 'playwright';
import ScrapperUtility from './ScrapperUtility';
import { Socket } from 'socket.io';

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
                websocket.emit('receiveUpdatesForLogin', 'Navigating to the site...🏄‍♂️');
                await this.ecommercePage.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
                websocket.emit('receiveUpdatesForLogin', 'Navigated to the site🎉');
                websocket.emit('receiveUpdatesForLogin', 'typing the email...👩‍💻');
                const emailInput = this.ecommercePage.getByPlaceholder('E-Mail Address');
                await emailInput.fill(userName);
                await this.ecommercePage.waitForTimeout(3000);
                websocket.emit('receiveUpdatesForLogin', 'typing the password...🧑‍💻');
                const passwordInput = this.ecommercePage.getByPlaceholder('Password');
                passwordInput.fill(password);
                await this.ecommercePage.waitForTimeout(3000);
                await this.ecommercePage.keyboard.press('Enter');
                const dashboardIdentifier = this.ecommercePage.getByText('Edit your account information');
                await dashboardIdentifier.first().waitFor();
                await ScrapperUtility.takeScreenshot(this.ecommercePage, 'Dashboard');
            } else {
                websocket.emit('receiveUpdatesForLogin', 'Setting things ready for you...⚒️');
                await this.setup();
                websocket.emit('receiveUpdatesForLogin', 'Setup is complete✅');
                await this.loginToDashboard(userName, password, websocket);
            }
        } catch (e: any) {
            await ScrapperUtility.takeScreenshot(this.ecommercePage, `Debug-${Date.now()}`);
            websocket.emit('receiveUpdatesForLogin', `${e.message || 'UNKNOWN_ERROR_OCCURRED'} 🔴❗`);
            websocket.emit('receiveUpdatesForLogin', `Closing the connection🕛`);
            await this.ecommercePage.close();
            websocket.disconnect();
            throw e;
        }
    }
    private async iterateProduct(index: number) {
        const xpath = `xpath=//*[@id="content"]/div[1]/table/tbody/tr[${index+1}]/td[7]/a`;
        const productLocator = this.ecommercePage.locator(xpath);
        if (await productLocator.isVisible()) {
            await productLocator.click();
            const productDetailsLocator = this.ecommercePage.getByText('Product Name')
            await productDetailsLocator.waitFor();
            return true;
        }

        return false;
    }

    private async appendProductDetails(productsArr: ProductDetails[]) {
        const nameXpath = `xpath=//*[@id="content"]/div[1]/table/tbody/tr/td[1]`;
        const priceXpath = `//*[@id="content"]/div[1]/table/tfoot/tr[5]/td[3]`;
        const name = await this.ecommercePage.locator(nameXpath).innerText();
        const price = await this.ecommercePage.locator(priceXpath).innerText();
        productsArr.push({ name, price });
    }

    private async backToOrderHistory() {
        const backButtonXpath = '//*[@id="content"]/div[2]/div/a';
        await this.ecommercePage.locator(backButtonXpath).click();
        await this.ecommercePage.getByText('Logout').nth(1).waitFor();
    }

    private async getOrderDetails(): Promise<ProductDetails[]> {
        const productDetails: ProductDetails[] = []
        const orderSelector = await this.ecommercePage.locator('#content > div.table-responsive > table > tbody > tr').all();
        const tenOrders = orderSelector.slice(0, 10);
        for (let [index, cell] of tenOrders.entries()) {
            if (await this.iterateProduct(Number(index))) {
                await this.appendProductDetails(productDetails);
                await this.backToOrderHistory();
            } else {
                ScrapperUtility.takeScreenshot(this.ecommercePage, 'debug-1');
                break;
            }
        }

        return productDetails;
    }

    async scrapOrderHistory(websocket: Socket): Promise<ProductDetails[]> {
        try {
            if (this.ecommercePage) {
                await this.ecommercePage.getByText('View your order history').first().click();
                websocket.emit('receiveUpdatesForScrapping', 'Navigating to order history...🏄‍♂️');
                await this.ecommercePage.getByText('Order History').first().waitFor();
                await ScrapperUtility.takeScreenshot(this.ecommercePage, 'OrderHistory');
                websocket.emit('receiveUpdatesForScrapping', 'Navigated to order history🚩');
                websocket.emit('receiveUpdatesForScrapping', 'Starting the scrapping process...📝');
                return await this.getOrderDetails();
            } else {
                await this.setup();
                return await this.scrapOrderHistory(websocket);
            }
        } catch (e: any) {
            await ScrapperUtility.takeScreenshot(this.ecommercePage, `Debug-${Date.now()}`);
            websocket.emit('receiveUpdatesForScrapping', `${e.message || 'UNKNOWN_ERROR_OCCURRED'} 🔴❗`);
            websocket.emit('receiveUpdatesForScrapping', `Closing the connection🕛`);
            await this.ecommercePage.close();
            websocket.disconnect();
            throw e;
        }
    }
}

export default new EcommerceScrapper();