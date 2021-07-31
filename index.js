import { promises } from 'fs';
import { startBrowser, openPage } from './browser.js';
import { getParams } from './utils/index.js';

const { writeFile, mkdir, stat } = promises;

const main = async () => {
    let browser = null;

    try {
        await stat('results').catch(() => mkdir('results'));

        const { URL, parser, resultFilename, enableRepl, headless, screenshot, blockedResources } = await getParams();
        browser = await startBrowser({ headless });

        const page = await openPage(browser, URL, { blockedResources });

        if (screenshot)
            await page.screenshot({
                path: `results/${resultFilename.replace('.json', '.png')}`,
                fullPage: true,
            });

        if (enableRepl) {
            await page.repl();
            await browser.repl();
        }

        const data = await page.evaluate(parser);
        await writeFile(`results/${resultFilename}`, JSON.stringify(data, null, 3));
    } catch (error) {
        console.log(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};

main();
