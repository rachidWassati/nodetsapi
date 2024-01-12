import { IsEmail, Length } from "class-validator";

export class CreateCustomerInputs {
    @IsEmail()
    email: string;

    @Length(10)
    phone: string;

    @Length(6)
    password: string;
}

export class LoginCustomerInputs {
    @IsEmail()
    email: string;

    password: string;
}

export interface CustomerPayload {
    _id: string;
    email: string;
    verified: boolean;
}

export class EditCustomerInputs {
    @Length(5)
    firstname: string;

    @Length(5)
    lastname: string;

    @Length(5)
    address: string;
}