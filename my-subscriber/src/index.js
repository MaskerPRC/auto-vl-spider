// main.js
require('dotenv').config();
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer'); // 使用 Puppeteer 进行头部浏览
const axios = require('axios');
const OpenAI = require('openai');
const API_URL = "http://localhost:5000/api"

async function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('generate-crawler', async (event, url) => {
    try {
        // 使用 Puppeteer 打开网站
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, {waitUntil: 'networkidle2'});

        // 设置视口大小
        await page.setViewport({
            width: 1280,  // 您可以根据需要调整宽度
            height: 1000,
            deviceScaleFactor: 1,
        });

        await page.waitForNetworkIdle({
            idleTime: 4000
        })

        // 截图当前视口
        const screenshotBuffer = await page.screenshot({
            fullPage: false, // 不截取整个页面
            type: 'jpeg',            // 设置截图格式为 JPEG
            quality: 70,             // 设置图像质量（范围 0-100），数值越低文件越小
        });
        fs.writeFileSync('screenshot.png', screenshotBuffer);

        // 获取页面文本，仅限于前 1000 像素高度
        const pageText = await page.evaluate(() => {
            // 提取文本
            const text = document.body.innerHTML;
            return text.trim();
        });

        // 注入 @medv/finder 的打包脚本
        await page.addScriptTag({ path: path.resolve(__dirname, './finder.bundle.js') });


        // 调用 OpenAI 多模态接口处理图片和文本
        const openaiResponse = await processWithOpenAI('screenshot.png', pageText);

        // 解析 OpenAI 返回的信息，提取标题、摘要、时间等
        const parsedData = parseOpenAIResponse(
            openaiResponse
        );

        // 使用 @medv/finder 生成 div 的 CSS 选择器路径
        const cssSelectorInfo = await getDivPathsWithFinder(page, parsedData);

        // 生成爬虫代码
        const crawlerCode = generateCrawlerCode(url, parsedData, cssSelectorInfo);

        await browser.close();

        return crawlerCode;
    } catch (error) {
        console.error(error);
        return `发生错误: ${error.message}`;
    }
});


/**
 * 通过新的统一API端点调用AI处理服务
 * @param {object} agentlyRequest 请求参数对象
 * @param {number} retries 请求重试次数
 * @returns {Promise<object>} API响应数据
 */
async function callAIEndpoint(agentlyRequest, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.post(`${API_URL}/ai`, agentlyRequest);

            // 当data为空时触发重试
            if (!response.data) {
                continue;
            }

            return response.data;
        } catch (error) {
            if (attempt === retries - 1) {
                return null;
            }
        }
    }
}

async function transferJson(content, files) {
    const agentlyRequest = {
        general_type: "输出规定",
        instructions: "1. 输出必须为中文；2. 在JSON结构中，不得包含双引号（\"）字符。为保持格式正确，可用中文字符（“和”）替代。",
        role: {
            "姓名": "数据格式化专员",
            "任务": "擅长将多模态内容转化为结构化数据",
        },
        input: {
            "$question$": "将以下网站，新闻，文章，截图等及及对应ocr文本内容转化为结构化数据，不得改动原文内容",
            "$ocrtxt$": content,
            "$ask$": "主要根据截图参考新闻布局，了解ocr文本的二维布局信息；从ocr文本中摘出需要结构化输出的内容，请勿改动",
        },
        instruct: [
            "在满足{$ask$}的条件下，根据ocr文本内容{$ocrtxt$}，回复{$question$}提出的问题",
        ],
        outputType: "news",
        files: files,
        agent_pool_name: "google/gemini-pro-1.5"
    };
    return callAIEndpoint(agentlyRequest);
}

// 示例函数：调用 OpenAI 多模态接口
async function processWithOpenAI(imagePath, text) {
    function encodeImage(imagePath) {
        const imageData = fs.readFileSync(imagePath);
        return Buffer.from(imageData).toString('base64');
    }
    const base64Image = encodeImage(imagePath);

    const result = await transferJson(text, ["data:image/jpeg;base64,"+base64Image]);
    return result;
}

// 示例函数：解析 OpenAI 返回的数据
function parseOpenAIResponse(data) {
    // 根据 OpenAI 返回的数据结构进行解析
    // 这里假设返回的数据包含一个 items 数组，每个项包含 title, summary, time
    return data.structs;
}

// 使用 @medv/finder 生成 CSS 选择器路径
async function getDivPathsWithFinder(page, structs) {
    const divPaths = {}
    for (const struct of structs) {
        const items = struct.items;
        const struct_name = struct.struct_name;
        const summary = struct.summary;

        divPaths[struct_name] = {
            summary,
            cssSelectors: await page.evaluate((items) => {
                // 确保 Finder 已经注入并挂载到 window 对象上
                if (!window.Finder) {
                    console.error('Finder 未正确加载');
                    return items.map(() => null);
                }
                function findMinElementContainingText(text) {
                    function findElement(element) {
                        // 如果当前元素是文本节点，且包含目标文本
                        if (element.nodeType === Node.TEXT_NODE && element.textContent.includes(text)) {
                            return element.parentElement; // 返回包含文本的父元素
                        }

                        // 遍历该元素的所有子元素
                        for (let child of element.childNodes) {
                            const result = findElement(child);
                            if (result) {
                                return result;
                            }
                        }
                        return null;
                    }

                    // 从文档的根元素开始搜索
                    return findElement(document.documentElement);
                }
                return items.map(item => {
                    const selectors = {}
                    let content = findMinElementContainingText(item.content);
                    if (content) {
                        selectors.content = window.Finder(content);
                    }
                    let source = findMinElementContainingText(item.source);
                    if (source) {
                        selectors.source = window.Finder(source);
                    }
                    let title = findMinElementContainingText(item.title);
                    if (title) {
                        selectors.title = window.Finder(title);
                    }
                    return selectors;
                });
            }, items)
        }
    }
    return divPaths;
}


// 示例函数：生成使用 Puppeteer 和 Cheerio 的爬虫代码
function generateCrawlerCode(url, items, divPaths) {
    let codeTpl = `const puppeteer = require('puppeteer');
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
  let html = "";
  try {
      // 导航到目标 URL
      await page.goto('https://www.chinatax.gov.cn/', { waitUntil: 'networkidle0' });
      await new Promise((res, rej) => {
          setTimeout(() => { res(); }, 2000);
      })
      // 获取页面内容
      html = await page.content();
  } catch (error) {
      console.error('获取页面内容时出错:', error);
  }
  
  // 使用 Cheerio 加载 HTML
  const $ = cheerio.load(html);
  
  const data = [];
  
  // TODO 根据以下网站关键信息内容css选择器来完成爬虫代码，summary表示某个信息集合的介绍；cssSelectors中的content表示信息的内容选择器，source表示此信息来源平台选择器，title表示此信息标题的选择器
  // NOTICE 不要限制选择器检索到的项目数量，请全部爬取并返回
  /**
  【有效的css选择器】
  ${JSON.stringify(divPaths, null, 2)}
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
`;

    const o1_prompt = "请思考并完成以下代码的TODO任务，要求并一次性完整返回返回代码文本，不要包含其他内容\n【任务】\n" + codeTpl;

    const code = genCrawlerCode(o1_prompt);
    return code;
}

const genCrawlerCode = async (prompt) => {
    console.log(prompt);
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
        model: 'anthropic/claude-3.5-sonnet',
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
