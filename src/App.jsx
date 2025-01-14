import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OrderMedicines from './components/E-Pharmacy/OrderMedicines'
import BookAppointments from './components/consultation/BookAppointments'
import RoomPage from './components/meeting/RoomPage'
function App() {

  return (
    
    <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home/>} />
          <Route path="/order-medicines" exact={true} element={<OrderMedicines/>} />
          <Route path="/book" exact={true} element={<BookAppointments/>} />
          <Route path="/room" exact={true} element={<RoomPage roomId={"rakesh"}/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
