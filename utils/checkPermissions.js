const { request } = require('express')
const customError=require('../errors')


 const checkPermissions=({requestUser,currentUserId})=>{
    // console.log(typeof requestUser)
    // console.log(requestUser)
    // console.log(typeof currentUser)
    // console.log(currentUser)
    
    if(requestUser.role==='admin')return

    if(requestUser.userId===currentUserId.toString())return
    
     throw new  customError.UnauthorizedError('Access denied ... you dont have permission to access')
 }



module.exports={checkPermissions}