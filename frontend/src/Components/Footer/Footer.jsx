import React from 'react'
import playStore from "../Assets/playstore.png";
import appStore from "../Assets/Appstore.png";
import "./Footer.css"
const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>Download our APP</h4>
            <p>Download app for android and IOS mobile App</p>
            <img src={playStore} alt="playstore"/>
            <img src={appStore} alt= "AppStore"/>
        </div>

        <div className="midFooter">
            <h1>WINTRA</h1>
            <p>High Quality is our first Priority</p>
            <p>Copyrights 2021 Shashank</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="http://instagram/shashank_shekhar0710">Instagram</a>
            <a href="http://instagram/shashank_shekhar0710">Youtube</a>
            <a href="http://instagram/shashank_shekhar0710">Facebook</a>
        </div>

    </footer>
    // <div className="footer">
    //   <div className="footer-logo">
    //     <img src={footer_logo} alt=""/>
    //     <p>SHOPIFY</p>
    //   </div>
    //   <ul className="footer-links">
    //     <li>Company</li>
    //     <li>Products</li>
    //     <li>Offices</li>
    //     <li>About</li>
    //     <li>Contact</li>
    //   </ul>
    //   <div className="footer-social-icon">
    //     <div className="footer-icons-container">
    //       <img src={instagram_icon} alt="" />
    //     </div>
    //     <div className="footer-icons-container">
    //       <img src={pintester_icon} alt="" />
    //     </div>
    //     <div className="footer-icons-container">
    //       <img src={whatsapp_icon} alt="" />
    //     </div>
    //   </div>

    //   <div className="footer-copyright">
    //     <hr/>
    //     <p>Copyright @ 2023 - All Rights Reserved</p>
    //   </div>
    // </div>
  )
}

export default Footer;