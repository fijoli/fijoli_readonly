

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import forgetpwdAction from '../actions/forgetpwdAction';
import "./ForgotPasswordComponent.css";

import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import passwordAction from '../actions/passwordAction';
import DisplayMessage from '../DisplayMessageComponent/DisplayMessage';

const ForgotPasswordComponent = () => {

    const dispatch      = useDispatch();
    const navigate      = useNavigate();
    const [displaymsg, setdisplaymsg]       = useState({});
    const [forgetpwdData, setforgetpwdData] = useState(
        {
            "whatsapp_number"   : "", 
            "whatsapp_number_status" : false,
            "user_email"        : "",
            "user_email_status" : false,
            "dob"               : "",
            "dob_status"        : false
        });

    const forgetpwdState = useSelector((state)=> state.storeComponent.forgetpwdState);
    const EMAIL_REGEX = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/
      );

    useEffect(()=>{
        if((undefined !== forgetpwdState) && (200 === forgetpwdState.status)){
            dispatch({"type": "reset_status"});
            navigate("/createpassword?whatsapp_number=" + forgetpwdData.whatsapp_number);
        }else if((undefined !== forgetpwdState) && (400 === forgetpwdState.status)){
            dispatch({"type": "reset_status"});
            // navigate("/error");  
            setdisplaymsg({"open": true, "msg": "Given data doesnt exists"});    
        }
    },[forgetpwdState])

    const handleChange = (evt, datatype) =>{
        if("whatsapp_number" === datatype){
            if (!`${evt.target.value}`.match(/^[0-9]{0,10}$/)) {
                // block the input if result does not match
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            }
        }
        let fieldType = [datatype] + "_status"
        setforgetpwdData({...forgetpwdData, [datatype]:evt.target.value, [fieldType]: false});
    }

    const handleSubmitClick = () =>{
        if(!IsValid()){
            dispatch(forgetpwdAction(forgetpwdData));
        }
    }

    function IsValid(){
        let validState = forgetpwdData;
        if(!EMAIL_REGEX.test(validState.user_email)){
            validState.user_email_status = true;
        }else if(validState.whatsapp_number === ""){
            validState.whatsapp_number_status = true;
        }else if(validState.dob === ""){
            validState.dob_status = true;
        }
        setforgetpwdData({...validState});
        return(validState.whatsapp_number_status || validState.user_email_status || validState.dob_status);
    }

    const handlecloseDisplayMsg = () =>{
        setdisplaymsg({"open": false, "msg": ""});
    }

  return (
    <div className="forgetpassword_main_container">
        <div className='forgetpassword_image_container'/>
        <table className='forgetpwd_table_container'>
            <tr >
                <td >
                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                        width: "300px"
                    }}>
                
                        <TextField placeholder="EmailID" 
                            fullWidth
                            value={forgetpwdData.user_email}
                            helperText={(forgetpwdData.user_email_status)?"email id is not valid":""}
                            sx={{
                                marginTop: "-6px",
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                '& fieldset': { borderRadius: 33 }
                            }}
                            InputProps={{  sx: {height: 40}, 
                                startAdornment:<InputAdornment position="start">
                                    <IconButton>
                                        <EmailIcon/>
                                    </IconButton>
                                </InputAdornment>
                                }}
                            variant="outlined" onChange={(evt)=> handleChange(evt, "user_email")}/>
                </Box>
                </td>
            </tr>
            <tr>
                <td>
                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                        width: '300px'
                    }}>

                    <TextField placeholder="Whatsapp Number"
                        value={forgetpwdData.whatsapp_number} 
                        fullWidth
                        helperText={(forgetpwdData.whatsapp_number_status)?"whatsapp number is not entered":""}
                        sx={{
                            marginTop: "-6px",
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            '& fieldset': { borderRadius: 33 }
                        }}
                        InputProps={{ sx: {height: 40}, 
                            startAdornment:<InputAdornment position="start">
                                <IconButton>
                                    <WhatsAppIcon/>
                                </IconButton>
                            </InputAdornment>
                        }}
                        variant="outlined" onChange={(evt)=> handleChange(evt, "whatsapp_number")}/>
                </Box>

                </td>
            </tr>
            <tr>
                <td>
                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                        width: '300px'
                    }}>

                <TextField type="date" 
                    value={forgetpwdData.dob}
                    fullWidth
                    placeholder="Date Of Birth" 
                    helperText={(forgetpwdData.dob_status)?"dob is not selected":""}
                    variant="outlined" onChange={(evt)=> handleChange(evt, "dob")}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 35 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <CalendarMonthIcon/>
                            </IconButton>
                        </InputAdornment>,
                    }}/>
                </Box>
                </td>
            </tr>
        </table>
        <div>
            <button onClick={handleSubmitClick} 
                    className="button_oval_style_submit_forgetpwd">Submit</button>
        </div>
        {
            <DisplayMessage displayState = {displaymsg} handleclose = {handlecloseDisplayMsg}/>
        }
    </div>
  )
}

export default ForgotPasswordComponent