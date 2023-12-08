import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/LogoFindemy.svg";
import GoogleLogo from "../../assets/Google.svg";
import FacebookLogo from "../../assets/Facebook.svg";
import LinkedinLogo from "../../assets/Linkedin.svg";
import Linehori from "../../assets/linehorizontal.svg";


import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
 
  Autocomplete, Button,Backdrop,CircularProgress
 
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import {  IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import ModalComponent from "../../modal/modal";
// import FormDialog from "./dailog";
import { baseurl } from "../utils/constant";
const Login = (props) => {


  const [open, setOpen] = React.useState(false);
  const [meassage,setMessage] = useState("")
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false);

  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(true);

  const [show,setShow] = useState(false)


  const handleLogin = () => {
    // const  validemail= validateEmail(email)
    // if (!validemail && !validatePassword(password) )  {
    //   setEmailValid(false);
    //   setPasswordValid(false);
    // } 
    //  else {
        let payload = {
          email: email,
          password: password,
        };
    
      // setIsSubmitting(true)
      onsubmit(payload);
    // }
  };

  const onsubmit = async (values) => {
    setLoader(true)
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      var payload={
        "email": values.email,
        "password": values.password
      }
      const raw = JSON.stringify(payload);

      console.log("Request Headers:", myHeaders);

  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(`${baseurl.url}/auth/login`, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
       if(res.status === 200){
        
        toast.success("Login successful!");
  
        sessionStorage.setItem("access_token", res.data.accessToken);
        sessionStorage.setItem("refresh_token", res.data.refreshToken);
        window.instance=res.data
        sessionStorage.setItem("userdata", res.data.email);

        navigate("/")
        window.location.reload()
        console.log(res)
       }else{
        setOpen(true);
        setMessage(res.message)
       }
       setLoader(false)
      })

    } catch (error) {
      console.log("Error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };


  const validatePassword = (password) => {
    const letterRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/;
    return letterRegex.test(password);
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
      {/* <img className="logo-img-top" src={Logo} alt="" /> */}
      {/* </div> */}
      <div className="Login__second__section">
        <h1>Login</h1>
       
        <hr />
        <input
          type="email"
          placeholder="Email"
          className={`input-cred text-cred ${!emailValid ? "invalid" : ""}`}
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if(!value) {
              setEmailValid("email is required")
             }
             else  if(!new RegExp(/^[^\s@]+@[^\s@]+(\.[^ !."`'#%&,:;<>=@{}~\$\(\)\*\+_\/\\\?\[\]\^\|]{2,4})$/).test(value)) {
              setEmailValid("enter a valid email")
             }
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
          placeholder="Password"
          className={`input-cred pass-cred ${!passwordValid ? "invalid" : ""}`}
          value={password}
          // onChange={(e) => {
          //   setPassword(e.target.value);
          //   setPasswordValid(true); 
          // }}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            if(!value) {
              setPasswordValid("pasword is required")
             }
            //  else  if(!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/).test(value)) {
            //   setPasswordValid("enter a valid password")
            //  }
             else {
              setPasswordValid(true)
             };
          }}
        />
         { passwordValid && (
              <p className={"error-message"}>{passwordValid}</p>
            )}

       
        <div >
          <button
            className="font-bold py-3 px-6 rounded-xl border-2 border-[#ffce00] cursor-pointer hover:bg-[#ffce00] hover:text-black"
            onClick={handleLogin}
            disabled={email!== "" && password!=="" && emailValid===true && passwordValid===true ? false : true}
          >
           
            <h3>Login</h3>
          </button>
        </div>
        <hr />
        <a className="create__an_account" href="" onClick={()=>{ navigate("/sign-up") }}>
          Create An Account
        </a>
    
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={meassage}
        action={action}
        
        />

      {/* <ModalComponent 
        show={show}
        // forgotPassword = {()=>{forgotPassword()}}
        forgotFlow = {true}
        cancel={"cancel"}
        save={"Submit"}
        onHide={() => setShow(false)}
        onSubmit={forgotPassword}
      /> */}
      {/* <FormDialog
          open={show}
          handleClose={handleCloseDailog}
          handleSave = {forgotPassword}
      /> */}
      
    </div>
  );
};

export default Login;
