import React from 'react';
import { IoMdNotificationsOutline, IoIosSettings } from 'react-icons/io';
import { BsTranslate } from "react-icons/bs";

export const Navbar = () => {
  return (
    <div className='navBar'>
      <div className="navBarWrapper">
        <div className="navLeft">
          <span className="logo">tên brand của mình(or logo) :V</span>
        </div>
        <div className="navRight"> 
          <div className="iconContainer">        
            <BsTranslate/>
          </div>
          <div className="iconContainer">
            <IoMdNotificationsOutline/>
            <span className="notiCount">3</span>
          </div>
          <div className="iconContainer">
            <IoIosSettings/>
          </div>
          <img src="images/avt.png" alt="avatar" className="avatar" />
        </div>
      </div>
    </div>
  )
}
