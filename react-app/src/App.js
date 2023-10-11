import Home from "./screens/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./screens/Cart";
import MyOrder from "./screens/MyOrders";


function App() {
  return (
    <>

    <CartProvider>
      <Router>

        <Routes>

          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/createUser' element={<Signup/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/myorder' element={<MyOrder/>} />

        </Routes>

      </Router>
    </CartProvider>
    </>
  );
}

export default App;
