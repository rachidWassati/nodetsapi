import { CustomerPayload } from "./customer.dto";
import { restaurantPayload } from "./restaurant.dto";


export type AuthPayload = restaurantPayload | CustomerPayload  // | clientPayload | deliverPayload