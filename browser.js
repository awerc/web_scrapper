import puppeteer from 'puppeteer-extra';

import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import ResourcesBlockPlugin from 'puppeteer-extra-plugin-block-resources';
import ReplPlugin from 'puppeteer-extra-plugin-repl';
import { enchantPuppeteer } from 'enchant-puppeteer';

const blockResourcesPlugin = ResourcesBlockPlugin();

enchantPuppeteer();
puppeteer.use(ReplPlugin());
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
puppeteer.use(blockResourcesPlugin);

// TODO https://github.com/berstend/puppeteer-extra/tree/master/packages
const startBrowser = async (options = {}) => {
    let browser = null;
    const { headless = true } = options;
    try {
        console.log('Opening the browser......');
        browser = await puppeteer.launch({
            headless,
            ignoreHTTPSErrors: true,
        });
    } catch (error) {
        console.log('Could not create a browser instance => : ', error);
    }
    return browser;
};

const openPage = async (browser, url, options = {}) => {
    const { blockedResources = [] } = options;
    blockedResources.forEach((resource) => blockResourcesPlugin.blockedTypes.add(resource));

    const page = await browser.newPage();
    const { width = 1920, height = 1080 } = options;
    await page.setViewport({ width, height });

    await page.goto(url);

    return page;
};

export { startBrowser, openPage };
