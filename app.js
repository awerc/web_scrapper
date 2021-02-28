import puppeteer from 'puppeteer';
import { promises } from 'fs';

import {URL, parser} from './parsers/noita_perks.js';

const  {writeFile} = promises;

const main = async () => {
    console.time('start')

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if(req.resourceType() === 'image'){
            req.abort();
            return
        }
        if(req.resourceType() === 'stylesheet' || req.resourceType() === 'font'){
            req.abort();
            return
        }

        req.continue();
    });

    await page.goto(URL);
    // await page.screenshot({ path: 'test.png' });

    console.timeEnd('start')

    // ================================================

    console.time('evaluate')
    let data = await page.evaluate(parser);
    console.timeEnd('evaluate')

    // ================================================

    console.time('write')
    await writeFile('result.json', JSON.stringify(data, null, 3));
    console.timeEnd('write')

    // ================================================

    await browser.close();
};

main();
