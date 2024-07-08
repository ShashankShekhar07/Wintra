import React, { useContext, useEffect } from 'react'
import './CSS/verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';

const Verify = () => {
    const [searchParams,serSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId")
    // console.log(success,orderId);
    const {url} = useContext(ShopContext);
    const navigate= useNavigate();
    const verifyPayment = async()=>{ 
        const url = "http://localhost:4000/verify"; // Replace with your backend URL

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ success, orderId }),
          });
      
          const data = await response.json();
          // console.log(data);
          console.log(data.success);
          // console.log(data.data.success);
          // console.log(data.success.success);
          
          if (data.success) {
            console.log("YES")
            navigate("/myorders"); // Navigate to "myorders" page
            window.location.replace("/myorders");
          } else {
            navigate("/"); // Navigate to home page
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          // Handle error gracefully (e.g., display an error message to the user)
        }
        // const response = await axios.post(url+"/verify",{success,orderId});
        // if(response.data.success){
        //     navigate("/myorders");
        // }
        // else{
        //     navigate("/");
        // }

        
        // let response = await fetch("http://localhost:4000/verify", {
        //     method: "POST",
        //     // headers: {
        //     //   Accept: 'application/json',
        //     //   'auth-token': `${localStorage.getItem('auth-token')}`,
        //     //   'Content-Type': 'application/json',
        //     // },
        //     body: JSON.stringify({success,orderId})
        //   });
      
        //   response = await response.json();
      
        //   if (response.success) {
        //     const { session_url } = response;
        //     window.location.replace(session_url);
        //   } else {
        //     alert("Error: " + response.message); // Provide more specific error message (if available)
        //   }
    }
    useEffect(() => {
        verifyPayment()
      }, [])
  return (
<div className="verify">
    <div className="spinner">

    </div>
</div>
  )
}

export default Verify