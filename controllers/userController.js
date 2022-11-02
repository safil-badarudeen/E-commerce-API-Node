const User=require('../models/user')
const {StatusCodes}=require('http-status-codes')


const getAllUsers=async(req,res)=>{
    const user=await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({user})
}

const getSingleUser=async(req,res)=>{
    res.send(req.params)
}

const showCurrentUser=async(req,res)=>{
    res.send(req.body)
}

const updateUser=async(req,res)=>{
    res.send(req.body)
}

const updatePassword=async(req,res)=>{
    res.send(req.body)
}

module.exports={getAllUsers,getSingleUser,showCurrentUser,updateUser,updatePassword}

