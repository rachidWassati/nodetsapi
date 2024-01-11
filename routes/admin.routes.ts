import express, { Router } from "express"
import { createRestaurant, getRestaurantById, getRestaurants } from "../controllers"

const router = express.Router()

router.post('/restaurant', createRestaurant)
router.get('/restaurants', getRestaurants)
router.get('/restaurant/:id', getRestaurantById) // id: parametre de route

export {router as AdminRoute}