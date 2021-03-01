import puppeteer from 'puppeteer';

const startBrowser = async (options = {}) => {
    let browser;
    const { headless = true } = options;
    try {
        console.log('Opening the browser......');
        browser = await puppeteer.launch({
            headless,
            ignoreHTTPSErrors: true,
        });
    } catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }
    return browser;
};

const openPage = async (browser, url, options = {}) => {
    const page = await browser.newPage();
    const { width = 1920, height = 1080 } = options;
    await page.setViewport({ width, height });

    const { ignoreImages = true, ignoreStyles = true } = options;
    await page.setRequestInterception(ignoreImages || ignoreStyles);

    page.on('request', (req) => {
        if (ignoreImages && req.resourceType() === 'image') {
            req.abort();
            return;
        }
        if (ignoreStyles && (req.resourceType() === 'stylesheet' || req.resourceType() === 'font')) {
            req.abort();
            return;
        }

        req.continue();
    });

    await page.goto(url);

    return page;
};

export { startBrowser, openPage };
