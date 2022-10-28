const User=require('../models/user')
const { StatusCodes } = require('http-status-codes');
const customError=require('../errors')


const register=async(req,res)=>{
    const {name , email , password}=req.body

    const emailAlreadyExists= await User.findOne({email})
    if(emailAlreadyExists){
        throw new customError.BadRequestError("Email you have entered already exists")
    }

   //if its the first user in DB role will be admin
    const firstUser=(await User.countDocuments({}))===0;
     role=firstUser? 'admin' : 'user';

     const user= await User.create({name, email, password, role})
     res.status(StatusCodes.CREATED).json({user})
}

const login=async(req,res)=>{
    res.send('login route')
}

const logout =async(req,res)=>{
    res.send('logout route')
}

module.exports={register,login,logout}