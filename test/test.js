const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
    // 启动 Puppeteer 浏览器
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 导航到目标 URL
    await page.goto('https://edition.cnn.com/', { waitUntil: 'networkidle2' });

    // 获取页面内容
    const html = await page.content();

    // 使用 Cheerio 加载 HTML
    const $ = cheerio.load(html);

    const data = [];

    // 提取第 1 个元素
    const element0 = $('.container_lead-package__title_url-text');
    if (element0.length > 0) {
        const title = element0.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "Ruling party lawmakers boycotted the vote to impeach",
            time: "undefined"
        });
    }

    // 提取第 2 个元素
    const element1 = $('.container__link--type-live-story .container__headline-text');
    if (element1.length > 0) {
        const title = element1.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "What the Syrian rebellion could mean for the balance of",
            time: "undefined"
        });
    }

    // 提取第 3 个元素
    const element2 = $('.container:nth-child(2) > .container_lead-package__cards-wrapper .card:nth-child(2) .container__headline-text');
    if (element2.length > 0) {
        const title = element2.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "Why finding the suspected CEO killer is harder than",
            time: "undefined"
        });
    }

    // 提取第 4 个元素
    const element3 = $('.container_list-headlines-with-images__cards-wrapper:nth-child(3) .card:nth-child(1) .container__headline-text');
    if (element3.length > 0) {
        const title = element3.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "A new $120,000 way to sail the",
            time: "undefined"
        });
    }

    // 提取第 5 个元素
    const element4 = $('.container_list-headlines-with-images__cards-wrapper:nth-child(3) .card:nth-child(2) .container__headline-text');
    if (element4.length > 0) {
        const title = element4.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "The mysterious, mathematical origins of the",
            time: "undefined"
        });
    }

    // 提取第 6 个元素
    const element5 = $('.container_list-headlines-with-images__cards-wrapper:nth-child(3) .card:nth-child(3) .container__headline-text');
    if (element5.length > 0) {
        const title = element5.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "Scientists find huge trove of rare",
            time: "undefined"
        });
    }

    // 提取第 7 个元素
    const element6 = $('.zone__items:nth-child(1) .container_lead-plus-headlines__cards-wrapper:nth-child(4) .card:nth-child(1) .container__headline-text:nth-child(1)');
    if (element6.length > 0) {
        const title = element6.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "Trump's arrival in Paris for Notre Dame's",
            time: "undefined"
        });
    }

    // 提取第 8 个元素
    const element7 = $('.container__link--type-card .container__headline-text');
    if (element7.length > 0) {
        const title = element7.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "A Philadelphia teacher was found dead",
            time: "undefined"
        });
    }

    // 输出提取的数据
    console.log(data);

    // 关闭浏览器
    await browser.close();
})();
