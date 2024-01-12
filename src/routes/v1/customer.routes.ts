import express from 'express'
import { customerVerify, getCustomerProfile, login, requestOTP, signup, updateCustomerProfile } from '../../controllers/v1'
import { authenticate } from '../../middlewares'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.use(authenticate)
router.patch('/verify', customerVerify)
router.get('/otp', requestOTP)
router.get('/profile', getCustomerProfile)
router.patch('/profile', updateCustomerProfile)

export {router as CustomerRoute}