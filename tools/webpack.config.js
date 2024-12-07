// webpack.config.js
const path = require('path');

module.exports = {
    entry: './finder-entry.js', // 入口文件
    output: {
        filename: 'finder.bundle.js', // 输出文件
        path: path.resolve(__dirname, 'dist'), // 输出目录
        library: 'FinderLibrary', // 库名称
        libraryTarget: 'umd', // 通用模块定义，适用于多种环境
        globalObject: 'this', // 解决在 Node.js 环境下的全局对象问题
    },
    mode: 'production', // 生产模式，优化输出
};
