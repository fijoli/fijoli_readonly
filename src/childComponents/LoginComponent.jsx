import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionloginUser from "../actions/actionloginUser";
// import loginImage from "./../asset/image1.jpg";
// import "./../styles/OvalButton.css";
import { Link } from "react-router-dom";
import "./LoginComponent.css";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LockIcon from '@mui/icons-material/Lock';


import { IconButton, InputAdornment, TextField } from "@mui/material";
// import DisplayMessage from "../DisplayMessageComponent/DisplayMessage";
import clearErrorMessageAction from "../actions/clearErrorMessageAction";

import image1 from "./../asset/img1.jpg";
import image2 from "./../asset/img2.jpg";
import image3 from "./../asset/img3.jpg";
import image4 from "./../asset/img4.jpg";
import image5 from "./../asset/img5.jpg";

//component which is used to login 
const LoginComponent = () => {

    //usestate, dispatch, navigate and selector variables
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [eyeValue, seteyeValue] = useState(false);
    const [loginData, setloginData] = useState({
        "whatsapp_number": "",
        "whatsapp_number_status": false,
        "encrypted_password": "",
        "encrypted_password_status": false
    });

    const [displaymsg, setdisplaymsg] = useState({});

    const loginState = useSelector((state) => state.storeComponent.loginState);
    const errormsgstate = useSelector(state => state.storeComponent.errormsg);
    useEffect(() => {
        if (errormsgstate) {
            setdisplaymsg({ "open": true, "msg": errormsgstate.errormsg });
        }
    }, [errormsgstate]);

    ///<summary>
    // api handles password visibility state
    ///</summary>
    const handlePasswordVisibility = () => {
        seteyeValue(!eyeValue);
    }


    useEffect(() => {
        //reset and navigate once response 
        if ((loginState) && (200 === loginState.status)) {
            dispatch({ type: "reset_status" })
            navigate("/homepage");
        }
    }, [loginState]);

    ///<summary>
    /// api set login info  
    ///</summary>
    const handlechange = (evt, datatype) => {
        if ("whatsapp_number" === datatype) {
            if (!`${evt.target.value}`.match(/^[0-9]{0,10}$/)) {
                // block the input if result does not match
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            }
        }
        let fieldtype = [datatype] + "_status";
        setloginData({ ...loginData, [datatype]: evt.target.value, [fieldtype]: false });
    }

    ///<summary>
    /// api handles login click
    ///</summary>
    const handleLoginClickEvent = () => {
        if (!IsValid()) {
            dispatch(actionloginUser(loginData));
        }
    }

    const handlecloseDisplayMsg = () => {
        setdisplaymsg({ "open": false, "msg": "" });
        dispatch(clearErrorMessageAction());
    }

    function IsValid() {
        let validData = loginData;

        if (validData.whatsapp_number.toString().length < 10) {
            validData.whatsapp_number_status = true;
        } else if (validData.encrypted_password === "") {
            validData.encrypted_password_status = true;
        }

        setloginData({ ...validData });
        return (validData.encrypted_password_status || validData.whatsapp_number_status);
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
                                        <div className="flex justify-center relative">
                                            <div className="flex--8 xs--23">
                                                {/* whatsapp number text field */}
                                                <TextField
                                                    fullWidth
                                                    value={loginData.whatsapp_number}
                                                    placeholder="whatsapp Number"
                                                    helperText={(loginData.whatsapp_number_status) ? "Whatsapp Number is not correct or not entered" : ""}
                                                    sx={{ '& fieldset': { borderRadius: 33 } }}
                                                    InputProps={{
                                                        sx: { height: 40 },
                                                        startAdornment: <InputAdornment position="start">
                                                            <IconButton>
                                                                <WhatsAppIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }}
                                                    variant="outlined"
                                                    onChange={(evt) => handlechange(evt, "whatsapp_number")} />

                                                {/* password control */}
                                                <div className="credential-Item">
                                                    <TextField type={eyeValue ? "text" : "password"}
                                                        fullWidth
                                                        value={loginData.encrypted_password}
                                                        placeholder="Password"
                                                        helperText={(loginData.encrypted_password_status) ? "password is not correct or not entered" : ""}
                                                        variant="outlined"
                                                        onChange={(evt) => handlechange(evt, "encrypted_password")}
                                                        sx={{ '& fieldset': { borderRadius: 33 } }}
                                                        InputProps={{
                                                            sx: { height: 40 },
                                                            startAdornment: <InputAdornment position="start">
                                                                <IconButton>
                                                                    <LockIcon />
                                                                </IconButton>
                                                            </InputAdornment>,
                                                            endAdornment: <InputAdornment position="end">
                                                                <IconButton onClick={handlePasswordVisibility}>
                                                                    {
                                                                        (eyeValue) ? <VisibilityIcon /> : <VisibilityOffIcon />
                                                                    }
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }} />
                                                </div>
                                                <div className="text-center pad padtf">
                                                    <button onClick={handleLoginClickEvent} className="anchor-outline rounded ao-theme ao-fill-theme">
                                                        <span className="flex text-center grow">
                                                            <span><span className="pad padxd">Login</span></span>
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="text-center pad padyf">
                                                    <Link to="/forgetpassword" className="anchor-outline ao-link-lightblack inlineblock pad padd rounded">Forget Password ?</Link>
                                                </div>
                                                <div className="text-center pad padyd">
                                                    Don't have an account ? <Link to="/signupform1" className="anchor-outline ao-link-lightblack inlineblock pad padd rounded">Create Account</Link>
                                                </div>
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



export default LoginComponent;