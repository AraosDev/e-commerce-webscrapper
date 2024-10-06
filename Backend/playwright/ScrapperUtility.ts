import pw from 'playwright';
class ScrapperUtility {
    constructor() { }

    async takeScreenshot(page: pw.Page, pageName: string) {
        console.log('Taking Screenshot in ' + pageName + '📸');
        await page.screenshot({ fullPage: true, path: `./screenshots/${pageName}.png` });
    }
}

export default new ScrapperUtility();