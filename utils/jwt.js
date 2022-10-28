require('dotenv').config()
const jwt=require('jsonwebtoken')
const customError=require('../errors')

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

module.exports={createJWT,verifyToken}