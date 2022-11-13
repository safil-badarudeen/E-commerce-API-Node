const User=require('../models/user')
const {StatusCodes}=require('http-status-codes')
const customError=require('../errors')
const{createTokenUser,attachCookiesToResponse,checkPermissions}=require('../utils')
const { response } = require('express')

const getAllUsers=async(req,res)=>{
    const user=await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({user})
}

const getSingleUser=async(req,res)=>{

     const {id : userId}=req.params
    
    const user=await User.findOne({_id: userId}).select('-password')
    
    checkPermissions({requestUser:req.user, currentUserId:user._id})
    
    const tokenUser= createTokenUser(user)
    
    attachCookiesToResponse({res,user:tokenUser})
    
    // res.status(StatusCodes.OK).json({user})
  
}

const showCurrentUser=async(req,res)=>{
    res.status(StatusCodes.OK).json({user:req.user})
}

const updateUser=async(req,res)=>{
    const {email,username}=req.body
    const {userId,name}=req.user

    if(!email && !username){
        throw new customError.BadRequestError('please enter the both value in email and username')
    }

    const user=await User.findById(userId)
    user.name=username
    user.email=email
    await user.save()
    
    const tokenUser=createTokenUser(user)
    attachCookiesToResponse({user:tokenUser,res})
    // res.status(StatusCodes.OK).json({tokenUser})
}

const updatePassword=async(req,res)=>{
    const {oldPassword,newPassword}=req.body

    if(!oldPassword && !newPassword){
        throw new customError.BadRequestError('please enter both old and new password')
    }
    const {userId}=req.user

    const user=await User.findById(userId)
    if(!user){
        throw new customError.BadRequestError('user with id not found')
    }
    
    const verifiedPassword=await user.comparePassword(oldPassword)
    
    if (!verifiedPassword){
        throw new customError.UnauthorizedError('oldPassword entered doesnt match your existing password')
    }

    user.password=newPassword
    await user.save()

    res.status(StatusCodes.OK).json({})
}

module.exports={getAllUsers,getSingleUser,showCurrentUser,updateUser,updatePassword}

