import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    const formattedError = {
        message: err.message || 'An error occurs', 
        code: (err as any).statusCode || 500
    }

    return res.status(formattedError.code).json({success: false, data: null, error: formattedError})
}