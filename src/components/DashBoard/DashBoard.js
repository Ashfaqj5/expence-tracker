import React, { useState } from "react";
import "./DashBoard.css";
import SideBar from "./SideBar/SideBar";
import Search from "../../assets/Search.svg";
import NotificationBell from "../../assets/notificationbell.svg";
import UserProfile from "../../assets/UserProfile.svg";
const DashBoard = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleInput = () => {
    setShowInput(!showInput);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setShowInput(false);
    // Do something with the inputValue, e.g. submit it or update your state
  };
  return (
    <div className="header">
      <div >
        {/* <SideBar /> */}
        
      {/* </div><div> */}
        <div className="nav-links-top-app">
          <ul>
            <li>About</li>
            <li>Market</li>
            <li>Personal Finance</li>
            <li>Academy</li>
          </ul>
          <div className="nav-links-top-app-usersection">
            <img src={Search} alt="" onClick={toggleInput} />
            {showInput && (
              <input
                type="text"
                className="Search-box-top-bar "
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoFocus />
            )}
            <div className="notification-bell">
              <img src={NotificationBell} alt="" />
            </div>  
            <h2>Harvey Spectre</h2>
            <div className="User_Profile-top-section">
              <img src={UserProfile} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
