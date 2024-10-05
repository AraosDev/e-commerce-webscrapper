import pw from 'playwright';
import ScrapperUtility from './ScrapperUtility';

class AmazonLogin {
    private amazonPage: pw.Page = null as unknown as pw.Page;
    constructor() { }

    async navigateToHome() {
        const browser = await pw.chromium.launch();
        const context = await browser.newContext();
        this.amazonPage = await context.newPage();
        await this.amazonPage.goto('https://www.amazon.in/');
        await ScrapperUtility.takeScreenshot(this.amazonPage, 'AmazonHome');
    }

    async navigateToLogin() {
        if (this.amazonPage) {
            await this.amazonPage.locator('xpath=//*[@id="nav-hamburger-menu"]')?.click();
            const isSignInButtonPresent = await this.amazonPage.isVisible('xpath=//*[@id="hmenu-content"]/ul[1]/li[31]/a');
            if (isSignInButtonPresent) {
                await this.amazonPage.locator('xpath=//*[@id="hmenu-content"]/ul[1]/li[31]/a')?.click();
                await this.amazonPage.getByRole('heading', { level: 1, name: 'Sign in' }).waitFor();
                await ScrapperUtility.takeScreenshot(this.amazonPage, 'LoginPage');
            } else {
                throw new Error('Cannot find Sign in Button');
            }
        }
    }
}

export default new AmazonLogin();