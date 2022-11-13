const mongoose =require ('mongoose')
const Review = require('../models/Review');

const Product = mongoose.model ('Product') //require('../models/Products');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');



const createReview = async (req,res)=>{
    const { product: productId } = req.body;

    const isValidProduct = await Product.findOne({ _id: productId });
  
    if (!isValidProduct) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    const alreadySubmitted = await Review.findOne({
      product: productId,
      user: req.user.userId,
    });
  
    if (alreadySubmitted) {
      throw new CustomError.BadRequestError(
        'Already submitted review for this product'
      );
    }
  
    req.body.user = req.user.userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({ review });
 
};

const  getAllReviews= async (req,res)=>{
    res.send('getAllReviewRoute')

} 

const getSingleReview = async (req,res)=>{
    res.send('getsingleReviewRoute')

}

const  updateReview = async (req,res)=>{
    res.send('updateReviewRoute')
} 

const deleteReview = async (req,res)=>{
    res.send('deleteReviewRoute')
}

module.exports={
    deleteReview,
    updateReview,
    getSingleReview,
    getAllReviews,
    createReview}