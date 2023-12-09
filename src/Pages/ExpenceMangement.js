import "./ExpenceMangement.css"
// import React,{useState,useRef, useEffect} from "react"

// import Stack from '@mui/material/Stack';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateField } from '@mui/x-date-pickers/DateField';
// import dayjs from 'dayjs';
// import {

//   Autocomplete, Button,Backdrop,CircularProgress,
//  Select,MenuItem
// } from "@mui/material";

// import { useContext } from "react";
// import sharedContext from "../context/SharedContext";

// import { baseurl } from "../components/utils/constant";
// import Settings from '../assets/Settings.svg'
// import calender from '../assets/calender.svg'
// const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];const today = dayjs();

// const ExpenceMangement =()=>{

//   const {token,handleLogout}=useContext(sharedContext);

//  const [loader,setLoader]=useState(false);
//  const [formData, setFormData] = useState({
//   category_name: '',
//   date: '',
//   amount: '',
//   description:'',

// });
// const [categories,setCategories]=useState([])
// const getCategories=()=>{
//   var myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${token}`);
// myHeaders.append("Content-Type", "application/json");

// var requestOptions = {
// 		method: 'GET',
// 		headers: myHeaders,
// 		redirect: 'follow'
// };

// fetch(`${baseurl.url}/category/getAllCategories/1`, requestOptions)
// 		.then(response => response.json())
// 		.then(result =>{
//       if(result.status===200){
//         setCategories(result.data)

//       }
//       else if(result.status===401){
//         handleLogout()
//       }
//      }
//       )
// 		.catch(error => console.log('error', error));
// }
// useEffect(()=>{
//   getCategories()
// },[])
// const handleAddExpence=()=>{
//   console.log(formData)
// }


//     return(
//         <div className="md:pl-52">
//           {loader&& <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={loader}

//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>}
//       <div className="flex justify-end">
//            <button className='flex' 
//           //  onClick={()=>setDialog(true)}
//             style={{ width: 'max-content' }} name="upload">
//                   <img
//                   alt="Settings"
//                   src={Settings}
//                   width='25px'
//                   height='25px'
//                 />
//                     <span className='normal-case'> Manage Category</span>
//                   </button>
//            </div>
//            <div className="flex flex-col">
//            <div className='bg-white' style={{width:'250px',height:'46px'}}>  <Select
//     name='category_name'
//     value={formData?.category_name}
//     placeholder='Select role'
//     // onChange={onChangeInput}
//     sx={{
//         width:'100%'
//     }}
//     ><MenuItem value="">
//   <em>None</em>
// </MenuItem>
//     {categories?.map((each,index)=>{
//         return <MenuItem key={index} value={each.name}>{each.name}</MenuItem>
//     })}

//   </Select>
//   </div>

//             <div>amount</div>
//             <div>discription</div>
//             <div ><button onClick={handleAddExpence}> ADD</button></div>
//            </div>

//         </div>
//     )
// }

// export default ExpenceMangement
// import './ExpenceManagement.css'
import React, { useEffect } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext, useState } from 'react';
import { TextField, InputAdornment, MenuItem, Select, Autocomplete, Button } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { baseurl } from "../components/utils/constant";
import Loader from '../components/Loader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Box from "@mui/material/Box";
import toast, { Toaster } from 'react-hot-toast'
import Settings from '../assets/Settings.svg'
import dayjs, { Dayjs } from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Expence from "../components/Expence";

// import Image from 'next/image';
function ExpenseManagement() {

  const { token, loader, setLoader,handleLogout } = useContext(sharedContext);
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [formData, setFormData] = useState({
    description: '',
    name: '',
    amount: '',
    date: '',
    id:''
  });
  const [errors, setErrors] = useState({});
  const [expencesList,setExpencesList]=useState([])
  const [isOpen, setDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const handleClose = (event) => {
    toggleDrawer(event, false)
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (token) {
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");


      var requestOptions = {
        method: 'GET',
        headers: myHeaders,

        redirect: 'follow'
      };

      fetch(`${baseurl?.url}/category/getAllCategories`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.status===200){
            setCategories(result.data)

          }
          else if(result.status===401){
            handleLogout()
          }
          //setCategories(result.data.map(each=>each.name))

          // AddRow(result.data)
          // handleClose()
          setLoader(false)
        })
        .catch(error => {
          console.log('error', error)

          setLoader(false)
        });
        getExpences()
    }
  }, [token,isOpen])

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
  const handleAddCategory = (e) => {
    if (newCategory && !categories?.includes(newCategory)) {
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(
        {
          "name": newCategory
        }
      );

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${baseurl?.url}/category/addCategory`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          // AddRow(result.data)
          if(result.status===200){
            toast.success(`Added ${newCategory} Role Successfully`)

            setCategories([...categories, result.data])
            setNewCategory('')
          }
          else if(result.status===401){
            handleLogout()
          }
          // handleClose()
          
          setLoader(false)
        })
        .catch(error => {
          console.log('error', error)

          setLoader(false)
        });

    }

  }

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
      {
        category_id:formData.id,
        description:formData.description,
        amount:formData.amount,
        date:formData.date
      }
    );

    console.log('data passed:',raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/expenses/addExpense`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        // AddRow(result.data)
        // handleClose()
        if(result.status===200){
          toast.success('Added Expence Successfully')
          clearFields()
          setLoader(false)
          getExpences()
        }
        else if(result.status===401){
          handleLogout()
        }
      })
      .catch(error => {
        console.log('error', error)

        setLoader(false)
      });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    console.log('name:', name, 'value:', value);
    if(name==='name'){
      const dd = categories.filter(each => each.name === value)
      console.log('dd:',dd[0].id);
      setFormData({
        ...formData,
        'id': dd[0].id,
        'name':value
      });
      
      console.log('formdata for name:',formData);
      
    }else{
    setFormData({
      ...formData,
      [name]: value,
    });
  }
    console.log('formdata:', formData);
    if (name === 'amount') {
      if (!/^\d+$/.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Amount should only contain numbers',
        });
      } else {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
      if (value === '') {
        setErrors({})
      }
    }
  }



  const clearFields = () => {
    setFormData({
      description: '',
      name: '',
      amount: '',
      date: '',
      id:''
    })
  }
  const handleDelete = (item) => {

    console.log('You clicked the delete icon.', item);
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
      {
        "id": item.id
      }
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/category/deleteCategory`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        // AddRow(result.data)
        // handleClose()
        toast.success(`Removed ${item.name} Role Successfully`)
        let temp = categories.filter(each => each.name != item?.name)
        setCategories(temp)

        setLoader(false)
      })
      .catch(error => {
        console.log('error', error)

        setLoader(false)
      });


  };
  const handleDateChange = (date) => {
    console.log('date:', date);
    const day = date.$d.getDate().toString().padStart(2, '0');
    const month = (date.$d.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-indexed
    const year = date.$d.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    console.log(formattedDate);
    setFormData({
      ...formData,
      'date': formattedDate,
    });
    console.log('formdata:'.formData);
    // onChangeInput('date', formattedDate);
  };
  const getExpences=()=>{
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
            setExpencesList(result.data)
           
          }
          else if(result.status===401){
            handleLogout()
          }
          
        })
    
        .catch(error => console.log('error', error));
  }
  return (
    <div className="flex flex-wrap">
    <div className='PayrollCard max-h-screen w-full'>
      <div className='flex flex-row justify-between'>
        <h2>Expense</h2>
        <div>
          <span className='eds__Btn'>
            <button className='flex' onClick={() => setDialog(true)} style={{ width: 'max-content' }} name="upload">
              <img
                alt="Settings"
                src={Settings}
                width={25}
                height={23}
              />
              <span className='normal-case'> Manage Categories</span>
            </button>
          </span>
        </div></div>
      <Loader />

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
                <Loader />
                <div className='flex items-center'><TextField value={newCategory} 
                placeholder='Add Category' 
                onChange={(event) => setNewCategory(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={handleAddCategory}>
                      <AddBoxIcon className="cursor-pointer"/>
                    </InputAdornment>
                  ),
                }}
                 />
                  {/* <Button >Add Category</Button> */}
                </div>
                <div className='flex flex-wrap p-3 gap-2'>{
                  categories?.map((item, index) => {
                    return <Chip key={index} label={`${item.name}`} onDelete={() => handleDelete(item)} />
                  })
                }</div>

              </Box>

            </DialogContentText>
          </div>
        </DialogContent>



      </Dialog>

      {/* <Button onClick={()=>setDialog(true)} >Manage Roles</Button> */}
      <form onSubmit={handleSubmit} className='prDeatails__Box'>



        <table className='' style={{ borderCollapse: 'separate', borderSpacing: '25px 25px' }}>
          <tr className='p-3'>{/*class="flex items-center gap-10 flex-wrap"*/}
            <td>Description</td>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
            <td>

              <div className='input__Fld'>
                <TextField
                  // className='nText__Fld'
                  type="text"
                  name='description'
                  value={formData?.description}
                  onChange={onChangeInput}
                  placeholder='Enter Description'
                  required
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  autoComplete="off"
                  sx={{ height: '46px' }}
                />
              </div>
            </td>
          </tr>
          <tr className='p-3'>
            <td>Category Type</td>

            <td><div className='input__Fld' style={{  height: '46px' }}>  <Select
              value={formData?.name}
              placeholder='Select role'
              name='name'
              onChange={onChangeInput}
              sx={{
                minWidth: '200px'
              }}
            >
              {categories?.map((each, index) => {
                return <MenuItem key={index} value={each.name}>{each.name}</MenuItem>
              })}
              {categories?.length === 0 && (<MenuItem key={0} value="No Categories">No Categories added</MenuItem>)}


            </Select>
            </div></td>
          </tr>
          <tr className='p-3'>{/*class="flex items-center gap-10 flex-wrap"*/}
            <td>Amount</td>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
            <td> <div >
              <TextField
                // className='nText__Fld'
                type="text"
                name='amount'
                value={formData?.amount}
                onChange={onChangeInput}
                placeholder='Enter Amount'
                required
                error={Boolean(errors.amount)}
                helperText={errors.amount}
                autoComplete="off"
                sx={{  height: '46px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <svg width="10px" height="16" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0V2H4C5.704 2 7.94 3.038 8.72 5H0V7H8.97C8.66 9.61 5.974 11 4 11H0V13.47L10.25 22H13.375L2.562 13H4C7.234 13 10.674 10.61 10.97 7H16V5H10.812C10.51 3.816 9.86 2.804 9 2H16V0H0Z" fill="black" />
                      </svg>
                    </InputAdornment>
                  ),
                }}
              /></div></td>
          </tr>
          <tr className='p-3'>{/*class="flex items-center gap-10 flex-wrap"*/}
            <td>Date</td>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
            <td> <div style={{maxWidth:'200px'}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker onChange={handleDateChange} />
                </DemoContainer>
              </LocalizationProvider>
            </div></td>
          </tr>
        </table>
        <div type='submit' className='flex justify-around '>
          <button style={{ width: 'max-content',borderRadius:'10px' }} className="text-black  p-3  hover:bg-black border-black border-2 hover:text-white">Submit</button>
        </div>
      </form>
    </div >
    <div className='PayrollCard max-h-screen w-full overflow-y-scroll'>
      <div className='flex flex-row justify-between'>
        <h2>Recent</h2>
        </div>
       {
        expencesList?.map((each,index)=>{
          return <Expence data={each} key={index}/>
        })
       }
    </div >
    
    </div>
  )
}

export default ExpenseManagement