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
import { TextField, InputAdornment,MenuItem,Select, Autocomplete, Button } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { baseurl } from "../components/utils/constant";
// import Loader from './Loader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Box from "@mui/material/Box";
import toast, { Toaster } from 'react-hot-toast'
import Settings from '../assets/Settings.svg'
// import Image from 'next/image';
function Payroll() {

    const { token } = useContext(sharedContext);

    const [formData, setFormData] = useState({
        name: '',
        role_type: '',
        amount: '',
    });
    const [errors, setErrors] = useState({});
    const [isOpen,setDialog]=useState(false);
    const [newRole,setNewRole]=useState('');
    const handleClose = (event) => {
        toggleDrawer( event,false )
    };
    const [roles,setRoles]=useState([]);
    useEffect(()=>{
        // 
        //setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,

            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/payroll/getRoleTypes`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setRoles(result.data)
                //setRoles(result.data.map(each=>each.role_name))

                // AddRow(result.data)
                // handleClose()
                //setLoader(false)
            })
            .catch(error => {
                console.log('error', error)

                //setLoader(false)
            });
    },[isOpen])
    
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
      const handleAddRole=(e)=>{
        if(newRole && !roles?.includes(newRole)){
        //setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(
            {
                "role_name":newRole
            }
        );

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/payroll/addPayrollRole`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // AddRow(result.data)
                // handleClose()
                toast.success(`Added ${newRole} Role Successfully`)
              
                setRoles([...roles,result.data])
                setNewRole('')
                //setLoader(false)
            })
            .catch(error => {
                console.log('error', error)

                //setLoader(false)
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
        //setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(formData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/payroll/addPayRollDetails`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // AddRow(result.data)
                // handleClose()
                toast.success('Added Payroll Successfully')
                clearFields()
                //setLoader(false)
            })
            .catch(error => {
                console.log('error', error)

                //setLoader(false)
            });
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
        name: '',
        role_type: '',
        amount: '',
    })
    }
    const handleDelete = (item) => {

        console.log('You clicked the delete icon.',item);
        //setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(
            {
                "id":item.id
            }
        );

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/payroll/deletePayrollRole`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // AddRow(result.data)
                // handleClose()
                toast.success(`Removed ${item.role_name} Role Successfully`)
                let temp=roles.filter(each=>each.role_name!=item?.role_name)
                setRoles(temp)      
                
                //setLoader(false)
            })
            .catch(error => {
                console.log('error', error)

                //setLoader(false)
            });
     
      
      };
    
    return (
        <div className='PayrollCard'>
           <div className='flex flex-row justify-between'>
            <h2>Payroll
                
            </h2>
            <div>
        <span className='eds__Btn'>
                  <button className='button' onClick={()=>setDialog(true)} style={{ width: 'max-content' }} name="upload">
                  <img
                  alt="Settings"
                  src={Settings}
                  width={25}
                  height={23}
                />
                    <span className='normal-case'> Manage Roles</span>
                  </button>
                </span>
        </div></div>
            {/* <Loader /> */}
            
            <Dialog
            open={isOpen}
            onClose={handleClose}
            // scroll={paper}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{ style: { borderRadius: '10px' } }}
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
                            <div className='flex items-center'><TextField value={newRole} placeholder='Add Role' onChange={(event)=>setNewRole(event.target.value)}/>
                            <Button onClick={handleAddRole}>Add Role</Button>
                            </div>
                            <div className='flex flex-wrap p-3 gap-2'>{
                                roles?.map((item,index)=>{
                                    return  <Chip key={index} label={`${item.role_name}`}  onDelete={()=>handleDelete(item)} />
                                })
                                }</div>
                                
                        </Box>

                    </DialogContentText>
                </div>
            </DialogContent>



        </Dialog>
        
        {/* <Button onClick={()=>setDialog(true)} >Manage Roles</Button> */}
              <form onSubmit={handleSubmit} className='prDeatails__Box'>
                
                    
             
                <table className='' style={{borderCollapse:'separate',borderSpacing:'0px 25px'}}>
                    <tr className='p-3'>{/*class="flex items-center gap-10 flex-wrap"*/}
                        <td>Name</td>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
                       <td>
                        {/* <TextField className='nText__Fld'
                            type="text"
                            value={formData?.name}
                            onChange={onChangeInput}
                            placeholder='Enter Name'
                            required
                            autoComplete="off"
                            name='name'
                        /> */}
                        <div className='input__Fld' style={{width:'250px'}}>
                                    <input
                                        type="text"
                                        value={formData?.name}
                                        onChange={onChangeInput}
                                        placeholder='Enter Name'
                                        required
                                        autoComplete="off"
                                        name='name'
                                    />
                                </div>
                        </td> 
                    </tr>
                    <tr className='p-3'>
                        <td>Role Type</td>
                        {/* <Autocomplete className='nText__Fld'
                            options={roles}
                            value={formData?.role_type}
                            onChange={(event, newValue) => handleAutocompleteChange('role_type', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Role Type"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            )}
                        /> */}
                      <td><div className='input__Fld' style={{width:'250px',height:'46px'}}>  <Select
    name='role_type'
    value={formData?.role_type}
    placeholder='Select role'
    onChange={onChangeInput}
    sx={{
        width:'100%'
    }}
    ><MenuItem value="">
  <em>None</em>
</MenuItem>
    {roles?.map((each,index)=>{
        return <MenuItem key={index} value={each.role_name}>{each.role_name}</MenuItem>
    })}
    
  </Select>
  </div></td> 
                    </tr>
                    <tr className='p-3'>{/*class="flex items-center gap-10 flex-wrap"*/}
                        <td>Amount</td>{/*class="w-40 text-gray-700 font-medium text-lg whitespace-nowrap"*/}
                       <td> <div ><TextField
                            // className='nText__Fld'
                            type="text"
                            value={formData?.amount}
                            onChange={onChangeInput}
                            placeholder='Enter Amount'
                            required
                            error={Boolean(errors.amount)}
                            helperText={errors.amount}
                            autoComplete="off"
                            name='amount'
                            sx={{width:'250px',height:'46px'}}
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
                </table>
                <div type='submit' className='sbt__Btn flex justify-around'>
                    <button style={{width:'max-content'}}>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default Payroll