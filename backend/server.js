import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {neon}  from '@neondatabase/serverless';
import { clerkMiddleware ,requireAuth} from '@clerk/express'
import routes from './routes/route.js';
import connectToCloudinary from './config/cloudinary.js';
const app = express();

// Frontend origin(s). Set ALLOWED_ORIGINS as a comma-separated list in production.
const defaultAllowedOrigins = [
    'http://localhost:5173',
    'https://visionaryai-f.onrender.com',
    'https://shobhitsri.me',
    'https://www.shobhitsri.me'
];

const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
}));
connectToCloudinary();
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api',requireAuth(),routes);

const PORT=process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send('API is running....');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})