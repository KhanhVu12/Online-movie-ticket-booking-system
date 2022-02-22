import React from 'react';
import NotifyIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import LanguageIcon from '@mui/icons-material/TranslateTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';

export const Navbar = () => {
  return (
    <div className='navBar'>
      <div className="navBarWrapper">
        <div className="navLeft">
          <span className="logo">tên brand của mình(or logo) :V</span>
        </div>
        <div className="navRight"> 
          <div className="iconContainer">         
            <LanguageIcon/>
          </div>
          <div className="iconContainer">
            <NotifyIcon/>
            <span className="notiCount">3</span>
          </div>
          <div className="iconContainer">
            <SettingsIcon/>
          </div>
          <img src="images/avt.png" alt="avatar" className="avatar" />
        </div>
      </div>
    </div>
  )
}
