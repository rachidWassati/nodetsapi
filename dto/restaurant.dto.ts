
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