import express from 'express';
import App from './services/ExpressApp'
import DbConnection from './services/Database'


const startServer = async () => {
    const app = express();
    await App(app)
    DbConnection()

    app.listen(8000, () => {
        console.clear();
        console.log("✅ Connection Established")
    })
}

startServer()