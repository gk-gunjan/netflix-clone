import React, { useState,useEffect } from 'react'
import "./Navbar.css";

const NavBar=()=> {
    const [show,handleShow] =useState(false);

   useEffect(() => {
       window.addEventListener("scroll",()=>{
           if(window.scrollY >100) {
               handleShow(true);
           } else handleShow(false);
       });
       return ()=> {
           window.removeEventListener("scroll");
       }
   }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img 
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png?1595270313165"
            alt="Netflix Logo"
            />  

            <img
            className="nav_avatar"            
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt="Netflix Avatar"
            />          
        </div>
    )
}

export default NavBar;
