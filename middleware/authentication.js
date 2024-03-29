const customError=require('../errors')
const{StatusCodes}=require('http-status-codes')
const { isTokenValid } = require('../utils/jwt')
const user = require('../models/user')


const authenticateUser=async(req,res,next)=>{
    const token=req.signedCookies.token

    if(!token){
        throw new customError.UnauthenticatedError('token not found')
    }

    try {
        const {name,userId,role}= isTokenValid(token)
        req.user={name,userId,role}
        next()
    } catch (error) {   
    throw new customError.UnauthenticatedError('No token found to access')
    }
    
}
//   should pass authorizePermission after authenticate user
//   in routes because other wise we dont have acces to req.user.role in  authorize permission
 

const authorizePermission=(...roles)=>{
        return (req,res,next)=>{
            
            if (!roles.includes(req.user.role)){
                throw new customError.UnauthorizedError('you have no access to this route')
            }
            next()
        }
}

module.exports={authenticateUser,authorizePermission}