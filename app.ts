import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/dbConnection';
import { errorHandler } from './middlewares';
import { apiRoute } from './routes/api.routes';

const app = express();

mongoose.connect(MONGO_URI)
        .then(() => console.log("✅ Connection to DB Established"))
        .catch(err => console.error(err))

app.use(express.json())

app.use('/api', apiRoute)

app.use(errorHandler);

app.listen(8000, () => {
    console.clear();
    console.log("✅ Connection Established")
})