//index.js
//获取应用实例
const app = getApp()
const base64 = require('../../utils/base64');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import {request,requestWx} from '../../utils/request'
Page({
  data: {
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
    userInfo: {},//用户信息
    hasLogin:false,//判断是否登录
    hasUserInfo: false,//判断是否用户授权
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    account: "", //账号
    password: "",//密码
    iconList: [
      {
        id:0,
        icon: 'redpacket_fill',
        color: 'blue',
        badge: 0,
        name: '代付款'
      },
      {
        id:1,
        icon: 'squarecheckfill',
        color: 'blue',
        badge: 0,
        name: '已完成'
      }
    ],
    gridCol:3
  
  },
  onLoad: function () {
    //判断是否登录
   const token= wx.getStorageSync('token')
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
  onShow(){
    const token= wx.getStorageSync('token')
    if(!token){
        return
    }
    this.getPayCount()
  },

  getPayCount(){
    request('/order/course-order/payCount').then(res=>{
     
      const {data:obj} =res
      console.log(obj)
      if(obj.code===200){
        const countList=  obj.data.split("#")

        const notPay = {
          id:0,
          icon: 'redpacket_fill',
          color: 'blue',
          badge: countList[1],
          name: '代付款'
        }
        const pay= {
          id:1,
          icon: 'squarecheckfill',
          color: 'blue',
          badge: countList[0],
          name: '已完成'
        }

        const icons =[]
        icons.push(notPay)
        icons.push(pay)
        this.setData({
          iconList:icons
        })
      }
     
    }).catch(err=>{
      wx.showToast({
        title: '网络异常',
        image: '../icons/error.png'
       }) 
    })
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
  login (e) {
      const base64Pwd= base64.Base64.encode(this.data.password)
      request('/user/wxLogin',{'userName':this.data.account,'password':base64Pwd},'POST').
      then(res=>{
              const {data:obj}=res
              if(obj.code===-1){
                Toast.clear();
                 wx.showToast({
                  title: obj.message,
                  image: '../icons/error.png'
                 })
                return
              }
             const result= obj.data
             wx.setStorageSync('token',  result.token)
             wx.setStorageSync('name',  result.name)
             this.getOpenId()
             this.getPayCount()
             wx.showToast({
                 title: '登陆成功',
              })
              this.setData({
                hasLogin:true
              })     
      }).catch(err=>{
        wx.showToast({
          title: '登陆网络异常',
          image: '../icons/error.png'
         }) 
      })
  },
  getOpenId(){
    wx.login({
      success: (res) => {
        if (res.code) {
          const data= {'appid':"wxc501def26cdf4716",'secret':"55bfa60041f88e360d826e160b8a3420",'grant_type':'authorization_code',js_code:res.code}
          requestWx('https://api.weixin.qq.com/sns/jscode2session',data).then(res=>{
            const {data:obj}=res
            wx.setStorageSync('openid',  obj.openid)
            wx.setStorageSync('sessionKey',  obj.session_key)
            if (obj.openid == null || obj.openid == undefined) {
              wx.showToast({
                title: 'openid获取失败',
             })
             return
            }
            // console.log(obj.openid)         
          })
        }

      }
    })
  },
  viewOrder(){
    wx.navigateTo({
      url: '../order/info',
    }) 
  },
  orderInfo(e){
    let index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../order/info?index='+index
    })
  },

  //用户授权
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
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
  let index = e.detail.index
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
