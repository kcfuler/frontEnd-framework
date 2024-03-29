// pages/02loginPage/02loginPage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.request({
      url: "http://123.207.32.32:8000/home/multidata",
      success: (res => {
        const data = res.data.data
        const banners = data.banner.list
        const recommends = data.recommend.list
        this.setData({
          banners,
          recommends
        })
      }),
      fail: (rej => {
        console.log(rej);
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})