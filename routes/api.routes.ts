import express from 'express'
import { v1Route } from './v1'
import { API_VERSION } from '../config'

const router = express.Router()

router.use('/v1', v1Route)

export {router as apiRoute}