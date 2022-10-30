require('dotenv').config()
const jwt=require('jsonwebtoken')
const customError=require('../errors')
const { StatusCodes } = require('http-status-codes');

const createJWT=({payload})=>{
    const token= jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRY
    });
    return token;
}


const verifyToken=(token)=>{
    try {
       const verifiedToken= jwt.verify(token,proces.env.JWT_SECRET_KEY)
       return verifiedToken
    } catch (error) {
        throw new customError.UnauthenticatedError('Not a valid authentication try again...')
    }
}

const attachCookiesToResponse=async({user,res})=>{
    // console.log(user)
    const token=await createJWT({payload:user})
    res.cookie('token',token,{httpOnly:true,
        expires:new Date(Date.now()+1000*60*60*24),
        secure: process.env.NODE_ENV=== 'production',//during developing we use http and production we use https
        signed:true,
    })
        
     res.status(StatusCodes.CREATED).json({user})
}

module.exports={createJWT,verifyToken,attachCookiesToResponse}