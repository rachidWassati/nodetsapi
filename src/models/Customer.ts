import mongoose, { Document, Schema } from "mongoose";


interface CustomerDoc extends Document {
    email: string;
    password: string;
    salt: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date;
    lat: number;
    long: number;
}

const CustomerSchema = new Schema<CustomerDoc>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    firstname: {type: String, default: ''},
    lastname: {type: String, default: ''},
    address: {type: String, default: ''},
    phone: {type: String, required: true},
    verified: {type: Boolean, default: false},
    otp: {type: Number, required: true},
    otp_expiry: {type: Date, required: true},
    lat: {type: Number, default: 0},
    long: {type: Number, default: 0},
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret, options) {
            delete ret.password;
            delete ret.__v;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
})

const Customer = mongoose.model<CustomerDoc>('customer', CustomerSchema);

export {Customer}