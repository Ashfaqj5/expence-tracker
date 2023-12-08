import React, { useState } from "react";
import "./header.css";
import Search from "../assets/Search.svg"
import NotificationBell from "../assets/notificationbell.svg"
import UserProfile from "../assets/UserProfile.svg"
import homeIcon from '../assets/home-icon.svg'
import marketIcon from '../assets/market-icon.svg'
import personalFinance from '../assets/personal-finance.svg';
import academy from '../assets/Academy-icon.svg';
import profileIcon from '../assets/profile-icon.svg'
import sharedContext from "../context/SharedContext";
import { useContext } from "react";
const Header = () => {
  const {userdata}=useContext(sharedContext)

  return (
    <><>
      <div className="hidden md:block md:pl-60 md:h-20 bg-[rgb(20,20,20)] border-t-2 border-white gap-4 p-4 md:top-0 z-10 md:border-none md:justify-around md:gap-10">
        
            <div className="header-right-body">
          <div className="notification-bill">
            
        
            
            <span>{userdata}</span>
            <img src={UserProfile} alt="" />
          </div>
        </div>
        

      </div>
    </>
      {/* <div className="header-component">

        {data.map((item) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '5rem' }}><img src={item.icon} width='30px' className="bottom-icons" /><span className="header-left">{item.label}</span></div>
          );
        })}

        <div className="header-right-body">
          <div className="notification-bill">
            {showInput && (
              <input
                type="text"
                className=" "
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoFocus />
            )}
            <img src={Search} alt="" onClick={toggleInput} />
            <img src={NotificationBell} alt="" />
            <span>Harvey Spectre</span>
            <img src={UserProfile} alt="" />
          </div>
        </div>
      </div> */}
    </>

  );
};

export default Header;
