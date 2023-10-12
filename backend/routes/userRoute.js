const express = require('express')
const { registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser} = require('../controllers/userController');
const protect = require('../Middlewares/authMiddleware');

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/user', protect, getUser)
router.get('/loggedin', loginStatus)
router.patch('/update/:id', protect,updateUser)







module.exports = router