

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
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

import image1 from "./../asset/img1.jpg";
import image2 from "./../asset/img2.jpg";
import image3 from "./../asset/img3.jpg";
import image4 from "./../asset/img4.jpg";
import image5 from "./../asset/img5.jpg";

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

    const [slide, setslide] = useState(0);

    const [lstofImages] = useState([
        {
            "src": image1,
            "alt": "image 1 for caurosel",
            "msg": ["CONNECT WITH FITNESS", "PROFESSIONALS & ENTHUSIASTS", "ACROSS THE GLOBE"]
        },
        {
            "src": image2,
            "alt": "image 2 for caurosel",
            "msg": ["GET FITNESS TIPS", " ", " "]
        },
        {
            "src": image3,
            "alt": "image 3 for caurosel",
            "msg": ["TRY NEW FIT RECIPES", " ", " "]
        },
        {
            "src": image4,
            "alt": "image 4 for caurosel",
            "msg": ["TRANSFORM YOURSELF", " ", " "]
        },
        {
            "src": image5,
            "alt": "image 5 for caurosel",
            "msg": ["BUY | SELL", "FITNESS PRODUCTS AND", "AVAIL SERVICES"]
        }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            let slideVal = (slide === (lstofImages.length - 1)) ? 0 : slide + 1;
            setslide(slideVal);
        }, 5000);
        return () => clearInterval(interval);
    }, [slide])

    return (

        <div className='hinherit relative'>
            <div className="abs trbl slide-change fixed">
                {
                    lstofImages.map((item, idx) => {
                        return (
                            <div key={idx} className={["abs trbl slide-item transition ease", ((idx == slide) ? "slide-img-on" : "")].join(" ")}>
                                <span className="abs trbl bg-cover bg-center" style={{ "backgroundImage": "url(" + item.src + ")" }}></span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="image-container-lp relative hinherit zindexfront">
                <div className="desktop flex padoff align-items-stretch justify-center zindexfront relative wrap hinherit ypad-off">
                    <div className="flex--5 md--6 sm--8 xsm--12 relative">
                        <div className="relative zindexfront h">
                            <div className="flex flex-container align-items-end justify-center hinherit padoff">
                                <div className="flex--12">
                                    <div className="scruve"></div>
                                    <div className="scruve-content">
                                        <div className="flex justify-center relative wrap">
                                            <div className="flex--8 xs--10">
                                                <TextField placeholder="EmailID"
                                                    fullWidth
                                                    value={forgetpwdData.user_email}
                                                    helperText={(forgetpwdData.user_email_status) ? "email id is not valid" : ""}
                                                    sx={{ '& fieldset': { borderRadius: 33 } }}
                                                    InputProps={{
                                                        sx: { height: 40 },
                                                        startAdornment: <InputAdornment position="start">
                                                            <IconButton>
                                                                <EmailIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }}
                                                    variant="outlined" onChange={(evt) => handleChange(evt, "user_email")} />
                                            </div>
                                            <div className="flex--8 xs--10">
                                                <TextField placeholder="Whatsapp Number"
                                                    value={forgetpwdData.whatsapp_number}
                                                    fullWidth
                                                    helperText={(forgetpwdData.whatsapp_number_status) ? "whatsapp number is not entered" : ""}
                                                    sx={{ '& fieldset': { borderRadius: 33 } }}
                                                    InputProps={{
                                                        sx: { height: 40 },
                                                        startAdornment: <InputAdornment position="start">
                                                            <IconButton>
                                                                <WhatsAppIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }}
                                                    variant="outlined" onChange={(evt) => handleChange(evt, "whatsapp_number")} />
                                            </div>
                                            <div className="flex--8 xs--10">
                                                <TextField type="date"
                                                    value={forgetpwdData.dob}
                                                    fullWidth
                                                    placeholder="Date Of Birth"
                                                    helperText={(forgetpwdData.dob_status) ? "dob is not selected" : ""}
                                                    variant="outlined" onChange={(evt) => handleChange(evt, "dob")}
                                                    sx={{ '& fieldset': { borderRadius: 33 } }}
                                                    InputProps={{
                                                        sx: { height: 35 },
                                                        startAdornment: <InputAdornment position="start">
                                                            <IconButton>
                                                                <CalendarMonthIcon />
                                                            </IconButton>
                                                        </InputAdornment>,
                                                    }} />
                                            </div>
                                            <div className="flex--8 xs--10">
                                                <div className="text-center pad padtf">
                                                    <button onClick={handleSubmitClick} className="anchor-outline rounded ao-theme ao-fill-theme">
                                                        <span className="flex text-center grow">
                                                            <span><span className="pad padxd">Submit</span></span>
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="text-center pad padyf">
                                                    Remember Password?  <Link to="/login" className="anchor-outline ao-link-lightblack inlineblock pad padd rounded">Login</Link>
                                                </div>
                                                {
                                                    <DisplayMessage displayState={displaymsg} handleclose={handlecloseDisplayMsg} />
                                                }
                                            </div>
                                        </div>
                                        <div className="pad padyc"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordComponent