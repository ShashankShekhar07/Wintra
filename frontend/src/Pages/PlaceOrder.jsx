import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import './CSS/PlaceOrder.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const {getTotalCartAmount,token,all_product,cartItems} = useContext(ShopContext);
    const [data,setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const onChangeHandler = (e) =>{
        const name =e.target.name;
        const value= e.target.value;
        setData(data=>({...data,[name]:[value]}))
    }
    const placeOrder =async(e)=>{
        e.preventDefault();
        let orderItems = [];
        all_product.map((item)=>{
            if(cartItems[item.id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item.id]
                orderItems.push(itemInfo);
            }
        })
   
        
        // console.log(orderItems)
        let orderData={
            // id: "667593e3e375efbf054f1e1c",/
            address: data,
            items: orderItems,
            amount: getTotalCartAmount()+2,
        }

        console.log(orderData,data);

    let response = await fetch("https://wintra-backend.onrender.com//place", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
  
      response = await response.json();
  
      if (response.success) {
        const { session_url } = response;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.message); // Provide more specific error message (if available)
      }
    };
    const navigate = useNavigate();
useEffect(()=>{
        if(!token){
            navigate('/cart');
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart');
        }
},[token])

    return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
                <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name"/>
                <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name"/>
            </div>
            <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
            <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
            <div className="multi-fields">
                <input required name="city" onChange={onChangeHandler} value={data.city}  placeholder="City"/>
                <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/>
            </div>
            <div className="multi-fields">
                <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="ZipCode"/>
                <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/>
            </div>
            <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className="cartitems-total">
                <h1>cart total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>${getTotalCartAmount()===0?0:2}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</h3>
                    </div>
                </div>
                <button type='submit'>PROCEED TO PAYMENT</button>
            </div>
        </div>
    </form>
  )
}

export default PlaceOrder