import express from 'express'
import { displayRestaurant, getFoodsIn30min, getRestaurantsAvailable, getTopRestaurants, searchFoods } from '../../controllers/v1';

const router = express.Router();

router.get('/:postalcode', getRestaurantsAvailable) // liste des plats disponibles dans une ville en particulier
router.get('/top-restaurants/:postalcode/:limit', getTopRestaurants) // le top 5 des restaurants les mieux notes dans une ville particuliere
router.get('/foods-in-30-minutes/:postalcode', getFoodsIn30min) // la liste des plats livres en moins de 30 minutes dans une ville particuliere
router.get('/search/:postalcode', searchFoods) // recherche de plats dans une ville en particulier
router.get('/show-restaurant/:id', displayRestaurant) // Affiche les details d'un restau en particulier

export {router as ShoppingRoute}