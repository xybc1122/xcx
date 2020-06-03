Page({
  data: {
    courseList:[
      {
        id:1,
        price:125,
        time:'2020/05/26--2020/08/26',
        desc:'周六15:35-17:35(10.3号停课)',
        title:'六年级英语秋季班',
        imgUrl:'https://s1.ax1x.com/2020/06/02/tYK6jH.th.jpg',
        teacher:'陈成',
        full:0,
        campus:'大自然校区'
      },
      {
        id:1,
        price:125,
        time:'2020/06/26--2020/11/26',
        desc:'周六15:35-17:35(10.3号停课)',
        title:'六年级英语暑假班',
        imgUrl:'https://s1.ax1x.com/2020/06/02/tYK6jH.th.jpg',
        teacher:'陈新',
        full:1,
        campus:'龙湾校区'
      },
    ],


    isLoginType:0 //1登陆
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
        //index
        isLoginType:2
      })
    }
  },
  bindViewLogin:function(){
    wx.switchTab({
        url: '../me/me'
      })
  },

  desPay:function(e){
    let item=JSON.stringify(e.currentTarget.dataset['item']);
    wx.navigateTo({
      url: '../product/description?item=' + item,
    })

  }
})