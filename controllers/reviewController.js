const mongoose =require ('mongoose')
const Review = require('../models/Review');

const Product = mongoose.model ('Product') //require('../models/Products');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { findOne } = require('../models/Review');
const { checkPermissions } = require('../utils');



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
   
  const reviews = await Review.find({})
 
  res.status(StatusCodes.OK).json({reviews , count : reviews.length})

} 

const getSingleReview = async (req,res)=>{
  
  const {id : reviewId} = req.params

  const review = await Review.findOne({_id: reviewId}).populate('product', ' name company price')

  if (!review){
    throw new CustomError.BadRequestError(`The review doesnt exist with review id ${review}`)
  }
 
  res.status(StatusCodes.OK).json({review})
    

}

const  updateReview = async (req,res)=>{

  const { id : reviewId}= req.params
  const {rating, title , comment} = req.body

  const review = await Review.findById(reviewId)
 
   
  if(!review){
    throw new CustomError.BadRequestError('Review doesnt exist ...')
  }

  review.rating=rating
  review.title= title
  review.comment= comment
  
  checkPermissions({requestUser:req.user, currentUserId:review.user})

  await review.save()
  
  res.status(StatusCodes.OK).json({review})
    
} 

const deleteReview = async (req,res)=>{

  const {id : reviewId} = req.params

  const review = await Review.findOne({_id: reviewId})

  if (!review){
    throw new CustomError.BadRequestError(`The review doesnt exist with review id ${review}`)
  }

  checkPermissions({requestUser:req.user, currentUserId:review.user})

  await review.remove()
 
  res.status(StatusCodes.OK).json({msg : `review with review_id ${review._id} deleted successfully`})

}

const getSingleProductReview = async (req,res)=>{
  const {id: productId} = req.params
  
   const review = await Review.findOne({ product : productId})

   console.log(review)
   res.status(StatusCodes.OK).json({review})
}

module.exports={
    deleteReview,
    updateReview,
    getSingleReview,
    getAllReviews,
    createReview,
    getSingleProductReview}