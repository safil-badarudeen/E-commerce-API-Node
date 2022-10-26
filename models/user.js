const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter the name'],
        minLength:6,
        maxLength:50,
        unique:true,
    },

    email:{
        type:String,
        required:[true,'please enter the email'],
        minLength:4,
        unique:true,
    },

    password:{
        type:String,
        required:[true,'please enter the password'],
        minLength:5
    },

    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
    }

})

module.exports=mongoose.model('Users',userSchema)