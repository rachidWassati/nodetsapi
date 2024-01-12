import express from 'express'
import { v1Route } from './v1'

const router = express.Router()

router.use('/v1', v1Route)

export {router as apiRoute}