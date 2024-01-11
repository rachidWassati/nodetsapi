import express from 'express';
import { AdminRoute, RestaurantRoute } from './routes';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/dbConnection';
import { errorHandler } from './middlewares';

const app = express();

mongoose.connect(MONGO_URI)
        .then(() => console.log("✅ Connection to DB Established"))
        .catch(err => console.error(err))

app.use(express.json())

app.use('/admin', AdminRoute)
app.use('/restaurant', RestaurantRoute)

app.use(errorHandler);

app.listen(8000, () => {
    console.clear();
    console.log("✅ Connection Established")
})