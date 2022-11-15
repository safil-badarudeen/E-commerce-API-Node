const Product= require('../models/products') 
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createProduct = async (req,res)=>{
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProduct = async (req,res)=>{
    const products = await Product.find({});

    res.status(StatusCodes.OK).json({ products, count: products.length });
}

const updateProduct= async (req,res)=>{
    const { id: productId } = req.params;

    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    res.status(StatusCodes.OK).json({ product });
}

const getSingleProduct = async (req,res)=>{
    const { id: productId } = req.params;

    const product = await Product.findOne({ _id: productId }).populate('review');
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    res.status(StatusCodes.OK).json({ product });
}

const deleteProduct = async (req,res)=>{
    const { id: productId } = req.params;

    const product = await Product.findOne({ _id: productId });
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    await product.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
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