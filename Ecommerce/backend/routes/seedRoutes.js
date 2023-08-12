 import Product from "../models/ProductModel.js";
 import express from 'express'
 import data from '../data.js'
 import User from "../models/UserModel.js";
 const seedRouter=express.Router();
 seedRouter.get("/",async(req,res)=>
 {
    //console.log(data.products);
   //  console.log("hello");
     await Product.deleteMany({});
     await User.deleteMany({});
    const createdProducts= await Product.insertMany(data.products);
    console.log("created =",createdProducts);
    const createdUsers= await User.insertMany(data.users);
    console.log("created =",createdProducts);
    res.send({createdProducts,createdUsers})
 })

 export default seedRouter;