
import data from './data'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import{LinkContainer} from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store.js';
import CartScreen from './screens/CartScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import { useContext } from 'react';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAdressScreen.js'
import SignupScreen from './screens/SignUpScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import FinalScreen from './screens/FinalScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import Profile from './screens/Profile';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart,userInfo}=state;
  const signoutHandler = () => {
    ctxDispatch({ type:'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    
  };
  console.log(data.products);
  return (
    <BrowserRouter>
    <div  className='d-flex flex-column site-container'>
    <ToastContainer position="bottom-center" limit={1}/>
      <header >
      <Navbar bg="dark" variant="dark">
        <Container>
         <LinkContainer to="/">
           <Navbar.Brand onClick={HomeScreen.fetchData}>Amazon</Navbar.Brand>
         </LinkContainer>
         <Nav className= "nav-link">
          <Link to="/cart" className="nav-link">
            Cart &ensp;{
              cart.cartItems.length>0&&(<Badge pill bg="danger">{cart.cartItems.reduce((a,c)=>a+c.quantity,0)}</Badge>)
            }
          </Link>
          {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
         </Nav>
        </Container>
      </Navbar>
       
      </header>
      <main>
      <Container className="mt-3">
      <Routes>
        <Route path="/" element=<HomeScreen></HomeScreen>>
        
        </Route>
        <Route path="/cart" element=<CartScreen></CartScreen>>
        
        </Route>
        <Route path="/signin" element=<SigninScreen></SigninScreen>>
        
        </Route>
        <Route path="/product/slug/:slug" element=<ProductScreen></ProductScreen>></Route>
        <Route path="/signup" element=<SignupScreen></SignupScreen>></Route>
        <Route path="/shipping" element=<ShippingAddressScreen></ShippingAddressScreen>>
        
        </Route>
        <Route path="/placeorder" element=<PlaceOrderScreen></PlaceOrderScreen>>
        
        </Route>
        <Route path="/final" element=<FinalScreen></FinalScreen>>
        
        </Route>
        <Route path="/payment" element=<PaymentMethodScreen></PaymentMethodScreen>>
        
        </Route>
        
        <Route path="/orderhistory" element=<OrderHistoryScreen></OrderHistoryScreen>>
        
        </Route>
        
        <Route path="/profile" element=<Profile></Profile>>
        
        </Route>
      </Routes>
      
      </Container>


      </main>
      <div className='text-center mt-5'> All Rights Reserved </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
