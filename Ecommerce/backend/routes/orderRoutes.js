import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import {isAuth} from "../utils.js";
const orderRoutes=express.Router();
orderRoutes.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const newOrder = new Order(
        {
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice, 
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      
      });
  
      const order = await newOrder.save();
     // const {data}=Order.put(`/orders/${order._id}/pay`,order,{ headers:{authorization: `Bearer ${userInfo.token}`}});
      console.log("oRDER = ",order);
      order.isDelivered=true;
      order.isPaid=true;
      await order.save();
      console.log("oRDER = ",order);
      res.status(201).send({ message: 'New Order Created', order });
    })
  );
  orderRoutes.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    })
  );
  
     
orderRoutes.get(
        '/:id',
        isAuth,
        expressAsyncHandler(async (req, res) => {
        const order=await Order.findById(req.params.id);
        if(order)
        res.send(order);
        else
        res.status(404).send({ message:'Order Not Found' });
    })
  );
  

 export default orderRoutes;
