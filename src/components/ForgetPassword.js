import React, { useState } from "react";
import "./ForgetPassword.css";
import Logo from "../assets/LogoFindemy.svg";

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
 
  Autocomplete, Button,Backdrop,CircularProgress
 
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import {  IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ForgetPassword = (props) => {


  const baseUrl='http://3.237.3.113:3000' 

  const [open, setOpen] = React.useState(false);
  const [meassage,setMessage] = useState("")
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(true);

  const [desabled,setDesabled] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);




  const handleLogin = () => {
      let id =window.location.pathname.split('/').pop()
        let payload = {
          uniqueKey:id,
          password: email,
          confirmPassword: password,
        };
      onsubmit(payload);
  };

  const onsubmit = async (values) => {
    console.log("aaaaaaaaaaaaaaaa",values)
    setLoader(true)
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(values);

      console.log("Request Headers:", myHeaders);

  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(`${baseUrl}/auth/updatePassword`, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
       if(res.status === 200){
        setOpen(true);
        setMessage(res.data)
        setIsSubmitting(false);
        setTimeout(() => {
          navigate("/")
        }, 1000);
        console.log(res)
       }else{
        setOpen(true);
        setMessage(res.message)
        setIsSubmitting(false);
       }
       setLoader(false)
      })

    } catch (error) {
      console.log("Error:", error);
      setIsSubmitting(false)
      toast.error("Login failed. Please check your credentials.");
    }
  };




  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )
  

  return (
    <div className="Login__container h-full">
      {loader&& <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
      {/* <div className="Login_first_section"> */}
      <img className="logo-img-top" src={Logo} alt="" />
      {/* </div> */}
      <div className="Login__second__section">
        <h1>Forgot Password</h1>
       
        
       
        <hr />
        <input
          type="password"
          placeholder="New Password"
          className={`input-cred text-cred ${!emailValid ? "invalid" : ""}`}
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if(!value) {
              setEmailValid("password is required")
             }
            //  else  if(!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/).test(value)) {
            //   setEmailValid("enter a valid password")
            //  }
             else {
              setEmailValid(true)
             };
          }}
        />
          { emailValid && (
              <p className={"error-message"}>{emailValid}</p>
            )}
        <input
          type="password"
          placeholder="Confirm New Password"
          className={`input-cred pass-cred ${!passwordValid ? "invalid" : ""}`}
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            if(!value) {
              setPasswordValid("pasword is required")
             }
             else  if(email !== value) {
              setPasswordValid("enter a valid password")
             }
             else {
              setPasswordValid(true)
             };
          }}
        />
         { passwordValid && (
              <p className={"error-message"}>{passwordValid}</p>
            )}

       
        <div className="Button__login">
          <button onClick={handleLogin}>Login</button>
        </div>
        <hr />
       
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={meassage}
        action={action} />
    </div>
  );
};

export default ForgetPassword;
