const Order = require('../models/order');
const Product = require('../models/products');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');


const  createOrder = async (req,res) =>{
    res.send('create order route')
}

const  getSingleOrder = async (req,res) =>{
    res.send('get single order route')
}


const getCurrentUserOrders = async (req,res) =>{
    res.send('get current user order route')
}


const  getAllOrders = async (req,res) =>{
    res.send('getall order route')
}


const  updateOrder = async (req,res) =>{
    res.send('update order route')
}




module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
  };
  