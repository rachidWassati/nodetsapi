import { NextFunction, Request, Response } from "express"
import { Restaurant } from "../../models"
import { FoodDoc } from "../../models/Food"
import { findRestaurant } from "./admin.controllers"

export const getRestaurantsAvailable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postalcode = req.params.postalcode
        const restaurants = await Restaurant
                                    .find({postalcode, serviceAvailable: true})
                                    .sort([['rating', 'descending']])
                                    .populate('foods')
        return res.status(200).json({success: true, data: restaurants, error: null})
    } catch (error) {
        next(error)
    }
}

export const getTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {postalcode, limit} = req.params;
        const restaurants = await Restaurant
                                        .find({postalcode, serviceAvailable: true})
                                        .sort([['rating', 'descending']])
                                        .limit(parseInt(limit))
        return res.status(200).json({success: true, data: restaurants, error: null})
    } catch (error) {
        next(error)
    }
}

export const getFoodsIn30min = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postalcode = req.params.postalcode;

        const restaurants = await Restaurant.find({postalcode, serviceAvailable: true}).populate('foods')

        if(restaurants.length) {
            let foodsResult : any = []

            restaurants.map(restaurant => {
                const foods = restaurant.foods as [FoodDoc]
                foodsResult.push(...foods.filter(food => food.readyTime <= 30))
            })
            return res.status(200).json({success: true, data: foodsResult, error: null})

        }
    } catch (error) {
        next(error)
    }
}

export const searchFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postalcode = req.params.postalcode

        const restaurants = await Restaurant.find({postalcode, serviceAvailable: true}).populate('foods');

        if(restaurants.length) {
            let foodsResult: any = []

            restaurants.map(restaurant => {
                foodsResult.push(...restaurant.foods)
            })
            return res.status(200).json({success: true, data: foodsResult, error: null})
        }
    } catch (error) {
        next(error)
    }
}

export const displayRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await findRestaurant(restaurantId);

        if(restaurant) {
            return res.status(200).json({success: true, data: restaurant, error: null})
        }
    } catch (error) {
        next(error)
    }
}
