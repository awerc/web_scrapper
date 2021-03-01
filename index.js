import { promises } from 'fs';

import { startBrowser, openPage } from './browser.js';
import { URL, parser } from './parsers/noita_perks.js';

const { writeFile } = promises;

const main = async () => {
    const browser = await startBrowser();

    const page = await openPage(browser, URL);
    await page.screenshot({ path: 'test.png' });

    let data = await page.evaluate(parser);

    await writeFile('result.json', JSON.stringify(data, null, 3));

    await browser.close();
};

main();
