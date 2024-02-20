

import { Backdrop, Box, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import passwordAction from '../actions/passwordAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DisplayMessage from '../customControls/DisplayMessage';

import intro_image from "./../asset/trainer.jpg";
import { SITECONF } from '../helper/siteconf';

const CreatePasswordComponent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const [createEyeValue, setCreateEyeValue] = useState(false);
    const [confirmEyeValue, setConfirmEyeValue] = useState(false);
    // const [showerrMessage,  setshowerrMessage]  = useState(false);
    // const [errmessage,      seterrMessage]      = useState(false);
    const [showbackdrop, setShowbackdrop] = useState(false);
    const [passwordInfo, setpasswordInfo] = useState({
        "createpwd": "",
        "createpwd_status": false,
        "confirmpwd": "",
        "confirmpwd_status": false,
        "whatsapp_number": ""
    });
    const [displaymsg, setdisplaymsg] = useState({});

    const createpwdState = useSelector((state) => state.storeComponent.createpwdState);

    useEffect(() => {

        if ((undefined !== createpwdState) && (200 === createpwdState.status)) {
            dispatch({ "type": "reset_status" });
            setTimeout(() => {
                setShowbackdrop(false);
                navigate("/login")
            }, 3000);
            // navigate("/signupsuccess");
            setShowbackdrop(true);
        } else if ((undefined !== createpwdState) && (400 === createpwdState.status)) {
            dispatch({ "type": "reset_status" });
            // navigate("/error");
            setdisplaymsg({ "open": true, "msg": "failed to save password details" });
        }

    }, [createpwdState]);

    const handleChangeName = (evt, pwdtype) => {
        let fieldtype = [pwdtype] + "_status";
        setpasswordInfo({ ...passwordInfo, [pwdtype]: evt.target.value, [fieldtype]: false });
    }

    const handlePasswordVisibility = () => {
        setCreateEyeValue(!createEyeValue);
    }

    const handleConfirmPasswordVisibility = () => {
        setConfirmEyeValue(!confirmEyeValue);
    }

    const handleSubmitClick = (evt) => {
        if (((passwordInfo["createpwd"] === "") || ("" === passwordInfo["confirmpwd"])) ||
            (passwordInfo["createpwd"] !== passwordInfo["confirmpwd"])) {
            setpasswordInfo({ ...passwordInfo, "createpwd_status": true });
        } else {
            passwordInfo["whatsapp_number"] = params.get("whatsapp_number");
            dispatch(passwordAction(passwordInfo));
        }
    }

    // const handleclosedialog = () =>{
    //     seterrMessage("");
    //     setshowerrMessage(false);
    // }

    const handlecloseDisplayMsg = () => {
        setdisplaymsg({ "open": false, "msg": "" });
    }

    return (

        <>
            <div className="flex padoff align-items-stretch justify-center wrap hinherit ypad-off slide-container">
                <div className="desk-col slide-picture  relative transition">
                    <div className="abs trbl slide-change slide-b-radius oh bg grey-skin transition">
                        <div className={["abs trbl slide-item transition ease slide-img-on"].join(" ")}>
                            <span className="abs trbl bg-cover bg-center" style={{ "backgroundImage": "url(" + intro_image + ")" }}></span>
                        </div>
                    </div>
                    <div className="flex wrap align-items-stretch relative justify-center h">
                        <div className="flex--12">
                            <div className="pad padd">
                                <a href={null} className="anchor-outline ao-black-theme inlineblock circle nolh"  >
                                    <span className="flex justify-center align-items-center h text-center">
                                        <span><i className="pad padx1 fa5 fa5-arrow-left"></i></span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="flex--12">
                            <div className="flex align-items-center h justify-center">
                                <div>
                                    <h1 className='brand-h1'>Fijoli</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="desk-col slide-card">
                    <div className="pad padyf">
                        <div className="flex wrap justify-center">
                            <div className="flex--10 xs--12">
                                <TextField type={createEyeValue ? "text" : "password"}
                                    fullWidth
                                    placeholder="Create a Password"
                                    helperText={(passwordInfo.createpwd_status) ? "please input a password" : ""}
                                    variant="outlined" onChange={(evt) => handleChangeName(evt, "createpwd")}
                                    sx={{
                                        // "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                        '& fieldset': { borderRadius: 33 }
                                    }}
                                    InputProps={{
                                        sx: { height: SITECONF.INPUT_HEIGHT },
                                        startAdornment: <InputAdornment position="start">
                                            <IconButton>
                                                <LockIcon />
                                            </IconButton>
                                        </InputAdornment>,
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={handlePasswordVisibility}>
                                                {
                                                    (createEyeValue) ? <VisibilityIcon /> : <VisibilityOffIcon />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    }} />
                            </div>
                            <div className="flex--10 xs--12">
                                <TextField type={confirmEyeValue ? "text" : "password"}
                                    fullWidth
                                    placeholder="Confirm Password"
                                    variant="outlined" onChange={(evt) => handleChangeName(evt, "confirmpwd")}
                                    sx={{
                                        // "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                        '& fieldset': { borderRadius: 33 }
                                    }}
                                    InputProps={{
                                        sx: { height: SITECONF.INPUT_HEIGHT },
                                        startAdornment: <InputAdornment position="start">
                                            <IconButton>
                                                <LockIcon />
                                            </IconButton>
                                        </InputAdornment>,
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={handleConfirmPasswordVisibility}>
                                                {
                                                    (confirmEyeValue) ? <VisibilityIcon /> : <VisibilityOffIcon />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    }} />
                            </div>
                        </div>
                        <div className="text-center pad padyf">
                            <button onClick={handleSubmitClick} className="anchor-outline rounded ao-fill-theme font-bold">
                                <span className="flex text-center grow">
                                    <span><span className="pad padxd">Submit</span></span>
                                </span>
                            </button>
                        </div>
                        {
                            <DisplayMessage displayState={displaymsg} handleclose={handlecloseDisplayMsg} />
                        }
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showbackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default CreatePasswordComponent