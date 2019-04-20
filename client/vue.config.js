const path = require("path");
const debug = process.env.NODE_ENV !== "production";

module.exports = {
  publicPath: "/", // 部署在根域名路径上
  outputDir: "dist", // 输出目录
  assetsDir: "assets", // 静态资源目录 (js, css, img, fonts)
  lintOnSave: true, // 是否开启eslint保存检测
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      // 开发环境配置
      config.devtool = "cheap-module-eval-source-map";
    } else {
      // 生产环境配置
    }
    // Object.assign(config, {
    //     // 共同配置
    //     resolve: {
    //         alias: {
    //             '@': path.resolve(__dirname, './src'),
    //             '@c': path.resolve(__dirname, './src/components'),
    //             'vue$': 'vue/dist/vue.esm.js';
    //         }
    //     }
    // });
  },
  chainWebpack: config => {
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  }
};
