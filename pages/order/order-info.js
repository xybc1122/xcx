// pages/order/order-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    prePaymentList:[
      {
        id:1,
        price:125,
        paTime:'2020年5月18日 15:51',
        title:'康泰1号',
        imgUrl:'https://s1.ax1x.com/2020/06/02/tYK6jH.th.jpg'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如果是空对象 说明是点查看进来的
    let index=options.index;
    if(index==null){
      return
    }
    this.setData({
      active: index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onChange(event) {
    // console.log(event)
  },
})