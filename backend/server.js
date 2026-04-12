import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {neon}  from '@neondatabase/serverless';
import { clerkMiddleware ,requireAuth} from '@clerk/express'
import routes from './routes/route.js';
import connectToCloudinary from './config/cloudinary.js';
const app = express();

// Only allow the requested frontend origins.
const allowedOrigins = [
    'http://localhost:5173',
    'https://visionaryai-f.onrender.com',
    'https://shobhitsri.me'
];

/** @param {string} value */
const normalizeOrigin = (value) => {
    try {
        return new URL(value).origin;
    } catch {
        return value.replace(/\/+$/, '');
    }
};

const corsOptions = {
    /**
     * @param {string | undefined} origin
     * @param {(err: Error | null, allow?: boolean) => void} callback
     */
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const normalizedRequestOrigin = normalizeOrigin(origin);
        if (allowedOrigins.includes(normalizedRequestOrigin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
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