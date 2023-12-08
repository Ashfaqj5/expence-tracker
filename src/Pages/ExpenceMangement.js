import "./ExpenceMangement.css"
import React,{useState,useRef, useEffect} from "react"

import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import {
 
  Autocomplete, Button,Backdrop,CircularProgress,
 Select,MenuItem
} from "@mui/material";

import { useContext } from "react";
import sharedContext from "../context/SharedContext";

import { baseurl } from "../components/utils/constant";
import Settings from '../assets/Settings.svg'
import calender from '../assets/calender.svg'
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];const today = dayjs();

const ExpenceMangement =()=>{

  const {token,handleLogout}=useContext(sharedContext);

 const [loader,setLoader]=useState(false);
 const [formData, setFormData] = useState({
  category_name: '',
  date: '',
  amount: '',
  description:'',

});
const [categories,setCategories]=useState([])
const getCategories=()=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
};

fetch(`${baseurl.url}/category/getAllCategories/1`, requestOptions)
		.then(response => response.json())
		.then(result =>{
      if(result.status===200){
        setCategories(result.data)

      }
      else if(result.status===401){
        handleLogout()
      }
     }
      )
		.catch(error => console.log('error', error));
}
useEffect(()=>{
  getCategories()
},[])
const handleAddExpence=()=>{
  console.log(formData)
}


    return(
        <div className="md:pl-52">
          {loader&& <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
      <div className="flex justify-end">
           <button className='flex' 
          //  onClick={()=>setDialog(true)}
            style={{ width: 'max-content' }} name="upload">
                  <img
                  alt="Settings"
                  src={Settings}
                  width='25px'
                  height='25px'
                />
                    <span className='normal-case'> Manage Category</span>
                  </button>
           </div>
           <div className="flex flex-col">
           <div className='bg-white' style={{width:'250px',height:'46px'}}>  <Select
    name='category_name'
    value={formData?.category_name}
    placeholder='Select role'
    // onChange={onChangeInput}
    sx={{
        width:'100%'
    }}
    ><MenuItem value="">
  <em>None</em>
</MenuItem>
    {categories?.map((each,index)=>{
        return <MenuItem key={index} value={each.name}>{each.name}</MenuItem>
    })}
    
  </Select>
  </div>
            <div>select date</div>
            <div>amount</div>
            <div>discription</div>
            <div ><button onClick={handleAddExpence}> ADD</button></div>
           </div>
           
        </div>
    )
}

export default ExpenceMangement