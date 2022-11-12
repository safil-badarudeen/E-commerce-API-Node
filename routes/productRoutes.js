const express = require('express')
const router = express.Router()
const { authenticateUser,authorizePermission } = require('../middleware/authentication')


const {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    uploadImage,
    deleteProduct,} = require('../controllers/productController')


router
.get('/',authenticateUser,getAllProduct)

//upload image route before params id routes, it is considering as an id

router
.post('/uploadImage',authenticateUser,authorizePermission('admin'),uploadImage)



router
.post('/createProduct',authenticateUser,authorizePermission('admin'),createProduct)

router
.patch('/updateProduct/:id',authenticateUser,authorizePermission('admin'),updateProduct)

router
.delete('/deleteProduct/:id',authenticateUser,authorizePermission('admin'),deleteProduct)

router
.get('/:id',authenticateUser,getSingleProduct)

module.exports = router