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
    offset:10,
    pages:0,
    isListNull:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    let that =this
    //如果是空对象 说明是点查看进来的
   let index= options.index
    if(index==null){
      that.getOrderInfo()
      return
    }
    that.setData({
      active: index
    })
    that.getOrderInfo()
  },
  getOrderInfo(){
    this.setData({
      isListNull:true
    })
    request('/order/course-order/orderList', {'isPay':this.data.active,'current':this.data.current,'offset':this.data.offset}).then(res=>{
        const {data:obj} =res
        if(obj.code===200){
          if(obj.data.records.length >0){
            this.setData({
              prePaymentList:[...this.data.prePaymentList,...obj.data.records],
              pages:obj.data.pages
            })
          }else{
            this.setData({
              prePaymentList:obj.data.records,
              isListNull:false
            })
          }
         
        }
        wx.stopPullDownRefresh()
      }).catch(err=>{
      wx.showToast({
        title: '获得订单信息网络异常',
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
   this.setData({
      current:1,
      offset:10,
      prePaymentList:[]
    })
    this.getOrderInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onChange(event) {
    this.setData({
       current:1,
       offset:10,
      active:event.detail.index,
      prePaymentList:[]
    })
    this.getOrderInfo()
  }
})