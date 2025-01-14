import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OrderMedicines from './components/E-Pharmacy/OrderMedicines'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from './components/E-Pharmacy/Cart/CartContext';
import CartPage from './components/E-Pharmacy/Cart/CartPage';
import ProductDetails from './components/E-Pharmacy/AllProducts/ProductDetails';

function App() {

  return (
    
   <CartProvider>
     <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home/>} />
          <Route path="/order-medicines" exact={true} element={<OrderMedicines/>} />
          <Route path="/cart" exact={true} element={<CartPage/>} />
          <Route path="/all-medicines" exact={true} element={<ProductDetails/>} />
        </Routes>
    </BrowserRouter>
   </CartProvider>
  )
}

export default App
