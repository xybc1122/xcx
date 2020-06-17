
export const checkAccount =(account)=>{
    if(account.length <2 || account.length >10){
                wx.showToast({
                title:  "账号不规范",
                image: '../icons/error.png'
               }) 
               return false
    }
    return true
}

export const checkPwd =(pwd,msg)=>{
  if(pwd.length <6 || pwd.length >15){
              wx.showToast({
              title:  msg,
              image: '../icons/error.png'
             }) 
             return false
  }
  return true
}