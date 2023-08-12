import { useEffect, useState,useReducer } from 'react';
import data from '../data';
import { Link } from 'react-router-dom';
import axios from 'axios'
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer=(state,action)=>{
   switch(action.type)
   {
      case 'FETCH_REQUEST':
         return {...state,loading:true};
      case 'FETCH_SUCCESS':
          return {...state,products:action.payload,loading:false};   
      case 'FETCH_FAIL    ':
       return {...state,error:action.payload,loading:false};
      default:
         return state; 
    }
};
function  HomeScreen() 
{
   //let [products,setProdroducts]=useState([]);
   const[{loading,error,products},dispatch]=useReducer(logger(reducer),{loading:true,error:'',products:[] });
   useEffect(()=>
   {
   const fetchData=async()=>
   {
      dispatch({type:'FETCH_REQUEST'});
      try{
         let res=await axios.get("/product");
         console.log(res);;
         dispatch({type:'FETCH_SUCCESS',payload:res.data})
         
      }catch(err)
      {
         dispatch({type:'FETCH_FAIL',payload:err.message})
      }
      
      //setProdroducts(res.data);
   }; 
   fetchData();
   },[])
     return (
        <div>
                     <h1 className='mb-5 mt-5'> List of featured products</h1>
                     {loading?<LoadingBox></LoadingBox>:error?<MessageBox variant="danger">{error}</MessageBox>:
                     (<div className="products">
         
         <Row>

      
         {
          products.map((product)=>(
            <Col sm={6} md={4} lg={3} className="mb-3">
            <Product product={product}></Product>
           
          </Col>))
         }  
         
       </Row>
         </div>)
      }
        
        </div>
     );
}
export  default HomeScreen;
