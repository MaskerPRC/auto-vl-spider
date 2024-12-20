const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
    await page.goto('https://www.macbl.com/app/top/all', { waitUntil: 'networkidle2' });

    const html = await page.content();
    const $ = cheerio.load(html);

    const data = [];

    const configs = {
        "总排行": {
            summary: "MacBL.com 网站应用总排行",
            cssSelectors: [
                { content: ".top50-col:nth-child(2) li:nth-child(1) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(1) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(2) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(2) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(3) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(3) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(4) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(4) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(5) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(5) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(6) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(6) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(7) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(7) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(8) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(8) .name" }
            ]
        },
        "月排行": {
            summary: "MacBL.com 网站应用月排行",
            cssSelectors: [
                { content: ".top50-col:nth-child(2) li:nth-child(2) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(2) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(3) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(3) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(6) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(6) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(5) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(5) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(7) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(7) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(10) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(10) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(11) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(11) .name" },
                { content: ".top50-col:nth-child(2) li:nth-child(8) .desc", source: ".copyright", title: ".top50-col:nth-child(2) li:nth-child(8) .name" }
            ]
        }
    };

    for (const group in configs) {
        const { cssSelectors } = configs[group];
        cssSelectors.forEach(sel => {
            const title = $(sel.title).first().text().trim();
            const content = $(sel.content).first().text().trim();
            const source = $(sel.source).first().text().trim();
            if (content) {
                data.push({ title, summary: content, source });
            }
        });
    }

    console.log(data);
    await browser.close();
})();
