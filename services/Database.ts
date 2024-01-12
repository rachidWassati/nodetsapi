import mongoose from "mongoose"
import { MONGO_URI } from "../config/dbConnection"


export default async () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("✅ Connection to DB Established"))
        .catch(err => console.error(err))
}