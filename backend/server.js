import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {neon}  from '@neondatabase/serverless';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import routes from './routes/route.js';
import connectToCloudinary from './config/cloudinary.js';
const app =express();
import('canvas').then((canvasPkg) => {
  const { DOMMatrix, ImageData, Path2D } = canvasPkg;
  if (!globalThis.DOMMatrix) globalThis.DOMMatrix = DOMMatrix;
  if (!globalThis.ImageData) globalThis.ImageData = ImageData;
  if (!globalThis.Path2D) globalThis.Path2D = Path2D;
}).catch(e => console.warn('canvas missing', e));

app.use(cors());
connectToCloudinary();
app.use(express.json());
app.use(clerkMiddleware());
app.use(requireAuth());
app.use('/api',routes);

const PORT=process.env.PORT || 5000;


app.get('/',(req,res)=>{
    const sql = neon(`${process.env.DATABASE_URL}`);
    res.send('API is running....');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})