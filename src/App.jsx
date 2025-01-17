import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OrderMedicines from './components/E-Pharmacy/OrderMedicines'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from './components/E-Pharmacy/Cart/CartContext';
import CartPage from './components/E-Pharmacy/Cart/CartPage';
import ProductDetails from './components/E-Pharmacy/AllProducts/ProductDetails';
import BookAppointments from './components/consultation/BookAppointments'
import RoomPage from './components/meeting/RoomPage'
import Checkout from './components/E-Pharmacy/CheckoutPage/Checkout'
import MedicineSchedule from './components/MedicineSchedule-Feature/MedicineSchedule'
import { useState } from 'react'


function App() {

  const [user, setUser] = useState(null);
  const userId = JSON.parse(localStorage.getItem('userId'));
  return (
   <CartProvider>
     <BrowserRouter>
        <Routes>
  

          <Route path="/" exact={true} element={<Home  user={user} />} />
          {/* <Route path={`/${userId}`} exact={true} element={<Home  user={user} />} /> */}
          <Route path="/order-medicines" exact={true} element={<OrderMedicines/>} />
          <Route path={`cart`} exact={true} element={<CartPage/>} />
          <Route path="/all-medicines" exact={true} element={<ProductDetails/>} />
          <Route path="/book" exact={true} element={<BookAppointments/>} />
          <Route path="/room" exact={true} element={<RoomPage roomId={"rakesh"}/>} />
          <Route path="/login-patient" exact={true} element={<Login setUser={setUser} />} />
          <Route path="/signup-patient" exact={true} element={<Signup  />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/medicine-schedule" element={<MedicineSchedule />} />
        </Routes>
    </BrowserRouter>
   </CartProvider>
  )
}

export default App
