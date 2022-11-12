
const mongoose =require ('mongoose')

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: [true,'please enter the name'],
    max : [ 100 , ' you cannot enter more than 100 characters in name field'],
    min : [3 , 'you cannot enter less than 3 characters in name fiels']
    
  },

  price: {
    type:Number,
    required : [true, 'please enter the price'],

  },

  description: {
    type:String,
    required : [true, ' please enter the description about the product'],
    max: [250 , ' you cannot enter morethan 250 characters in the description field']
},

image: {
    type:String,
},

category: {
    type:String,
    enum:{
        value:['computer','mobile','tablet','earbuds']
    }
},

 company: {
    type:String,
    required:true,
},


colors: {
    type:[String],

},

featured: {
    type:Boolean,
    default: false,
},

 freeShipping: {
    type:Boolean,
    default:false,
},

 inventory:{
    type:Number,
    default:15,
},
  
averageRating:{
    type:Number,
    max:5,
    default:0,
},

user:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    require:true,
}

  
}, {timeStamps: true})

module.exports=mongoose.model('Product',productSchema)