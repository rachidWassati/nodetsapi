import express from "express"
import { createFood, getFoods, getProfile, restaurantLogin, updateCoverImages, updateProfile, updateServiceAvailable } from "../../controllers/v1"
import { authenticate, imagesMiddleware } from "../../middlewares"

const router = express.Router()

router.post('/login', restaurantLogin)

router.use(authenticate)
router.get('/profile', getProfile)
router.patch('/profile', updateProfile)
router.patch('/cover-images', imagesMiddleware, updateCoverImages)
router.patch('/service', updateServiceAvailable)

router.post('/food',imagesMiddleware, createFood) // multer va injecter a 'req' la propriete 'files'
router.get('/foods', getFoods)

export {router as RestaurantRoute}