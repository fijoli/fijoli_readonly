

import { Backdrop, Box, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import passwordAction from '../actions/passwordAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./CreatePasswordComponent.css";
import DisplayMessage from '../customControls/DisplayMessage';

const CreatePasswordComponent = () =>{

    const navigate                            = useNavigate();
    const dispatch                            = useDispatch();
    const [params]                            = useSearchParams();
    const [createEyeValue, setCreateEyeValue] = useState(false);
    const [confirmEyeValue, setConfirmEyeValue] = useState(false);
    // const [showerrMessage,  setshowerrMessage]  = useState(false);
    // const [errmessage,      seterrMessage]      = useState(false);
    const [showbackdrop, setShowbackdrop] = useState(false);
    const [passwordInfo, setpasswordInfo] = useState({
                    "createpwd":"",     
                    "createpwd_status":false,
                    "confirmpwd":"",
                    "confirmpwd_status":false,
                    "whatsapp_number":""
    });
    const [displaymsg, setdisplaymsg]       = useState({});

    const createpwdState    = useSelector((state)=> state.storeComponent.createpwdState);

    useEffect(()=>{

        if((undefined != createpwdState) && (200 === createpwdState.status)){
            dispatch({"type":"reset_status"});
            setTimeout(() => {
                setShowbackdrop(false);
                navigate("/loginpage")
            }, 3000);
            // navigate("/signupsuccess");
            setShowbackdrop(true);
        }else if((undefined != createpwdState) && (400 === createpwdState.status)){
            dispatch({"type":"reset_status"});
            // navigate("/error");
            setdisplaymsg({"open": true, "msg": "failed to save password details"});    
        }

    },[createpwdState]);

    const handleChangeName = (evt, pwdtype) => {
        let fieldtype = [pwdtype] +"_status";
        setpasswordInfo({...passwordInfo, [pwdtype]:evt.target.value, [fieldtype]: false});
    }

    const handlePasswordVisibility = () => {
        setCreateEyeValue(!createEyeValue);
    }

    const handleConfirmPasswordVisibility = () =>{
        setConfirmEyeValue(!confirmEyeValue);
    }

    const handleSubmitClick = (evt) => {
        if(((passwordInfo["createpwd"] === "") || ("" === passwordInfo["confirmpwd"])) ||
            (passwordInfo["createpwd"] !== passwordInfo["confirmpwd"])){
            setpasswordInfo({...passwordInfo, "createpwd_status":true});
        }else{
            passwordInfo["whatsapp_number"] = params.get("whatsapp_number");
            dispatch(passwordAction(passwordInfo));
        }
    }

    // const handleclosedialog = () =>{
    //     seterrMessage("");
    //     setshowerrMessage(false);
    // }

    const handlecloseDisplayMsg = () =>{
        setdisplaymsg({"open": false, "msg": ""});
    }

  return (
    <div className='createpassword_main_container'>
        <div className='createpassword_image_container'/>
        <table className='createpwd_table_container'>
            <tr>
                <td>

                <Box
                    sx={{ boxShadow: 2,
                        height: '27px',
                        p: 1, m: 1,
                        borderRadius: '25px',
                    }}>

                <TextField type={createEyeValue? "text":"password"} 
                    fullWidth
                    placeholder="Create a Password" 
                    helperText={(passwordInfo.createpwd_status)?"please input a password":""}
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "createpwd")}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 35 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <LockIcon/>
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={handlePasswordVisibility}>
                                {
                                    (createEyeValue)?<VisibilityIcon/>:<VisibilityOffIcon/>
                                }
                            </IconButton>
                        </InputAdornment>
                    }}/>
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
                    }}>


                <TextField type={confirmEyeValue? "text":"password"} 
                    fullWidth
                    placeholder="Confirm Password" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "confirmpwd")}
                    sx={{
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 35 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <LockIcon/>
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={handleConfirmPasswordVisibility}>
                                {
                                    (confirmEyeValue)?<VisibilityIcon/>:<VisibilityOffIcon/>
                                }
                            </IconButton>
                        </InputAdornment>
                    }}/>
                    </Box>
                </td>
            </tr>
        </table>
        <div>
            <button onClick={handleSubmitClick} 
                    className="button_oval_style_submit_createpwd">Submit</button>
        </div>
        {
            <DisplayMessage displayState = {displaymsg} handleclose = {handlecloseDisplayMsg}/>
        }
        {/* {
            showerrMessage &&
            <DisplayMessage isopenDialog={showerrMessage} 
                Heading = "Error:"
                msgStatus ={errmessage} handleclosedialog = {handleclosedialog} />
        } */}
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showbackdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
  )
}

export default CreatePasswordComponent