import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { restaurantPayload } from '../dto';
import { SECRET_KEY } from '../config';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';

export const generateSalt = async () => {
    return await bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const isValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await hashPassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = (payload: AuthPayload) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'});
}

export const isValidateSignature = async (req: Request) => {
    const signature = req.get('Authorization') // {'Authorization' : "Bearer jkdfsjkdfjksjsjdsjkdsjkfjjdsjdfsjdfs"}
    if(signature) {
        const payload = jwt.verify(signature.split(' ')[1], SECRET_KEY) as AuthPayload
        req.user = payload;
        return true;
    }
    return false;
}