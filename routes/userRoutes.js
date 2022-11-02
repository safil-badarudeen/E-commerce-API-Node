const express = require('express')
const router = express.Router()
const{ getAllUsers,
       getSingleUser,
       showCurrentUser,
       updateUser,
       updatePassword}=require('../controllers/userController')
       
const {authenticateUser,authorizePermission}=require('../middleware/authentication')

router.route('/').get(authenticateUser,authorizePermission ,getAllUsers)
router.route('/showMe').get(showCurrentUser)
router.route('/updatePassword').patch(updatePassword)
router.route('/updateUser').patch(updateUser)
router.route('/:id').get(getSingleUser)

module.exports = router