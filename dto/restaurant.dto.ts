
export interface CreateRestaurantInputs {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalcode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface LoginRestaurantInputs {
    email: string;
    password: string;
}

export interface restaurantPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];
}