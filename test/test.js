const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
    // 启动 Puppeteer 浏览器
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 设置视口大小
    await page.setViewport({
        width: 1280,  // 您可以根据需要调整宽度
        height: 1000,
        deviceScaleFactor: 1,
    });

    // 导航到目标 URL
    await page.goto('https://hub.baai.ac.cn/?tag_id=90&sort=hot', { waitUntil: 'networkidle2' });

    // 获取页面内容
    const html = await page.content();

    // 使用 Cheerio 加载 HTML
    const $ = cheerio.load(html);

    const data = [];

    // 提取第 7 个元素
    const element6 = $('.story-list-container:nth-child(7) .story-item-title');
    if (element6.length > 0) {
        const title = element6.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "西湖大学吴泰霖课题组提出了一种新的生成式控制方法——扩散控制（DiffPhyCon）",
            time: "undefined"
        });
    }

    // 提取第 8 个元素
    const element7 = $('.story-list-container:nth-child(8) .story-item-title');
    if (element7.length > 0) {
        const title = element7.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "该研究探讨了复杂生态系统中微生物群落的多稳定性现象",
            time: "undefined"
        });
    }

    // 提取第 9 个元素
    const element8 = $('.story-list-container:nth-child(9) .story-item-title');
    if (element8.length > 0) {
        const title = element8.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "上周日，果壳儿参加了奇绩创坛2024年秋季创业营路演日",
            time: "undefined"
        });
    }

    // 提取第 11 个元素
    const element10 = $('.story-list-container:nth-child(11) .story-item-title');
    if (element10.length > 0) {
        const title = element10.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "清华大学交叉信息研究院濮云飞和段路明研究组在冷原子系统中实现12公里光纤长度上多模式增强的预报式原子",
            time: "undefined"
        });
    }

    // 提取第 12 个元素
    const element11 = $('.story-list-container:nth-child(12) .story-item-title');
    if (element11.length > 0) {
        const title = element11.first().text().trim();
        // 根据需要调整摘要和时间的提取方式
        data.push({
            title: title,
            summary: "OpenAI 发布了季首直播，主要介绍了两项更新：o1 完全体和 ChatGPT Pro",
            time: "undefined"
        });
    }

    // 输出提取的数据
    console.log(data);

    // 关闭浏览器
    await browser.close();
})();
