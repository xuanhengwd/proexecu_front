const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 80,
    // host: 'localhost',
    open:false,
    https:false,
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        pathRewrite: {'^/api': ''},
        ws:true,    // 用于支持websocket
        changeOrigin:true,  // 向后端伪装来源，控制请求头的host头
      }
    }

  }
})
