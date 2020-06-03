//index.js
//获取应用实例
const app = getApp()
const md5 = require('../../utils/md5');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import {request} from '../../utils/request'
Page({
  data: {
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
    userInfo: {},
    hasLogin:false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    account: "",
    password: "",
    iconList: [{
      id:0,
      icon: 'redpacket_fill',
      color: 'blue',
      badge: 120,
      name: '代付款'
    }, {
      id:1,
      icon: 'squarecheckfill',
      color: 'blue',
      badge: 2,
      name: '已完成'
    }],
    gridCol:3,
    skin: false,
  
  },
  onLoad: function () {
    //判断是否登录
   var token= wx.getStorageSync('token')
    if(token){
      this.setData({
        hasLogin:true
      })
    }else{
      this.setData({
        hasLogin:false
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //处理accountInput的触发事件
  accountInput:function(e){
    var username = e.detail.value;//从页面获取到用户输入的用户名
    if (username != ''){
      this.setData({ account: username });//把获取到的密码赋值给全局变量Date中的账号
    }
  },

  //处理pwdBlurt的触发事件
  pwdInput:function(e){
      var pwd = e.detail.value;//从页面获取到用户输入的密码
      if (pwd != ''){
        this.setData({ password: pwd });//把获取到的密码赋值给全局变量Date中的password
      }
    },
  //事件处理函数
  bindViewTap: function() {
    this.setData({
      dialogShow: true
  })
  },
 //处理login的触发事件
  login: function (e) {
    Toast.loading({
      duration: 0,
      mask: true,
      message: '登陆中...'
    });

    let studentId=this.data.account;
    
    let base64 = md5.b64Md5(this.data.password); 

    const pwd= md5.hexMD5(base64 + studentId)
    
    setTimeout(()=>{
      request('/user/wxLogin',{'studentId':studentId,'password':pwd},'POST').
      then(res=>{
              const {data:obj}=res
              if(obj.code===-1){
                Toast.clear();
                 wx.showToast({
                  title: obj.message
                 })
                return
              }
             const result= obj.data
             wx.setStorageSync('token',  result.token)
             wx.setStorageSync('name',  result.name)
             Toast.clear();
             wx.showToast({
                 title: '登陆成功',
              })
              this.setData({
                      hasLogin:true
                    })     
      }).catch(err=>{
        Toast.clear();
      })
    },1500)
  },

  viewOrder(){
    wx.navigateTo({
      url: '../order/order-info',
    }) 
  },
  orderInfo(e){
    let index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../order/order-info?index='+index
    })
  },
  //用户授权
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    if(app.globalData.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('hasUserInfo', true)
    }
  },

  openConfirm: function () {
    this.setData({
        dialogShow: true
    })
},

tapDialogButton(e) {
  var index = e.detail.index
  //0是取消
  if(index==1){
    this.setData({
      dialogShow: false,
      hasLogin:false,
      account: "",
      password: ""
 })
 //清理缓存
 wx.removeStorageSync('token')
 wx.removeStorageSync('name')
  }else{
    this.setData({
      dialogShow: false
    })
  }
},
})
