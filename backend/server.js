import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import routes from './routes/route.js';
import connectToCloudinary from './config/cloudinary.js';
const app = express();

const defaultAllowedOrigins = [
    'http://localhost:5173',
    'https://visionaryai-web.onrender.com',
];


/** @param {string} value */
const normalizeOrigin = (value) => {
    try {
        return new URL(value).origin;
    } catch {
        return value.replace(/\/+$/, '');
    }
};

const allowedOrigins = (process.env.ALLOWED_ORIGINS || defaultAllowedOrigins.join(','))
  .split(',')
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);



app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const normalizedRequestOrigin = normalizeOrigin(origin);
        if (allowedOrigins.includes(normalizedRequestOrigin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
connectToCloudinary();
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api', routes);

const PORT=process.env.PORT || 5050;


app.get('/',(req,res)=>{
    res.send('API is running....');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})