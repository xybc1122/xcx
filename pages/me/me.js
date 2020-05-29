//index.js
//获取应用实例
const app = getApp()

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
    message:""
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
    console.log(this.data.password)
    if(this.data.account=='1' && this.data.password=='1'){
      wx.showToast({
         title: '登陆成功',
        })
        wx.setStorageSync('token',  '1')
        this.setData({
          hasLogin:true
        })     
        //设置缓存
          return
    }
    wx.showToast({
      title: '登录失败'
     })
    // wx.request({
    //   url: 'http://localhost:8080/API/login',//后面详细介绍
    //   //定义传到后台的数据
    //   data: {
    //     //从全局变量data中获取数据
    //     account: this.data.account,
    //     password: this.data.password,
    //   },
    //   method: 'get',//定义传到后台接受的是post方法还是get方法
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log("调用API成功");
    //     console.log(res.data.message);
    //     if (res.data.message=="ok"){
    //       wx.showToast({
    //         title: '登陆成功',
    //       })
    //     }
    //     else{
    //       wx.showModal({
    //         title: '提示',
    //         content:'用户名或者密码错误',
    //         showCancel:false
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     console.log("调用API失败");
    //   }
    // })
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
  }else{
    this.setData({
      dialogShow: false
    })
  }
},
})
