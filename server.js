import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth/auth-routes.js';

mongoose.connect(
    'mongodb+srv://shubhambadiwal2:Wp07WDklkovSQ49v@cluster2.josdk.mongodb.net/'
).then(() => console.log('MongoDB connected'))
.catch(error => console.log(error));

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);

app.listen(PORT, () => console.log(`Server is now running on the port ${PORT}`));