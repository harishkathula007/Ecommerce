import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState,useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from "../components/Rating";
import Card  from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/esm/Button";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from "../Store.js";
import { useNavigate } from "react-router-dom";

const reducer=(state,action)=>{
  switch(action.type)
  {
     case 'FETCH_REQUEST':
        return {...state,loading:true};
     case 'FETCH_SUCCESS':
         return {...state,product:action.payload,loading:false};   
     case 'FETCH_FAIL    ':
      return {...state,error:action.payload,loading:false};
     default:
        return state; 
   }
};
 
function ProductScreen()
{
  const param=useParams();
  const {slug}=param;
  const navigate=useNavigate();
  const[{loading,error,product},dispatch]=useReducer(reducer,{loading:true,error:'',products:[] });
  
   useEffect(()=>
   {
   const fetchData=async()=>
   {
      dispatch({type:'FETCH_REQUEST'});
      try{
         let res=await axios.get(`/product/slug/${slug}`);
         dispatch({type:'FETCH_SUCCESS',payload:res.data})
      }catch(err)
      {
         dispatch({type:'FETCH_FAIL',payload:err.message})
      }
      
      //setProdroducts(res.data);
   }; 
   fetchData();
   },[slug])
   
   const {state,dispatch:ctxDispatch}=useContext(Store);
   const {cart}=state;
   const addToCartHandler=async()=>
   {

      const existItem=cart.cartItems.find((x)=>x._id===product._id)
      const quantity=existItem?existItem.quantity+1:1;
      const {data}=await axios.get(`/product/${product._id}`)
      if(data.countInStock<quantity)
      {
        toast.error("Sorry The stock is Limited ");
        return ;
      }
      ctxDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity}});
      toast.success("Item added to cart");
      
  navigate("/cart");
   }
  return(
    <div>
     {loading?<LoadingBox></LoadingBox>:error?<MessageBox variant="danger">{error}</MessageBox>:<div>
      <Row>
        <Col md={6}> <img src={product.image}></img></Col>
        <Col md={3}> 
        <ListGroup>
          <ListGroup.Item>
            <h1> {product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
          </ListGroup.Item>
          <ListGroup.Item>
            Price : ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>
            Description : {product.description}
          </ListGroup.Item>
        </ListGroup>
        
        </Col>
        <Col md={3}> 
        <Card>
          <Card.Body>
          <ListGroup>
          <ListGroup.Item>
            price $: {product.price}
          </ListGroup.Item>
          {/* <ListGroup.Item>
            {/* {product.countInStock>state.quantity?<Badge bg="success">Aviliable</Badge> :<Badge bg="danger"> Not Aviliable</Badge>}  }
          </ListGroup.Item> */}
          
          
            <Button className="btn btn-warning btn-outline-dark  my-3" onClick={addToCartHandler} > Add to Cart</Button>
            
          
        </ListGroup>

          </Card.Body>
        </Card>
        </Col>
      </Row>
     </div>}
    
    </div>
  )

}
export default ProductScreen;