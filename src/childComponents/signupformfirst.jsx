import "./Signupformfirst.css";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import registerInfoAction     from "../actions/registerInfo"
import {Box, IconButton, InputAdornment, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DisplayMessage from "../DisplayMessageComponent/DisplayMessage";
import { red } from "@mui/material/colors";

const SignUpFormFirst = () =>{

    //navigate and dispatch objects
    const dispatch  = useDispatch();
    const navigate  = useNavigate();
    const [displaymsg, setdisplaymsg]       = useState({});

    const EMAIL_REGEX = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/
      );

    //create state variables to store the entered values
    const [regInfo, setregInfo]   = useState({
        "user_name"         : "", 
        "user_name_status"   : false,
        "user_email"        : "", 
        "user_email_status"   : false,
        "whatsapp_number"   : "", 
        "whatsapp_number_status"   : false,
        "gender"            : "",
        "gender_status"   : false,
        "is_active"         : 0,
        "is_active_status"   : false
    })

    //fetch the response of initial register info
    const registrationState          = useSelector((state)=>state.storeComponent.registrationState);

    //if initial response is registered successfully
    //redirect to signupsuccess else to error page
    useEffect(()=>{

        if(registrationState){
            if(registrationState.status === 200){
                navigate("/signupsuccess");
            }else if(registrationState.status === 400){
                // navigate("/error");
                setdisplaymsg({"open": true, "msg": "Whatsapp_number already exists"});
            }
        }

    },[registrationState]);

    ///<summary>
    // handle change to update signup form data
    ///</summary>
    const handleChange = (evt, formDataType) => {
        if("whatsapp_number" === formDataType){
            if (!`${evt.target.value}`.match(/^[0-9]{0,10}$/)) {
                // block the input if result does not match
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            }
        }
        const dataState = [formDataType] + "_status";
        setregInfo({...regInfo, [formDataType]: evt.target.value, [dataState] : false});
    }

    ///<summary>
    // saves the registered data in server
    ///</summary>
    const handleClickEvent = (evt) => {
        if(!IsValid()){
            //invoke api to register the new registrant data
            dispatch(registerInfoAction(regInfo));
        }
    }

    function IsValid(){
        let registerInfo = regInfo;
        if(regInfo.user_name === ""){
            registerInfo['user_name_status'] =  true;
        }else if(!EMAIL_REGEX.test(regInfo.user_email)){
            registerInfo['user_email_status'] =  true;
        }else if(regInfo.whatsapp_number.toString().length < 10){
            registerInfo['whatsapp_number_status'] =  true;
        }else if(regInfo.gender === ""){
            registerInfo['gender_status'] =  true;
        }else if(regInfo.is_active === 0){
            registerInfo['is_active_status'] =  true;
        }
        setregInfo({...registerInfo});
        return (registerInfo.user_name_status || registerInfo.user_email_status ||
                registerInfo.whatsapp_number_status || registerInfo.gender_status || registerInfo.is_active_status);
    }

    ///<summary>
    // handle gender update 
    ///</summary>
    const handlegenderChange = (gendertype) =>{
        setregInfo({...regInfo, ["gender"]: gendertype, ["gender_status"]: false});
    }

    ///<summary>
    // handle agree terms n condition state
    ///</summary>
    const handleagreeChange = (evt) =>{
        let is_active   = (evt.target.checked)?1:0;
        setregInfo({...regInfo, ["is_active"]: is_active, ["is_active_status"]: false});
    }

    const handlecloseDisplayMsg = () =>{
        setdisplaymsg({"open": false, "msg": ""});
    }

    return(
        <div className="signupformfirst-container">
            <div className="image-main-firstform"/>
                <div className="signupformfirst-container-box"> 
                    {/* name text box */}
                    <Box sx={{ boxShadow: 2, height: '27px', p: 1, m: 1, borderRadius: '25px',marginBottom: '20px' }}>
                        <TextField placeholder="Name"
                            value={regInfo.user_name} 
                            fullWidth
                            variant="outlined" 
                            onChange={(evt)=> handleChange(evt, "user_name")}
                            sx=
                            {{ 
                                marginTop: "-6px",
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                '& fieldset': { borderRadius: 33 } 
                            }}
                            helperText= {(regInfo.user_name_status)?"Name is incorrect.":""}
                            required
                            InputProps=
                            {{ 
                                sx: { height: 40 }, 
                                startAdornment:
                                    <InputAdornment position="start">
                                        <IconButton> <PersonIcon/></IconButton>
                                    </InputAdornment>
                            }}/>
                    </Box>                      

                    {/* emailid text box */}
                    <Box sx={{ boxShadow: 2, height: '27px', p: 1, m: 1, borderRadius: '25px', marginBottom: '20px'}}>
                        <TextField placeholder="EmailID" 
                            value={regInfo.user_email}
                            fullWidth
                            variant="outlined" 
                            onChange={(evt)=> handleChange(evt, "user_email")}
                            sx=
                            {{ 
                                marginTop: "-6px",
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                '& fieldset': { borderRadius: 33 } 
                            }}
                            required
                            helperText= {(regInfo.user_email_status)?"EmailId is incorrect.":""}
                            InputProps=
                            {{ 
                                sx: {height: 40}, 
                                startAdornment:
                                    <InputAdornment position="start">
                                        <IconButton> <EmailIcon/></IconButton>
                                    </InputAdornment>
                            }}/>
                    </Box>
                {/* whatsapp number text box */}
                <Box sx={{ boxShadow: 2, height: '27px', p: 1, m: 1, borderRadius: '25px'}}>
                    <TextField placeholder="Whatsapp Number" 
                        value={regInfo.whatsapp_number}
                        fullWidth
                        variant="outlined" 
                        label=" "
                        onChange={(evt)=> handleChange(evt, "whatsapp_number")}
                        sx=
                        {{
                            marginTop: "-6px",
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            '& fieldset': { borderRadius: 33 }
                        }}
                        required
                        helperText= {(regInfo.whatsapp_number_status)?"Whatsapp number is incorrect.":""}
                        InputProps=
                        {{ 
                            sx: {height: 40}, 
                            startAdornment:
                                <InputAdornment position="start">
                                    <IconButton> <WhatsAppIcon/></IconButton>
                                </InputAdornment>
                        }}/>
                </Box>
                <>
                    <table className="signupform1_gender_table">
                        <tr>
                            <td>
                                <label>
                                    <input type="radio" name="gender" onChange={()=> handlegenderChange("Male")} />Mr
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input type="radio" name="gender"  onChange={()=> handlegenderChange("Female")} />Ms
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input type="radio" name="gender"  onChange={()=> handlegenderChange("Other")} />Other
                                </label>
                            </td>
                        </tr>
                    </table>
                    {
                        (regInfo.gender_status) &&
                        <div style={{color: "red", fontSize: "12px"}}>gender should be selected</div>
                    }
                </>
                <>
                    <table className="signform1_agree_table">
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" onChange={handleagreeChange} />I agree with Terms and Conditions
                                </label>
                            </td>
                        </tr>
                    </table>
                    {
                        (regInfo.is_active_status) &&
                            <div style={{color: "red", fontSize: "12px"}}>confirm terms and conditions</div>
                    }
                </>

                <div className="margin-field-Item">
                    <button onClick={handleClickEvent}
                            className="button_oval_style_signupfirst">submit</button>
                </div>
                {/* <div className="margin-field-Item">
                    <button onClick={handleclick}
                            className="button_oval_style_signupfirst">open</button>
                </div> */}
            </div>
            {
              <DisplayMessage displayState = {displaymsg} handleclose = {handlecloseDisplayMsg}/>
            }

        </div>
    )
}

export default SignUpFormFirst