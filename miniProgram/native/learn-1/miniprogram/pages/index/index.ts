// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    pathList:[
      {
        name: "App函数",
        path: "/pages/01App/01App"
      },
      {
        name: "注册页面函数",
        path: "/pages/02loginPage/02loginPage"
      },
      {
        name: "常用组件",
        path: "/pages/03CommonComponents/03CommonComponnets"
      }
    ]
  },

  handleButtonTap(event: any){
    console.log(event.target);
    
    wx.navigateTo({
      url: event.target.dataset.item.path
    })
  }
})
