import React, { useCallback, useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from "../Assets/logo.png"
import logoo from "../Assets/logoo.jpg"
import cart_icon from "../Assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_drop from "../Assets/navdrop.png"


const Navbar = () => {
    const {getTotalCartItems} =useContext(ShopContext);
    const [menu,setMenu]  = useState("shop");
    const menuRef = useRef();

    const dropdown_toggle =(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'> 
        <div className='nav-logo'>
            <img src={logoo} alt=""/>
            <p>WINTRA</p>
        </div>
        <img className='nav-dropdown' src={nav_drop} alt="" onClick={dropdown_toggle}/>
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to="/">Shop</Link>{menu==="shop"?<hr/>: <></>}</li>
            <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration: 'none'}} to="/men">Men</Link>{menu==="men"?<hr/>: <></>}</li>
            <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration: 'none'}} to="/women">Women</Link>{menu==="women"?<hr/>: <></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to="/kids">Kids</Link>{menu==="kids"?<hr/>: <></>}</li>
        </ul>
        <div className='nav-login-cart'>
            {localStorage.getItem('auth-token')? <button className='button-85'onClick={()=>{window.location.replace('/myorders')}}>My orders</button>:<></> }
            {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:<Link to="/login"><button>Login</button></Link> }
            
            <Link to="/cart"><img src={cart_icon} alt="cart icon" /></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar