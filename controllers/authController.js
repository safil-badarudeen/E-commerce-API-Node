const User=require('../models/user')
const { StatusCodes } = require('http-status-codes');
const customError=require('../errors')
const bcrypt = require('bcryptjs');

const {attachCookiesToResponse,createTokenUser}=require('../utils')


const register=async(req,res)=>{
    const {name , email , password}=req.body

    const emailAlreadyExists= await User.findOne({email})
    if(emailAlreadyExists){
        throw new customError.BadRequestError("Email you have entered already exists")
    }

   //if its the first user in DB role will be admin
     const firstUser=(await User.countDocuments({}))===0;
     const role=firstUser? 'admin' : 'user';

     const user= await User.create({name, email, password, role})

     const tokenUser=createTokenUser(user)
    
     attachCookiesToResponse({user:tokenUser,res})
     
    //  res.status(StatusCodes.CREATED).json({user:tokenUser})
}

const login=async(req,res)=>{
  const {email,password}=req.body
  
  if(!email || !password){
    throw new customError.BadRequestError('please enter both email and password in the specific field')
  }
  
  const user=await User.findOne({email})
  if(!user){
    throw new customError.NotFoundError('User not found...Enter valid email address')
  }
  const tokenUser=createTokenUser(user)
  // console.log(tokenUser)
  const verifiedPassword=await user.comparePassword(password);

   if(!verifiedPassword){
    throw new customError.UnauthenticatedError('wrong password try again')
   }
   
    attachCookiesToResponse({user:tokenUser,res})
    // res.status(StatusCodes.CREATED).json({user:tokenUser})
    //res from attachCookies function
   
}

const logout =async(req,res)=>{
  
  res.cookie('token','logout',{
    httpOnly:true,
    expires: new Date(Date.now())
  })
    res.status(StatusCodes.OK).json({msg:'loggedOut succesfully'})
}

module.exports={register,login,logout}