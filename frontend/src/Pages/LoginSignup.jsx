import React, { useState } from 'react'
import "./CSS/LoginSignUp.css"
const LoginSignup = () => {

  const [state,setState] = useState("Sign Up");
  const [userDetails,setUserDetails] = useState({
    username: "",email:"",password: ""
})

  const changeHandler =(e)=>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
    // console.log(userDetails);
  }
  const login = async() => {
    let responsedata;
    await fetch('https://wintra.onrender.com/login',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body : JSON.stringify(userDetails),
  }).then((res)=>res.json()).then((data)=>{
      console.log(`data is ${data}`);
      responsedata=data
      // data.success===true?alert("HAHA WINNER"):alert("HAHA LOSER");
      if(data.success){
        localStorage.setItem('auth-token',responsedata.token);
        window.location.replace("/");
          // alert("User Added");
      }
      else{
          alert(responsedata.errors);
      }
  })
  }
  const signup = async() => {
    let responsedata;
    await fetch('https://wintra.onrender.com/signup',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body : JSON.stringify(userDetails),
  }).then((res)=>res.json()).then((data)=>{
      console.log(`data is ${data}`);
      responsedata=data
      // data.success===true?alert("HAHA WINNER"):alert("HAHA LOSER");
      if(data.success){
        localStorage.setItem('auth-token',responsedata.token);
        window.location.replace("/");
          // alert("User Added");
      }
      else{
          alert(responsedata.errors);
      }
  })
  }
  // console.log(state);
  return (
    <div className="Loginsignup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state==="Sign Up"?<input value={userDetails.name} type="text" placeholder="Your-Name" onChange={changeHandler} name="username"/>:<></>}
            <input value={userDetails.email} type="email" placeholder='Email Address' onChange={changeHandler} name="email"/>
            <input type="password" value={userDetails.password} name= "password"  placeholder='Password' onChange={changeHandler} />
            {/* <input  onChange={changeHandler} type="password" name="password" placeholder='Password'/> */}
          </div>
          <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
          {state==="Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>:<></>}
          {state==="Login"?<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>:<></>}
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By Continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>
    </div>
  )
}

export default LoginSignup
// import React, { Fragment, useRef, useState, useEffect } from "react";
// import "./CSS/LoginSignUp.css";
// // import Loader from "../layout/Loader/Loader";
// // import { Link } from "react-router-dom";
// // import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// // import LockOpenIcon from "@material-ui/icons/LockOpen";
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// // import FaceIcon from "@material-ui/icons/Face";
// import FaceIcon from '@mui/icons-material/Face';
// // import { useDispatch, useSelector } from "react-redux";
// // import { clearErrors, login, register } from "../../actions/userAction";
// // import { useAlert } from "react-alert";
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'

// const LoginSignUp = ({ history, location }) => {
 
//   const loginTab = useRef(null);
//   const registerTab = useRef(null);
//   const switcherTab = useRef(null);
//   const switchTabs = (e, tab) => {
//     if (tab === "login") {
//       switcherTab.current.classList.add("shiftToNeutral");
//       switcherTab.current.classList.remove("shiftToRight");

//       registerTab.current.classList.remove("shiftToNeutralForm");
//       loginTab.current.classList.remove("shiftToLeft");
//     }
//     if (tab === "register") {
//       switcherTab.current.classList.add("shiftToRight");
//       switcherTab.current.classList.remove("shiftToNeutral");

//       registerTab.current.classList.add("shiftToNeutralForm");
//       loginTab.current.classList.add("shiftToLeft");
//     }
//   };

//   return (
//     <div className="LoginSignUpContainer">
//             <div className="LoginSignUpBox">
//               <div>
//                 <div className="login_signUp_toggle">
//                   <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
//                   <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
//                 </div>
//                 <button ref={switcherTab}></button>
//               </div>
//               <form className="loginForm" ref={loginTab} >
//                 <div className="loginEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     // value={loginEmail}
//                     // onChange={(e) => setLoginEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     // value={loginPassword}
//                     // onChange={(e) => setLoginPassword(e.target.value)}
//                   />
//                 </div>
//                 Forget Password ?
//                 <input type="submit" value="Login" className="loginBtn" />
//               </form>
//               <form
//                 className="signUpForm"
//                 ref={registerTab}
//                 encType="multipart/form-data"
//                 // onSubmit={registerSubmit}
//               >
//                 <div className="signUpName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     // value={name}
//                     // onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     // value={email}
//                     // onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     name="password"
//                     // value={password}
//                     // onChange={registerDataChange}
//                   />
//                 </div>

//                 <div id="registerImage">
//                   <img src={dropdown_icon} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     // onChange={registerDataChange}
//                   />
//                 </div>
//                 <input type="submit" value="Register" className="signUpBtn" />
//               </form>
//             </div>
//           </div>
//   );
// };

// export default LoginSignUp;