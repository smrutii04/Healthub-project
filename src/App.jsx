import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OrderMedicines from './components/E-Pharmacy/OrderMedicines'

function App() {

  return (
    
    <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home/>} />
          <Route path="/order-medicines" exact={true} element={<OrderMedicines/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
