Page({
  data: {
    isLoginType:0 //1登陆 2授权
  },
  onShow: function () {
    var token= wx.getStorageSync('token')
    if(!token){
      this.setData({
        //登陆
        isLoginType:1
      })
    }else{
      this.setData({
        //登陆
        isLoginType:2
      })
    }
  },
  bindViewLogin:function(){
    wx.switchTab({
        url: '../me/me'
      })
  }
})