require('dotenv').config();
const OpenAI = require('openai');
const codeTpl = `
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
    await page.goto('https://www.macbl.com/app/top/all', { waitUntil: 'networkidle2' });

    // 获取页面内容
    const html = await page.content();

    // 使用 Cheerio 加载 HTML
    const $ = cheerio.load(html);

    const data = [];

    // TODO 根据以下网站关键信息内容css选择器来完成爬虫代码，summary表示某个信息集合的介绍；cssSelectors中的content表示信息的内容选择器，source表示此信息来源平台选择器，title表示此信息标题的选择器
    /**
     【有效的css选择器】
     {
     "总排行": {
     "summary": "MacBL.com 网站应用总排行",
     "cssSelectors": [
     {
     "content": ".top50-col:nth-child(2) li:nth-child(1) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(1) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(2) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(2) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(3) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(3) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(4) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(4) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(5) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(5) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(6) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(6) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(7) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(7) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(8) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(8) .name"
     }
     ]
     },
     "月排行": {
     "summary": "MacBL.com 网站应用月排行",
     "cssSelectors": [
     {
     "content": ".top50-col:nth-child(2) li:nth-child(2) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(2) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(3) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(3) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(6) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(6) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(5) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(5) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(7) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(7) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(10) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(10) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(11) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(11) .name"
     },
     {
     "content": ".top50-col:nth-child(2) li:nth-child(8) .desc",
     "source": ".copyright",
     "title": ".top50-col:nth-child(2) li:nth-child(8) .name"
     }
     ]
     }
     }
     【参考伪代码】
     使用此方式获取选择器文本内容
     let title = $('.title_css_selector');
     let content = $('.content_css_selector');
     let source = $('.source_css_selector');
     if (content.length > 0) {
     const title_text = title.first().text().trim();
     const content_text = content.first().text().trim();
     const source_text = source.first().text().trim();
     // 根据需要调整摘要和时间的提取方式
     data.push({
     title: title_text,
     summary: content_text,
     source: source_text,
     });
     }
     **/

    // 输出提取的数据
    console.log(data);

    // 关闭浏览器
    await browser.close();
})();

`

const genCrawlerCode = async function (prompt) {
    console.log(prompt);
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
        model: 'openai/o1',
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: prompt,
                    }
                ]
            }
        ]
    });

    function extractCodeBlocks(markdownText) {
        const codeBlockRegex = /```.*?\n([\s\S]*?)```/g;
        let match;
        let codeBlocks = '';

        while ((match = codeBlockRegex.exec(markdownText)) !== null) {
            codeBlocks += match[1] + '\n\n';
        }

        return codeBlocks.trim();
    }

    console.log(completion.choices[0]?.message.content);
    let code = extractCodeBlocks(completion.choices[0]?.message.content)

    return code;
}

const o1_prompt = "请思考并完成以下代码的TODO任务，要求只返回代码文本，不要包含其他内容\n【要求】代码尽量精简，在满足完整的情况下，避免太多重复的逻辑\n【代码模板】\n" + codeTpl;
genCrawlerCode(o1_prompt)
