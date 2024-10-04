import pw from 'playwright';
import ScrapperUtility from './ScrapperUtility';

class AmazonLogin {
    constructor(private userName: string, private password: string) { }

    async navigateToLogin() {
        const browser = await pw.chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.amazon.in/');
        await ScrapperUtility.takeScreenshot(page, 'AmazonHome');
    }
}

export default AmazonLogin;