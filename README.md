# Web Crawler Script Generator 🕸️🤖

## 简介 | Introduction

欢迎使用 **Web Crawler Script Generator**！🎉 这是一个基于 Electron 的工具，帮助用户轻松生成用于抓取特定网站信息的爬虫脚本。只需输入目标网站 URL，工具将自动分析网站结构，提取关键信息，并生成可用于 Puppeteer 的 Node.js 爬虫代码。✨

Welcome to **Web Crawler Script Generator**! 🎉 This is an Electron-based tool that helps users effortlessly generate web crawler scripts for specific websites. Simply input the target website URL, and the tool will automatically analyze the website structure, extract key information, and generate Node.js crawler code compatible with Puppeteer. ✨

![Star Count](https://img.shields.io/github/stars/yourusername/your-repo?style=social)

## 目录 | Table of Contents

- [特性 | Features](#特性-features)
- [安装 | Installation](#安装-installation)
- [使用 | Usage](#使用-usage)
- [示例 | Examples](#示例-examples)
- [贡献 | Contributing](#贡献-contributing)
- [许可证 | License](#许可证-license)
- [联系我们 | Contact](#联系我们-contact)
- [鸣谢 | Acknowledgments](#鸣谢-acknowledgments)

## 特性 | Features ✨

- **简便易用**：用户友好的界面，输入 URL 即可生成爬虫脚本。🖥️
- **自动化分析**：使用 Puppeteer 自动加载网站，截图并提取文本内容。📄📸
- **智能处理**：集成 OpenAI 多模态接口，智能提取标题、摘要、时间等关键信息。🧠
- **精确选择器**：利用 `@medv/finder` 生成精准的 CSS 选择器，确保爬虫脚本的稳定性。🎯
- **多语言支持**：支持中英文双语界面，满足不同用户的需求。🌐

- **User-Friendly**: Easy-to-use interface that generates crawler scripts by simply inputting a URL. 🖥️
- **Automated Analysis**: Uses Puppeteer to automatically load websites, take screenshots, and extract text content. 📄📸
- **Intelligent Processing**: Integrates OpenAI's multimodal API to intelligently extract titles, summaries, dates, and other key information. 🧠
- **Precise Selectors**: Utilizes `@medv/finder` to generate accurate CSS selectors, ensuring the stability of crawler scripts. 🎯
- **Bilingual Support**: Supports both Chinese and English interfaces to cater to diverse user needs. 🌐

## 安装 | Installation 🚀

### 前提条件 | Prerequisites

- [Node.js](https://nodejs.org/) >= 14.x
- [npm](https://www.npmjs.com/) >= 6.x

### 步骤 | Steps

1. **克隆仓库 | Clone the repository**

   ```bash
   git clone https://github.com/MaskerPRC/auto-vl-spider.git
   cd your-repo
   ```

2. **安装依赖 | Install dependencies**

   ```bash
   npm install
   ```

3. **打包 `@medv/finder` | Bundle `@medv/finder`**

   ```bash
   npx webpack --config webpack.config.js
   ```

4. **启动应用 | Start the application**

   ```bash
   npm start
   ```

## 使用 | Usage 🛠️

1. **启动应用后**，在界面中输入您想要订阅的网站 URL。🌐

2. **点击“生成爬虫代码”按钮**，工具将自动分析网站并生成相应的爬虫脚本。📝

3. **查看并复制生成的代码**，您可以将其用于您的项目中。📋

### 示例 | Examples

![Usage Example](./assets/usage-example.png)

*输入 URL 并生成爬虫代码的界面示例*

## 示例 | Examples 📂

以下是生成的爬虫代码示例：

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com', { waitUntil: 'networkidle2' });

  const data = [];

  const element0 = await page.$('.unique-css-selector-for-element0');
  if (element0) {
    const title = await page.evaluate(el => el.innerText, element0);
    // 假设摘要和时间也在相同的 div 中
    data.push({
      title,
      summary: "这是摘要内容",
      time: "2024-12-07"
    });
  }

  console.log(data);
  await browser.close();
})();
```

## 贡献 | Contributing 🤝

非常欢迎您的贡献！🎉 请遵循以下步骤来贡献您的代码：

1. **Fork 本仓库 | Fork the repository**
2. **创建新分支 | Create a new branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **提交更改 | Commit your changes**

   ```bash
   git commit -m "Add some feature"
   ```

4. **推送到分支 | Push to the branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **创建 Pull Request**，我们将尽快审核您的贡献。🚀

### 贡献指南 | Contribution Guidelines 📜

- **代码风格 | Code Style**：请遵循现有的代码风格和规范。
- **文档 | Documentation**：确保文档更新与代码变更保持同步。
- **测试 | Tests**：添加相应的测试以覆盖新功能或修复的 bug。
- **报告问题 | Report Issues**：请先搜索现有问题，确保未被报告，然后详细描述您的问题或建议。

## 许可证 | License 📝

本项目使用 [MIT 许可证](./LICENSE)。欢迎自由使用、修改和分发！🔓

This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute it! 🔓

## 联系我们 | Contact 📬

有任何问题或建议，欢迎通过以下方式联系我：

- **邮箱 | Email**: maskerprc@gmail.com
- **GitHub**: [maskerprc](https://github.com/maskerprc)

Feel free to reach out via the following channels:

- **Email**: maskerprc@gmail.com
- **GitHub**: [maskerprc](https://github.com/maskerprc)

## 鸣谢 | Acknowledgments 🙏

感谢以下项目和社区的支持与贡献：

- [Electron](https://www.electronjs.org/) - 桌面应用框架
- [Puppeteer](https://pptr.dev/) - Node.js 库，提供高级 API 来控制 Chromium 或 Chrome
- [@medv/finder](https://github.com/medv/finder) - 生成元素的唯一 CSS 选择器
- [OpenAI](https://openai.com/) - 提供强大的 AI 接口
- [Shields.io](https://shields.io/) - 用于生成徽章

Special thanks to the following projects and communities for their support and contributions:

- [Electron](https://www.electronjs.org/) - Desktop application framework
- [Puppeteer](https://pptr.dev/) - Node.js library providing a high-level API to control Chromium or Chrome
- [@medv/finder](https://github.com/medv/finder) - Generates unique CSS selectors for elements
- [OpenAI](https://openai.com/) - Provides powerful AI APIs
- [Shields.io](https://shields.io/) - For generating badges
