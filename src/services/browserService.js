import puppeteer from 'puppeteer';

import config from '../config/index';

export default async (clientRequest) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (interceptedReq) => {
        const expensiveResources = ['image', 'stylesheet', 'font'];
        return expensiveResources.includes(interceptedReq.resourceType()) ?
        interceptedReq.abort() :
        interceptedReq.continue();
    });
    await page.goto(config.homeUrl);
    await page.waitForSelector(config.inputSelector);
    await page.waitFor(config.browserWaitTime);
    await page.type(config.inputSelector, clientRequest);
    await page.type(config.inputSelector, String.fromCharCode(13));
    let response = await page.waitForResponse(res =>
        res.url().includes(config.resUrlFormat) &&
        res.status() === 200 &&
        parseInt(res.headers()['content-length'], 10) > 0
    );
    response = await response.json();
    await browser.close();
    return response;
}
