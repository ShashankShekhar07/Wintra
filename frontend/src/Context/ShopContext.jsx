import React, { createContext, useEffect, useState } from 'react';
// import all_product from '../Components/Assets/all_product';
export const ShopContext = createContext(null);

const getDefaultCart =()=> {
    let cart ={};
    for(let index=0; index<300+1; index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [all_product,setAll_Product]=useState([]);  
    const [new_collections,setNew_collections]=useState([]); 
    const [token,setToken] = useState("");
    useEffect(()=>{
        fetch('https://wintra-backend.onrender.com/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data));

        if(localStorage.getItem('auth-token')){
            setToken(localStorage.getItem("auth-token"));
            console.log("auth token aa gaya");
            fetch("https://wintra-backend.onrender.com/getcart",{
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:""
            })
            .then((res)=>(res.json()))
            .then((data)=>setCartItems(data));
        }
    },[])
    useEffect(()=>{
        fetch('https://wintra-backend.onrender.com/newcollections')
        .then((response)=>response.json())
        .then((data)=>setNew_collections(data));
    },[])
    
    const addToCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))    ;
        if(localStorage.getItem('auth-token')){
            fetch("https://wintra-backend.onrender.com/addtocart",{
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId": itemId})
            })
            .then((res)=>(res.json()))
            .then((data)=>console.log(data));
        }   
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId] : prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch("https://wintra-backend.onrender.com/removefromcart",{
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId": itemId})
            })
            .then((res)=>(res.json()))
            .then((data)=>console.log(data));
        }   
    }
    const getTotalCartAmount = () => {
        let totalAmount =0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo = all_product.find((product)=>product.id===Number(item))
                totalAmount+=iteminfo.new_price*cartItems[item];                
            }
        }
        return totalAmount;
    }

    // console.log(cartItems);
    const getTotalCartItems = () =>{
        let totalItem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }
    let url="https://wintra-backend.onrender.com"
    const contextValue = {url,token,getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,new_collections};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;