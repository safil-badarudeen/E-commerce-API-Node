const mongoose=require('mongoose')
const validator=require('validator')
var bcrypt = require('bcryptjs')


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter the name'],
        minLength:3,
        maxLength:50,
    },

    email:{
        type:String,
        required:[true,'please enter the email'],
        validate:{
            validator:validator.isEmail,
            message:'please enter a valid email'
        },
        minLength:4,
        unique:true,
    },

    password:{
        type:String,
        required:[true,'please enter the password'],
        minLength:5,
        
    },

    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
    }

},{timestamps:true})

userSchema.pre('save', async function(next) {
    // console.log(this.modifiedPaths())
    // console.log(this.isModified('name'))
   if(!this.isModified('password'))return
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
  });

  userSchema.methods.comparePassword=function(candidatePassword){
    
    const isMatch= bcrypt.compareSync(candidatePassword,this.password)
    return isMatch
  }


module.exports=mongoose.model('User',userSchema)