import app from './app';
import { connectSQL } from './config/db.sql';
import { connectMongo } from './config/db.mongo';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectSQL();
    await connectMongo();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
