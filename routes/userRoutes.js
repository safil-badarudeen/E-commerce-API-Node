const express = require('express')
const router = express.Router()
const{ getAllUsers,
       getSingleUser,
       showCurrentUser,
       updateUser,
       updatePassword}=require('../controllers/userController')
       
const {authenticateUser,authorizePermission}=require('../middleware/authentication')

router.route('/').get(authenticateUser,authorizePermission('admin','owner') ,getAllUsers)
router.route('/showMe').get(authenticateUser,showCurrentUser)
router.route('/updatePassword').patch(authenticateUser,updatePassword)
router.route('/updateUser').patch(authenticateUser,updateUser)
router.route('/:id').get(getSingleUser)

module.exports = router