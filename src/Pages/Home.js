import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import sharedContext from "../context/SharedContext";
import { useContext } from "react";
import DoughnutChart from '../components/charts/DoughnutChart'
import { baseurl } from "../components/utils/constant";
import BarChart from "../components/charts/BarChart";
import Loader from "../components/Loader";
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Box from "@mui/material/Box";
export default function LandingPage(props) {
  const navigate = useNavigate();
  const [isOpen, setDialog] = useState(false);

  const {token,handleLogout,setLoader}=useContext(sharedContext)
  const [categories,setCategories]=useState();
  const [expences,setExpences]=useState();
  const [budget,setBudget]=useState();
  const [DoughnutData,setDoughnutData]=useState({
    labels:[],
    datasets:[
     { 
      data:[],
      cutout:'90%'
      }
      ,
      
    ],
    
  });
  function calculateTotalExpensesSum(data) {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }
  const toggleDrawer = (event, open) => {

    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setDialog(false)
      return;
    }
    setDialog(open)

  };
  const descriptionElementRef = React.useRef(null);
  const handleClose = (event) => {
    toggleDrawer(event, false)
  };
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);
  const getExpences=()=>{
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    fetch(`${baseurl.url}/expenses/getAllExpenses`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.data)
          if(result.status===200){
            setExpences(calculateTotalExpensesSum(result.data))
           
          }
          else if(result.status===401){
            handleLogout()
          }
          setLoader(false)
        })
    
        .catch(error =>{ console.log('error', error)
        setLoader(false)
      });
  }
  const getBudget=()=>{
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('access_token')}`);
    myHeaders.append("Content-Type", "application/json");
    let today=new Date();
    var raw = JSON.stringify(
      {
        "month":today.getMonth()+1,
        "year":today.getFullYear()
      }
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:raw,
        redirect: 'follow'
    };
    
    fetch(`${baseurl.url}/expenses/getBudgetDetails`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.data)
          if(result.status===200){
            setBudget(result.data)
           
          }
          else if(result.status===401){
            handleLogout()
          }
          setLoader(false)
        })
    
        .catch(error => {console.log('error', error)
        setLoader(false)
      });
  }

  useEffect(()=>{
 if(token){

   getExpences()
   getBudget()
  
  }
  },[token])
  return (
    <div className="flex flex-col pt-24">
      <Loader/>
      <Dialog
        open={isOpen}
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
                
              <TextField label='Set Budget'>

              </TextField>
              </Box>

            </DialogContentText>
          </div>
        </DialogContent>



      </Dialog>

      <div>
        <span className='text-2xl font-bold' style={{color:(expences)>(budget&&budget[0]?.amount)?'red':'green'}}>{expences}</span>
        <span className='text-3xl'>/{budget?budget[0]?.amount:'-'}</span>
        <span><Button onClick={(event)=>toggleDrawer(event,true)}>Set Budget</Button></span>
      </div>
      <div>
        <BarChart chartData={DoughnutData}/>
      </div>
      </div>
  );
}