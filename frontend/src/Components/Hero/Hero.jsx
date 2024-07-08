import React from 'react'
import '../Hero/Hero2.css'
// import '../Navbar/Navbar.css'
import hand_icon from "../Assets/hand_icon.png"
import arrow_icon from "../Assets/arrow.png"
import hero_image from "../Assets/hero_image.png"
import background from "../Assets/background.jpg"
import banner1 from "../Assets/banner-01.jpg"
import banner2 from "../Assets/banner-02.jpg"
import banner3 from "../Assets/banner-03.jpg"
const Hero = () => {
  return (
    // <div className="hero">
    //     <div className="hero-left">
    //         <h2>NEW ARRIVALS ONLY</h2>
    //         <div>
    //             <div className="hero-hand-icon">
    //               <p>new</p>
    //               <img src={hand_icon} alt=""/>
    //             </div>
    //             <p>Collections</p>
    //             <p>For everyone</p>
    //         </div>
    //         <div className="hero-latest-btn">
    //             <div>Latest Collection</div>
    //             <img src={arrow_icon} alt=""></img>
    //         </div>            
    //     </div>
    //     <div className="hero-right">
    //       <img src={hero_image} alt=""/>
    //     </div>

    // </div>
    <>
      <div id="slides-shop" className="cover-slides">
        <ul className="slides-container">
     
            <li className="text-left">
                <img src={banner1} alt=""/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br/> Thewayshop</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view <br/> trends to see any changes in performance over time.</p>
                            {/* <p><a className="btn hvr-hover" href="#">Shop New</a></p> */}
                        </div>
                    </div>
                </div>
            </li>
         
            <li className="text-center">
                <img src={banner2} alt=""/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br/> Thewayshop</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view <br/> trends to see any changes in performance over time.</p>
                            {/* <p><a className="btn hvr-hover" href="#">Shop New</a></p> */}
                        </div>
                    </div>
                </div>
            </li>
            <li className="text-right">
                <img src={banner3} alt=""/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br/> Thewayshop</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view <br/> trends to see any changes in performance over time.</p>
                            {/* <p><a className="btn hvr-hover" href="#">Shop New</a></p> */}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div className="slides-navigation">
            <a href="#" className="next"><i className="fa fa-angle-right" aria-hidden="true"></i></a>
            <a href="#" className="prev"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
        </div> 
    </div>
    </>
  )
}

export default Hero