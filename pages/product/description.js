import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemDescription:{},
    checked:false,
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      itemDescription:JSON.parse(options.item),
      name:wx.getStorageSync('name')
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
    this.setData({
      checked: event.detail,
    });
  },

  onClickShow(){
    wx.navigateTo({
      url: '../text/read-text'
    })

  },
  pay(){
  let isChecked =this.data.checked
  if(isChecked==false){
    Toast('您需要阅读并勾选报班须知');
      return
  }
  Toast.loading({
    duration: 0,
    mask: true,
    message: '支付中...',
  });

  setTimeout(()=>{
    Toast.clear();
  },3000)
  console.log(this.data.itemDescription)
  }

})