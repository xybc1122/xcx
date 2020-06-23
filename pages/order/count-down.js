// pages/order/count-down.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
import {request} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    createTime:'',
    item:{},
    time: 0.5 * 60 * 60 * 1000,
    isTimeOut:true
  },
  delOrder(){
    Dialog.confirm({
      title: '提示',
      message: '确定要删除订单吗',
    })
      .then(() => {
        const orderNumber= this.data.item.orderNumber   
        request('/order/course-order/delOrder',{orderNumber:orderNumber}).then(res=>{
         const {data:obj} =res
         if(obj.code===200){
           wx.showToast({title: obj.message})
           wx.navigateBack()
           return 
         }
         wx.showToast({
           title: obj.message,
           image: '../icons/error.png'
          })
        }).catch(err=>{
           wx.showToast({
             title: '删除订单网络异常',
             image: '../icons/error.png'
            }) 
         })
      })
      .catch(() => {

      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item:JSON.parse(options.item)
    })
    request('/order/course-order/orderCreateTime',{orderNumber:this.data.item.orderNumber}).then(res=>{
      const {data:obj} =res
      if(obj.code===200){
       let newTime= new Date().getTime()
       //拿到创建订单时间
       let oldTime = new Date(obj.data.createTime).getTime()
        let orderTime= this.data.time-(newTime-oldTime)
       this.setData({
        createTime:obj.data.createTime,
         time:orderTime
       })
       return
      }

    }).catch(err=>{
      wx.showToast({
        title: '订单时间网络异常',
        image: '../icons/error.png'
       }) 
    })
  },
  finished(){
    const orderNumber= this.data.item.orderNumber   
    request('/order/course-order/delOrder',{orderNumber:orderNumber}).then(res=>{
     const {data:obj} =res
     if(obj.code===200){
      this.setData({
        isTimeOut:false
      })
       return 
     }
     wx.showToast({
      title: obj.message,
      image: '../icons/error.png'
     })
     wx.showToast({
       title: obj.message,
       image: '../icons/error.png'
      })
    }).catch(err=>{
       wx.showToast({
         title: '删除订单网络异常',
         image: '../icons/error.png'
        }) 
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
    console.log("onUnload")
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

  }
})