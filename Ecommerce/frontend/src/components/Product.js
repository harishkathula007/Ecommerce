import { Link,useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import axios from 'axios'
import { useContext ,useState} from "react";
import { Store } from "../Store";
function Product(props)
{
    let [out,setOUT]=useState(false);
    let navigate=useNavigate();
    const {product}=props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

    const addToCartHandler = async (item) => {
        const existItem=cartItems.find((x)=>x._id==product._id)
        const quantity=existItem?existItem.quantity+1:1;
        const { data } = await axios.get(`/product/${item._id}`);
        if (data.countInStock < quantity) {
            setOUT(true);
           window.alert('Sorry. Product is out of stock');
          return;
        }
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...item, quantity },
        });
        toast.success("Item added to cart")
        // navigate("/cart");
      };
    return ( <Card key={product.slug} className="product">
    <Link to={`/product/slug/${product.slug}`}><img src={product.image}></img> </Link>
    
    {/* <div className="product-info"> */}
    <Card.Body>
    <Link to={`/product/slug/${product.slug}`}>${product.name}</Link>
    
    <Card.Title> <strong>${product.price} </strong></Card.Title>
    <Card.Text> {product.brand}</Card.Text>
    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
    {
    out?<Button variant="light" disabled>Out Of Stock</Button>:
    <Button className="btn btn-warning btn-outline-danger" onClick={()=>addToCartHandler(product)}> Add to cart</Button>
   
    }
    </Card.Body>
    {/* </div> */}
    </Card>);

}
export default Product;