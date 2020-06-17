// pages/reset/resetPwd.js
import {checkAccount,checkPwd} from '../../utils/check'
import {request} from '../../utils/request'
const base64 = require('../../utils/base64');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmPwd:'',
    username:'',
    oldePwd:'',
    newPwd:''
  },
    //处理accountInput的触发事件
    accountInput(e){
      let username = e.detail.value;//从页面获取到用户输入的用户名
      if (username != ''){
        this.setData({ username: username });//把获取到的密码赋值给全局变量Date中的账号
      }
    },
  
    //处理pwdBlurt的触发事件
    oldePwdInput(e){
        let oldePwd = e.detail.value;//从页面获取到用户输入的密码
        if (oldePwd != ''){
          this.setData({ oldePwd: oldePwd });//把获取到的密码赋值给全局变量Date中的password
        }
      },
      //处理accountInput的触发事件
      newPwdInput(e){
    let newPwd = e.detail.value;//从页面获取到用户输入的用户名
    if (newPwd != ''){
      this.setData({ newPwd: newPwd });//把获取到的密码赋值给全局变量Date中的账号
    }
  },

  //处理pwdBlurt的触发事件
  confirmPwdInput(e){
      let confirmPwd = e.detail.value;//从页面获取到用户输入的密码
      if (confirmPwd != ''){
        this.setData({ confirmPwd: confirmPwd });//把获取到的密码赋值给全局变量Date中的password
      }
    },
      
  restPwd(){
    const that = this
    if(!checkAccount(that.data.username)){
      return
    }
    if(!checkPwd(that.data.oldePwd,"原密码不规范")){
      return
    }
    if(!checkPwd(that.data.newPwd,"新密码不规范")){
      return
    }   
    if(!checkPwd(that.data.confirmPwd,"确认密码不规范")){
      return
    }
    if(that.data.newPwd!==that.data.confirmPwd){
      wx.showToast({
        title:  "两次密码不正确",
        image: '../icons/error.png'
       }) 
        return
    } 
    const oldeBase64Pwd= base64.Base64.encode(that.data.oldePwd)
    const newBase64Pwd= base64.Base64.encode(that.data.newPwd)
    request('/user/wxEdit',{'userName':that.data.username,'password':oldeBase64Pwd,'newPassword':newBase64Pwd},'POST').then(res=>{
      const {data:obj}=res
      if(obj.code===-1){
        wx.showToast({
         title: obj.message,
         image: '../icons/error.png'
        })
       return
     }
     wx.navigateBack()
    }).catch(err=>{
      wx.showToast({
        title: '网络异常',
        image: '../icons/error.png'
       }) 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})