// pages/order/order-info.js
import {request} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    prePaymentList:[
  
    ],
    current:1,
    offset:5,
    pages:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
    //如果是空对象 说明是点查看进来的
   let index= options.index
    if(index==null){
      return
    }
    that.setData({
      active: index
    })
    that.getOrderInfo()
  },
  getOrderInfo(){
    request('/order/course-order/orderList', {'isPay':this.data.active,'current':this.data.current,'offset':this.data.offset}).then(res=>{
        const {data:obj} =res
        if(obj.code===200){
          this.setData({
            prePaymentList:obj.data.records,
            pages:obj.data.pages
          })
        }
        wx.stopPullDownRefresh()
      }).catch(err=>{
      wx.showToast({
        title: '网络异常',
        image: '../icons/error.png'
       }) 
       wx.stopPullDownRefresh()
    })
  },
  onReachBottom(){
    let current=  this.data.current
    let page=this.data.pages
      if(current>=page){
        wx.showToast({
          title: '已经到底啦',
          image: '../icons/index.png',
        }) 
        return
      }
      current++;
      this.setData({
        current:current
      })
      this.getOrderInfo()
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
    this.getOrderInfo()
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
    this.setData({
      active:event.detail.index
    })
    this.getOrderInfo()
  },

  onScroll(e){
    console.log("onScroll")
  }
})