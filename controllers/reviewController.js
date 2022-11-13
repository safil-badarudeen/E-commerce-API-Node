const Review = require('../models/review');
const Product = require('../models/products');


const createReview = async (req,res)=>{
   res.send('createReviewRoute')
}
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