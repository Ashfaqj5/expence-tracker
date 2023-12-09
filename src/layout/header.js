import React, { useState ,useEffect,useRef} from "react";
import "./header.css";

import UserProfile from "../assets/UserProfile.svg"
import sharedContext from "../context/SharedContext";
import { useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Box from "@mui/material/Box";
import { GenerateNewToken } from "../components/utils/api";
import { baseurl } from "../components/utils/constant";
const Header = () => {
  const {token,userdata,handleLogout}=useContext(sharedContext)
  const [warning,setWarning]=useState();
  const handleClose = (event) => {
    toggleDrawer(event, false)
  };
  const [categories, setCategories] = useState([]);

  const toggleDrawer = (event, open) => {

    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setWarning(false)
      return;
    }
    setWarning(open)

  };
  useEffect(() => {
    // const myTimeout = setTimeout(() => {
    //   window.location.href = "/";
    //   sessionStorage.removeItem("token")
    // }, 1800000);
    // auth/getRemainingTime
    
  }, [token]);

  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (ee) => {
    console.log(ee)
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    // setTimer("00:10:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
   ee.then((e)=>{
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
      // console.log(e)
    }, 1000);
    Ref.current = id;
   })
    
  };

  const getDeadTime = () => {
    return new Promise((resolve, reject) => {
      let deadline = new Date();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
        myHeaders.append("Content-Type", "application/json");
  
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
  
        fetch(`${baseurl.url}/auth/getRemainingTime`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result.data);
            console.log(deadline.getMinutes())
            deadline.setMinutes(deadline.getMinutes() + Number(result.data?.split(':')[0]));
            deadline.setSeconds(deadline.getSeconds() + Number(result.data?.split(':')[1]));
            resolve(deadline); // Resolve the Promise with the deadline value
          })
          .catch(error => {
            console.log('error', error);
            reject(error); // Reject the Promise if there's an error
          });
      
    });
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime().then(deadline=>deadline));
   
  }, [token]);
  useEffect(()=>{
    if(timer==='00:09:00'){
      setWarning(`Session will expire in `);
    }
  },[timer])

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    
    GenerateNewToken()
    clearTimer(getDeadTime().then(deadline=>deadline));
    // window.location.reload();
  };

  setTimeout(() => {
    document.location.reload();
    handleLogout();
  }, 600000);
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (warning) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [warning]);

  return (
    <><>
      <div className="hidden md:block md:pl-60 md:h-20 bg-[rgb(20,20,20)] border-t-2 border-white gap-4 p-4 md:top-0 z-10 md:border-none md:justify-around md:gap-10">
        
            <div className="header-right-body">
          <div className="notification-bill">
            
          <Dialog
        open={warning?true:false}
        onClose={handleClose}
        // scroll={paper}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{ style: { borderRadius: '10px' ,width:'50%'} }}
      >

        <DialogContent dividers={true} sx={{ padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>

            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              sx={{ padding: '28px' }}
            >
              <Box role="presentation" className='flex flex-col justify-center'>
                {warning}{timer} 
                             </Box>

            </DialogContentText>
          </div>
        </DialogContent>



      </Dialog>
          <h2>{timer}</h2>
        <button onClick={onClickReset}>Reset</button>

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
