import { ACCOUNT_SID, AUTH_TOKEN, PHONE_NUMBER } from "../config/twilio"


export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    let otp_expiry = new Date()
    otp_expiry.setTime(new Date().getTime() + (30 * 60 * 1000))

    return {otp, otp_expiry}
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)

    const response = await client.messages.create({
        body: `Your OTP code is : ${otp}`,
        from: PHONE_NUMBER,
        to: `+33${toPhoneNumber}`
    })

    return response;
}