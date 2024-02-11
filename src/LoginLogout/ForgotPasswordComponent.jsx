import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import forgetpwdAction from '../actions/forgetpwdAction';
import "./ForgotPasswordComponent.css";

import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import passwordAction from '../actions/passwordAction';
import DisplayMessage from '../DisplayMessageComponent/DisplayMessage';

import { SlideLayoutTemplate } from '../childComponents/SlideLayoutComponent/template';

const ForgotPasswordComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [displaymsg, setdisplaymsg] = useState({});
    const [forgetpwdData, setforgetpwdData] = useState(
        {
            "whatsapp_number": "",
            "whatsapp_number_status": false,
            "user_email": "",
            "user_email_status": false,
            "dob": "",
            "dob_status": false
        });

    const forgetpwdState = useSelector((state) => state.storeComponent.forgetpwdState);
    const EMAIL_REGEX = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/
    );

    useEffect(() => {
        if ((undefined != forgetpwdState) && (200 === forgetpwdState.status)) {
            dispatch({ "type": "reset_status" });
            navigate("/createpassword?whatsapp_number=" + forgetpwdData.whatsapp_number);
        } else if ((undefined != forgetpwdState) && (400 === forgetpwdState.status)) {
            dispatch({ "type": "reset_status" });
            // navigate("/error");  
            setdisplaymsg({ "open": true, "msg": "Given data doesnt exists" });
        }
    }, [forgetpwdState])

    const handleChange = (evt, datatype) => {
        if ("whatsapp_number" === datatype) {
            if (!`${evt.target.value}`.match(/^[0-9]{0,10}$/)) {
                // block the input if result does not match
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            }
        }
        let fieldType = [datatype] + "_status"
        setforgetpwdData({ ...forgetpwdData, [datatype]: evt.target.value, [fieldType]: false });
    }

    const handleSubmitClick = () => {
        if (!IsValid()) {
            dispatch(forgetpwdAction(forgetpwdData));
        }
    }

    function IsValid() {
        let validState = forgetpwdData;
        if (!EMAIL_REGEX.test(validState.user_email)) {
            validState.user_email_status = true;
        } else if (validState.whatsapp_number === "") {
            validState.whatsapp_number_status = true;
        } else if (validState.dob === "") {
            validState.dob_status = true;
        }
        setforgetpwdData({ ...validState });
        return (validState.whatsapp_number_status || validState.user_email_status || validState.dob_status);
    }

    const handlecloseDisplayMsg = () => {
        setdisplaymsg({ "open": false, "msg": "" });
    }

    return (
        <SlideLayoutTemplate {...{}}>
            {
                {
                    component: () => {
                        return (
                            <>
                                <div className="desk-col">
                                    <div className="flex justify-center relative wrap">
                                        <div className="flex--10 xs--12">
                                            <TextField placeholder="EmailID"
                                                fullWidth
                                                value={forgetpwdData.user_email}
                                                helperText={(forgetpwdData.user_email_status) ? "email id is not valid" : ""}
                                                sx={{ '& fieldset': { borderRadius: 33 } }}
                                                InputProps={{
                                                    sx: { height: 50 },
                                                    startAdornment: <InputAdornment position="start">
                                                        <IconButton>
                                                            <EmailIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                                variant="outlined" onChange={(evt) => handleChange(evt, "user_email")} />
                                        </div>
                                        <div className="flex--10 xs--12">
                                            <TextField placeholder="Whatsapp Number"
                                                value={forgetpwdData.whatsapp_number}
                                                fullWidth
                                                helperText={(forgetpwdData.whatsapp_number_status) ? "whatsapp number is not entered" : ""}
                                                sx={{ '& fieldset': { borderRadius: 33 } }}
                                                InputProps={{
                                                    sx: { height: 50 },
                                                    startAdornment: <InputAdornment position="start">
                                                        <IconButton>
                                                            <WhatsAppIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                                variant="outlined" onChange={(evt) => handleChange(evt, "whatsapp_number")} />
                                        </div>
                                        <div className="flex--10 xs--12">
                                            <TextField type="date"
                                                value={forgetpwdData.dob}
                                                fullWidth
                                                placeholder="Date Of Birth"
                                                helperText={(forgetpwdData.dob_status) ? "dob is not selected" : ""}
                                                variant="outlined" onChange={(evt) => handleChange(evt, "dob")}
                                                sx={{ '& fieldset': { borderRadius: 33 } }}
                                                InputProps={{
                                                    sx: { height: 50 },
                                                    startAdornment: <InputAdornment position="start">
                                                        <IconButton>
                                                            <CalendarMonthIcon />
                                                        </IconButton>
                                                    </InputAdornment>,
                                                }} />
                                        </div>
                                    </div>

                                    <div className="text-center pad padtb">
                                        <button onClick={handleSubmitClick} className="anchor-outline rounded ao-fill-theme font-bold">
                                            <span className="flex text-center grow">
                                                <span><span className="pad padxd">Submit</span></span>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="text-center pad padyd">
                                        Remember Password?  <Link to="/login" className="anchor-outline ao-link-lightblack inlineblock pad padd rounded">Login</Link>
                                    </div>
                                    {
                                        <DisplayMessage displayState={displaymsg} handleclose={handlecloseDisplayMsg} />
                                    }
                                </div>
                                <div className="pad padyc"></div>
                            </>
                        )
                    }
                }
            }
        </SlideLayoutTemplate>
    )
}

export default ForgotPasswordComponent