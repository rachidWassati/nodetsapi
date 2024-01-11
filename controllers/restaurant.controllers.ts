import { NextFunction, Request, Response } from "express";
import { LoginRestaurantInputs } from "../dto";
import { findRestaurant } from "./admin.controllers";
import { generateSignature, isValidatePassword } from "../utility";


export const restaurantLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = <LoginRestaurantInputs>req.body;
        const restaurant = await findRestaurant(undefined, email);

        if(restaurant) {
            const isValidPassword = await isValidatePassword(password, restaurant.password, restaurant.salt)
            if(isValidPassword) {
                const signature = generateSignature({
                    _id: restaurant.id,
                    email: restaurant.email,
                    name: restaurant.name,
                    foodTypes: restaurant.foodTypes
                })

                return res.status(200).json({success: true, data: signature, error: null});
            }
        }

        return res.status(401).json({message: "Login credentials not valid"})
    } catch (error) {
        next(error)
    }
}


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(user) {
            const restaurant = await findRestaurant(user._id)
            return res.status(200).json({success: true, data: restaurant, error: null})
        }
    } catch (error) {
        next(error)
    }
}
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
export const updateServiceAvailable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
}