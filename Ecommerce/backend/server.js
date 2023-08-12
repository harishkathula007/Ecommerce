import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import data from './data.js'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(()=>
{
    console.log("Connected to Database");
}
).catch((err)=>
{
  console.log(err.message);
})
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/seed',seedRouter);
app.use('/product',productRouter);
app.use('/user',userRouter);
app.use('/orders',orderRoutes);
app.use((err,req,res,next)=>
{
    res.status(500).send({message:err.message});
})
app.listen(5000,(req,res)=>
{
    console.log("Server Running at 5000");
})

