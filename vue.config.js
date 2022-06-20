const { defineConfig } = require('@vue/cli-service')
// 不要手动写绝对路径, 用代码来动态获取, 绝对地址
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.resolve(__dirname, 'src/style/cover.less')}";`
          }
        }
      }
    }
  }
})
