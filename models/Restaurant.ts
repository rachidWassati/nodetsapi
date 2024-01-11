import mongoose, { Document, Schema } from "mongoose";


// Je creer un document
interface RestaurantDoc extends Document {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalcode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    foods: [any];
}

// Je creer un schema
const RestaurantSchema = new Schema<RestaurantDoc>({
    name: {type: String, required: true},
    ownerName: {type: String, required: true},
    foodTypes: {type: [String], default: []},
    postalcode: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    serviceAvailable: {type: Boolean, default: false},
    coverImages: {type: [String], default: []},
    rating: {type: Number, default: 0.0},
    foods: {type: [String], default: []},
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret, options) {
            delete ret.password;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v
        }
    }
})

// Je creer un model
const Restaurant = mongoose.model<RestaurantDoc>('restaurant', RestaurantSchema);

export { Restaurant };