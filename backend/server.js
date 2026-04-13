import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {neon}  from '@neondatabase/serverless';
import { clerkMiddleware ,requireAuth} from '@clerk/express'
import routes from './routes/route.js';
import connectToCloudinary from './config/cloudinary.js';
const app = express();

// Only allow the requested frontend origins.
const allowedOrigins = 'http://localhost:5173'
    
    


/** @param {string} value */
const normalizeOrigin = (value) => {
    try {
        return new URL(value).origin;
    } catch {
        return value.replace(/\/+$/, '');
    }
};



app.use(cors({
  origin: "*"
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