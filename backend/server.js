import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {neon}  from '@neondatabase/serverless';
import { clerkMiddleware ,requireAuth} from '@clerk/express'
import routes from './routes/route.js';
import connectToCloudinary from './config/cloudinary.js';
const app = express();

// Frontend origin (set CLIENT_URL in Render env). Defaults to Vite dev server URL.
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors());
connectToCloudinary();
app.use(express.json());
app.use(clerkMiddleware());
app.use(requireAuth())
app.use('/api',routes);

const PORT=process.env.PORT || 5000;


app.get('/',(req,res)=>{
    // const sql = neon(`${process.env.DATABASE_URL}`);
    res.send('API is running....');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})