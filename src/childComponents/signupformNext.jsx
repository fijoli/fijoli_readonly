import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import getregisteredInfo from "../actions/getProfileData";
import storeregistrantInfo from "../actions/updateSignupFormData";
import { Link, Box, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import "./SignupformNext.css";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { SlideLayoutTemplate } from "./SlideLayoutComponent/template";

const SignUpFormNext = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const lstofforms = ["form1", "form2"];

    const [createEyeValue, setCreateEyeValue] = useState(false);
    const [confirmEyeValue, setConfirmEyeValue] = useState(false);
    const signupCredentials = useSelector((state)=> state.storeComponent.credentials)

    const [lstoftrainers, setlstoftrainers] = useState([]) ;
    const [registrantInfo, setregistrantInfo] = useState(signupCredentials);

    const regConfigInfo = useSelector((state)=>state.storeComponent.configData);

    useEffect(()=>{
        if(lstoftrainers.length === 0){
            console.log("dispatch useEffect");
            dispatch(getregisteredInfo(params.get("whatsapp_number")));
        }
    },[lstoftrainers]);

    useEffect(()=>{

        //return if object is not initialized
        if(0 === Object.keys(regConfigInfo).length){
            return;
        }

        //redirect error page if the user is not valid
        if (regConfigInfo.status === 400) {
            navigate("/error");
            return;
        }

        //set user name and wusername to the existing level
        setregistrantInfo({...registrantInfo, "user_category":(registrantInfo)?registrantInfo.user_category:"", "user_name": regConfigInfo.profileData.user_name, "whatsapp_user_name": regConfigInfo.profileData.whatsapp_user_name});
        setlstoftrainers(regConfigInfo.user_category);

    },[regConfigInfo]);

    const handleChangeName = (evt, type) =>{
        let state = [type] + "_status";
        setregistrantInfo({...registrantInfo, [type]: evt.target.value, [state]: false});
    }

    const handlePasswordVisibility = () => {
        setCreateEyeValue(!createEyeValue);
    }

    const handleConfirmPasswordVisibility = () => {
        setConfirmEyeValue(!confirmEyeValue);
    }

    const handleNextEvent = (evt) =>{

        // if(registrantInfo.createpwd != registrantInfo.confirmpwd){
        //     // navigate("/error");
        //     setregistrantInfo({...registrantInfo, "createpwd_status" : false});
        //     return;
        // }
        if(!IsValid()){
            dispatch(storeregistrantInfo("store_registrantInfo", registrantInfo));
            dispatch({type:"reset_status"});
            navigate("/signupform3");
        }
    }

    function IsValid(){
        let registerinfo = registrantInfo;
        let selectedDate   = new Date(registerinfo.dob);
        let actualDate    = new Date();
        actualDate.setFullYear(actualDate.getFullYear() - 18);
        if(registerinfo.createpwd === ""){
            registerinfo['createpwd_status'] =  true;
        }else if((registerinfo.confirmpwd === "") || (registerinfo.createpwd !== registerinfo.confirmpwd)){
            registerinfo['confirmpwd_status'] =  true;
        }else if(registerinfo.location === ""){
            registerinfo['location_status'] =  true;
        }else if(registerinfo.dob === ""){
            registerinfo['dob_status'] =  true;
        }else if(registerinfo.user_category === ""){
            registerinfo['user_category_status'] =  true;
        }else if(registrantInfo.dob !== "" && selectedDate.getFullYear() > actualDate.getFullYear()){
            registerinfo['dob_status'] =  true;
        }
        setregistrantInfo({...registerinfo});
        return (registerinfo.createpwd_status || registerinfo.confirmpwd_status ||
            registerinfo.location_status || registerinfo.dob_status || registerinfo.user_category_status);
    }

    const handleSelect = (evt) =>{
        setregistrantInfo({...registrantInfo, "user_category": evt.target.value, "user_category_status": false });
    }

    return (
        <SlideLayoutTemplate {...{registrantInfo}}>
            {
                {
                    component: (props) => {
                        let {registrantInfo} = props;
                        registrantInfo = registrantInfo || {}
                        console.log(registrantInfo)
                        return (
                            <>
                                <div className="flex justify-center relative wrap">
                                    <div className="">
                                        <div className="text-center">
                                            <h2 className='lead h5 color color-theme'>Welcome, {registrantInfo.user_name}</h2>
                                            <p className=''>
                                                Just couple more steps to get you onboarded.
                                            </p>
                                            <p className='opacity75'>
                                                Let’s complete your profile
                                            </p>
                                            <div className="flex wrap">
                                                <div className="flex--12">
                                                    <TextField placeholder="Whatsapp Number"
                                                        value={registrantInfo.whatsapp_user_name}
                                                        fullWidth
                                                        variant="outlined"
                                                        label=" "
                                                        onChange={(evt) => handleChangeName(evt, "whatsappnumber")}
                                                        sx={{ '& fieldset': { borderRadius: 33 } }}
                                                        required
                                                        helperText={(registrantInfo.whatsapp_number_status) ? "Whatsapp number is incorrect." : ""}
                                                        InputProps=
                                                        {{
                                                            sx: { height: 50 },
                                                            startAdornment:
                                                                <InputAdornment position="start">
                                                                    <IconButton> <WhatsAppIcon /></IconButton>
                                                                </InputAdornment>
                                                        }} />
                                                </div>
                                                <div className="flex--12">
                                                    <TextField type={createEyeValue ? "text" : "password"}
                                                        fullWidth
                                                        placeholder="Create a Password"
                                                        helperText={(registrantInfo.createpwd_status) ? "please input password" : ""}
                                                        variant="outlined" onChange={(evt) => handleChangeName(evt, "createpwd")}
                                                        sx={{
                                                            '& fieldset': { borderRadius: 33 }
                                                        }}
                                                        InputProps={{
                                                            sx: { height: 50 },
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
                                                <div className="flex--12">
                                                    <TextField type={confirmEyeValue ? "text" : "password"}
                                                        fullWidth
                                                        placeholder="Confirm Password"
                                                        helperText={(registrantInfo.confirmpwd_status) ? "password mismatch" : ""}
                                                        variant="outlined" onChange={(evt) => handleChangeName(evt, "confirmpwd")}
                                                        sx={{
                                                            '& fieldset': { borderRadius: 33 }
                                                        }}
                                                        InputProps={{
                                                            sx: { height: 50 },
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
                                                <div className="flex--12">
                                                    <TextField type="text"
                                                        fullWidth
                                                        helperText={(registrantInfo.location_status) ? "Please select the location" : ""}
                                                        placeholder="location"
                                                        variant="outlined" onChange={(evt) => handleChangeName(evt, "location")}
                                                        sx={{
                                                            '& fieldset': { borderRadius: 33 }
                                                        }}
                                                        InputProps={{
                                                            sx: { height: 50 },
                                                            startAdornment: <InputAdornment position="start">
                                                                <IconButton>
                                                                    <LocationOnIcon />
                                                                </IconButton>
                                                            </InputAdornment>,
                                                        }} />
                                                </div>
                                                <div className="flex--12">
                                                    <TextField type="date"
                                                        fullWidth
                                                        placeholder="Date Of Birth"
                                                        helperText={(registrantInfo.dob_status) ? "You need to be minimum 18 years to register on fijoli" : ""}
                                                        variant="outlined" onChange={(evt) => handleChangeName(evt, "dob")}
                                                        sx={{
                                                            '& fieldset': { borderRadius: 33 }
                                                        }}
                                                        InputProps={{
                                                            sx: { height: 50 },
                                                            startAdornment: <InputAdornment position="start">
                                                                <IconButton>
                                                                    <CalendarMonthIcon />
                                                                </IconButton>
                                                            </InputAdornment>,
                                                        }} />
                                                </div>
                                                <div className="flex--12">
                                                    <Select displayEmpty value={registrantInfo.user_category}
                                                        onChange={handleSelect}
                                                        style={{ height: "50px", borderRadius: "33px", width: "100%", alignItems: "center", justifyContent: "center" }}>
                                                        <MenuItem value="" disabled>Who am I</MenuItem>
                                                        {
                                                            lstoftrainers.map((item, idx) => {
                                                                return <MenuItem key={idx} value={idx + 1}>{item}</MenuItem>
                                                            })
                                                        }
                                                    </Select>
                                                    {
                                                        (registrantInfo.user_category_status) &&
                                                        <div>Please select User category</div>
                                                    }
                                                </div>
                                                <div className="flex--12">
                                                    <div className="text-center pad padtb">
                                                        <button onClick={handleNextEvent} className="anchor-outline rounded ao-fill-theme font-bold">
                                                            <span className="flex text-center grow">
                                                                <span><span className="pad padxd">Next</span></span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="pad padyc"></div>
                            </>
                        )
                    }
                }
            }
        </SlideLayoutTemplate>

    );
}

export default SignUpFormNext;