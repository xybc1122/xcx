 const baseUrl ='http://127.0.0.1:8080/v1/api'

export const request=(url,data,method,header=undefined)=>{

    return new Promise((resolve,reject)=>{
            wx.request({
                url:baseUrl+url,
                data:data,
                method:method,
                header:header,
                success:(result)=>{
                    resolve(result)
                },
                fail:(err)=>{
                    reject(err)
                } 
            })
    })  
}
