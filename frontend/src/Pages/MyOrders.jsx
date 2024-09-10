import React, { useContext, useEffect, useState } from 'react'
import './CSS/myOrders.css'
import { ShopContext } from '../Context/ShopContext';
import parcel from "../Components/Assets/parcel_icon.png"
const MyOrders = () => {

    const {url,token} = useContext(ShopContext);
    const [data,setdata] = useState([]);

    const fetchOrders = async()=>{
        
        const url = "https://wintra.onrender.com/userorders"; // Replace with your backend URL

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Optional, may not be required by your backend
              'auth-token': `${localStorage.getItem('auth-token')}`,
            },
            body: JSON.stringify({}), // Empty body for GET-like requests (optional)
          });
      
          const data = await response.json();
      
          if (response.ok) { // Check for successful response (status code 200-299)
            setdata(data.data);
            console.log(data.data);
          } else {
            console.error("Error fetching user orders:", response.statusText);
            // Handle error gracefully (e.g., display an error message to the user)
          }
        } catch (error) {
          console.error("Error fetching user orders:", error);
          // Handle error gracefully (e.g., display an error message to the user)
        }
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

 
  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <img src={parcel} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length -1 ){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity + " , "
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders