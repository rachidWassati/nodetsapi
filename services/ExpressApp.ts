import express, { Application } from "express"
import { apiRoute } from "../routes/api.routes"
import { errorHandler } from "../middlewares"
import cors from 'cors';


export default async(app: Application) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use('/api', apiRoute)

    app.use(errorHandler);

    return app;
}