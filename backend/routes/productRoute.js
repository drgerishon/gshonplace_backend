const express = require('express')
const router = express.Router()
const protect = require('../Middlewares/authMiddleware');
const { createProduct, getProducts, getProduct, deleteProduct, deleteReview,reviewProduct, updateProduct} = require('../controllers/productController');
const adminOnly = require('../Middlewares/adminMiddleware');


router.post('/',protect, adminOnly, createProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.delete('/:id',protect, adminOnly, deleteProduct)
router.patch('/:id',protect, adminOnly, updateProduct)
router.patch('/review/:id',protect, reviewProduct)
router.delete('/review/:id',protect, deleteReview)



module.exports = router