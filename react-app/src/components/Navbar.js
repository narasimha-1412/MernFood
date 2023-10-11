import React, { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';

import Modal from "../Modal";

import Cart from '../screens/Cart';


export default function Navbar() {

  const [cartView, setCartView]=useState(false)
  localStorage.setItem('temp', "first")

  let navigate=useNavigate()

  const handlelogout=()=>{

    localStorage.removeItem("authToken")
    navigate("/login")
  }


  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger fixed-top" style={{zIndex:8}}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            MernFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>


              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                 </li> : ""
              }
            </ul>
              {!(localStorage.getItem("authToken"))?
                <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>

                  <Link className="btn bg-white text-success mx-1" to="/createUser">
                    Sign up
                  </Link>
                </div>
                :<div>
                  <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                    <div className="position-relative">
                      My Cart 
                      <span class="right-0 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{items.length}</span>
                    </div>
                  </div>

                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:''}

                  <div className="btn bg-white text-danger mx-2" onClick={handlelogout}>
                    Logout
                  </div>
                </div>
              }
            
          </div>
        </div>
      </nav>
    </div>
  );
}
