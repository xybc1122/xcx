 const baseUrl ='http://127.0.0.1:8080/v1/api'
export const request=(url,data,method='GET',header={})=>{
    const token =wx.getStorageSync('token')
    header.token =token
    console.log(token)
    wx.showLoading({
        title: '加载中',
      })
     return new Promise((resolve,reject)=>{
            wx.request({
                url:baseUrl+url,
                data:data,
                method:method,
                header:header,
                success:(result)=>{
                    resolve(result)
                    wx.hideLoading()
                },
                fail:(err)=>{
                    reject(err)
                    wx.hideLoading()
                } 
            })
    })  
}



export const requestWx=(url,data,method='GET',header={})=>{
    wx.showLoading({
        title: '加载中',
      })
     return new Promise((resolve,reject)=>{
            wx.request({
                url:url,
                data:data,
                method:method,
                header:header,
                success:(result)=>{
                    resolve(result)
                    wx.hideLoading()
                },
                fail:(err)=>{
                    reject(err)
                    wx.hideLoading()
                } 
            })
    })  
}
