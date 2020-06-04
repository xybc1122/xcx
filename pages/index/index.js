
import {request} from '../../utils/request'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    courseList:[
     
    ],
    current:1,
    offset:10,
    pages:0,
    isLoginType:0 //1登陆
  },
  onShow() {
    const token= wx.getStorageSync('token')
    if(!token){
      this.setData({
        //登陆
        isLoginType:1
      })
      return
    }
    this.setData({
        //index
      isLoginType:2
    })
    this.getCourseList()


  },
  //上啦触发刷新
  onPullDownRefresh(){
    const token= wx.getStorageSync('token')
    if(!token){
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '请先登录',
      })
        return
    }

    this.setData({
      current:1,
      offset:10
    })
    this.getCourseList()
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
    this.getCourseList()
  },
  getCourseList(){
    request('/course/list',{'current':this.data.current,'offset':this.data.offset}).then(res=>{
      const {data:obj}=res
      console.log(obj)
      if(obj.code===200){
        this.setData({
          courseList:[...this.data.courseList,...obj.data.records],
          pages:obj.data.pages
        })
      }
      wx.stopPullDownRefresh()
  }).catch(err=>{
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '网络异常',
      image: '../icons/error.png'
     })
  })
  },

  bindViewLogin(){
    wx.switchTab({
        url: '../me/me'
      })
  },

  desPay(e){
    let item=JSON.stringify(e.currentTarget.dataset['item']);
    wx.navigateTo({
      url: '../product/description?item=' + item,
    })
  }
})