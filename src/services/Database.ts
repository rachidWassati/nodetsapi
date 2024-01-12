import mongoose from "mongoose"

export default async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("✅ Connection to DB Established"))
        .catch(err => console.error(err))
}