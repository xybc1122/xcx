
import {request} from '../../utils/request'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    courseList:[
     
    ],
    current:1,
    offset:10,
    pages:0,
    isLoginType:0, //1登陆
    isListNull:false //判断是否有数据
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
      isLoginType:2,
      courseList:[],
      current:1,
      offset:10
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
        image: '../icons/log-in.png',
      })
        return
    }

    this.setData({
      current:1,
      offset:10,
      courseList:[]
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
    this.setData({
      isListNull:true
    })
    request('/course/list',{'current':this.data.current,'offset':this.data.offset}).then(res=>{
      const {data:obj}=res
      if(obj.code===200){
        if(obj.data.records.length >0){
          this.setData({
            courseList:[...this.data.courseList,...obj.data.records],
            pages:obj.data.pages
          })
        }else{
          this.setData({
            courseList:obj.data.records,
            isListNull:false
          })
        }
        
      }
      wx.stopPullDownRefresh()
  }).catch(err=>{
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '获取课程列表网络异常',
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