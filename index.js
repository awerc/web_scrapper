import { promises } from 'fs';
import chalk from 'chalk';

import { startBrowser, openPage } from './browser.js';

const { writeFile } = promises;
const log = console.log;

const main = async () => {
    let file = process.argv[2];
    if (!file) {
        log(`
${chalk.red('specify filename from ./parsers dir')}
${chalk.red('for example')} ${chalk.black.bgWhite('yarn start -- noita_perks')}
`);
        process.exit();
    }
    if (!/.+\.js/.test(file)) {
        file += '.js';
    }
    const { URL, parser } = await import(`./parsers/${file}`);

    const browser = await startBrowser();

    const page = await openPage(browser, URL);
    // await page.screenshot({ path: 'test.png' });

    let data = await page.evaluate(parser);

    await writeFile('result.json', JSON.stringify(data, null, 3));

    await browser.close();
};

main();
