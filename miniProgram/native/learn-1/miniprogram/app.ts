// app.ts , 作用是注册app对象实例
App<IAppOption>({
  globalData: {}, // 全局共享数据
  // 小程序启动时的钩子函数
  onLaunch() {
    // console.log(options);
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 进行用户登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('token', 'this is a tok.n')
  
      },
    })
  }, 
  // 处理全局的promise错误
  onUnhandledRejection(){

  }
})