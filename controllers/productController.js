const Product= require('../models/products') 

const createProduct = async (req,res)=>{
    res.json({msg:'this is createproductroute '})
}

const getAllProduct = async (req,res)=>{
    res.json({msg:'this is getallproduct '})
}

const updateProduct= async (req,res)=>{
    res.json({msg:'this is updataeproductroute '})
}

const getSingleProduct = async (req,res)=>{
    res.json({msg:'this is getSingleproductroute '})
}

const deleteProduct = async (req,res)=>{
    res.json({msg:'this is deleteproductroute '})
}

const uploadImage = async (req,res)=>{
    res.json({msg:'this is uploadImageroute '})
}

module.exports={
                   createProduct,
                   getAllProduct,
                   getSingleProduct,
                   updateProduct,
                   uploadImage,
                   deleteProduct
                }