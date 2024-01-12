import { plainToClass } from "class-transformer"
import { NextFunction, Request, Response } from "express"
import { validate } from "class-validator"
import { CreateCustomerInputs, EditCustomerInputs, LoginCustomerInputs } from "../../dto"
import { generateOTP, generateSalt, generateSignature, hashPassword, isValidatePassword, onRequestOTP } from "../../utility"
import { Customer } from "../../models"

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerInputs = plainToClass(CreateCustomerInputs, req.body)
        const inputsErrors = await validate(customerInputs, {validationError: {target: true}})

        if(inputsErrors.length) {
            return res.status(400).json(inputsErrors)
        }

        const {email, phone, password} = customerInputs;

        const salt = await generateSalt()
        const hashedPassword = await hashPassword(password, salt)
        const {otp, otp_expiry} = generateOTP()

        const newCustomer = await Customer.create({
            email, phone, password: hashedPassword, salt, otp, otp_expiry
        })

        if(newCustomer) {
            // Envoyer le OTP au client
            await onRequestOTP(otp, phone)

            // Generer le token JWT
            const signature = generateSignature({
                _id: newCustomer._id,
                email: newCustomer.email,
                verified: newCustomer.verified
            })

            // Envoyer les donnees au server client
            return res.status(201).json({signature, verified: newCustomer.verified, email: newCustomer.email})
        }
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginInputs = plainToClass(LoginCustomerInputs, req.body);
        const inputErrors = await validate(loginInputs, {validationError: {target: true}})

        if(inputErrors.length) {
            return res.status(400).json(inputErrors)
        }

        const {email, password} = loginInputs;
        const customer = await Customer.findOne({email});

        if(customer) {
            const isPasswordValid = await isValidatePassword(password, customer.password, customer.salt)

            if(isPasswordValid) {
                const signature = generateSignature({
                    _id: customer._id,
                    email: customer.email,
                    verified: customer.verified
                })
                return res.status(200).json({success: true, data: signature, error: null})
            }
        }
        return res.status(403).json({success: false, data: null, error : {message: "Invalid credentials", error: 409}})


    } catch (error) {
        next(error)
    }
}

export const customerVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {otp} = req.body;
        const customer = req.user;

        if(customer) {
            const profile = await Customer.findById(customer._id)
            if(profile) {
                if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                    profile.verified = true;
                    const updatedCustomer = await profile.save()

                    const signature = generateSignature({
                        _id: updatedCustomer._id,
                        email: updatedCustomer.email,
                        verified: updatedCustomer.verified
                    })
                    return res.status(200).json({signature, verified: updatedCustomer.verified, email: updatedCustomer.email})
                }
                return res.status(400).json({success: false, data: null, error: {message: "Erreur avec l'OTP saisi", code: 400}})
            }
        }

    } catch (error) {
        next(error)
    }
}

export const requestOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if(customer) {
            const profile = await Customer.findById(customer._id);

            if(profile) {
                const {otp, otp_expiry} = generateOTP();

                profile.otp = otp;
                profile.otp_expiry = otp_expiry;

                await profile.save();
                await onRequestOTP(otp, profile.phone)

                return res.status(200).json({message: "OTP sent to your registered phone number"})
            }
        }

        return res.status(400).json({success: false, data: null, error: {message: "Error with request OTP", code: 400}})
    } catch (error) {
        next(error)
    }
}

export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        if(customer) {
            const profile = await Customer.findById(customer._id);
            console.log(profile)
            if(profile) {
                return res.status(200).json({success: true, data: profile, error: null})
            }
        }
        return res.status(400).json({success: true, data: null, error: {message: "Error with fetch profile", code: 400}})
    } catch (error) {
        next(error)
    }
}

export const updateCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        const profileInputs = plainToClass(EditCustomerInputs, req.body);
        const profileErrors = await validate(profileInputs, {validationError: {target: true}});

        if(profileErrors.length) {
            return res.status(400).json(profileErrors)
        }

        if(customer) {
            const updatedCustomer = await Customer.findByIdAndUpdate(customer._id, {$set: profileInputs}, {new: true})

            return res.status(200).json({success: true, data: updatedCustomer, error: null})
        }

        return res.status(400).json({success: false, data: null, error: {message: "Error with editing profile", code: 400}})

    } catch (error) {
        next(error)
    }
}
