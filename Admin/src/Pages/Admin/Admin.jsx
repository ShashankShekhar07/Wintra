import React from 'react'
import './Admin.css'
import Sidebar from '../../Component/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Component/AddProduct/AddProduct'
import ListProduct from '../../Component/ListProduct/ListProduct'
import Orders from '../../Component/Orders/Orders'

const Admin = () => {
  const url = "https://wintra-backend.onrender.com/"
  return (
    <div className="admin">
        <Sidebar/>
        <Routes>
            <Route path="/addproduct" element={<AddProduct url={url}/>}/>
            <Route path="/listproduct" element={<ListProduct url={url}/>}/>
            <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>        
    </div>
  )
}

export default Admin