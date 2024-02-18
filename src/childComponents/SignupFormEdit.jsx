

import { Backdrop, CircularProgress, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProfilePicComponent from '../customControls/ProfilePicComponent';
import ProfileComponentFirst from '../ProfileComponents/ProfileComponentFirst';
import ProfileComponentFourth from '../ProfileComponents/ProfileComponentFourth';
import ProfileComponentFifth from '../ProfileComponents/ProfileComponentfifth';
import ProfileComponentSecond from '../ProfileComponents/ProfileComponentSecond';
import ProfileComponentSixth from '../ProfileComponents/ProfileComponentSixth';
import ProfileComponentThird from '../ProfileComponents/ProfileComponentThird';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import fitness_trainer      from "./../asset/trainer.jpg";
import "./SignupFormEdit.css";
import PostRegisterController from '../viewModels/PostRegisterController';
import { useNavigate } from 'react-router-dom';

const SignupFormEdit = () =>{

    const dispatch                      = useDispatch();
    const navigate                      = useNavigate();
    const [imgsrc, setimgsrc]           = useState(null);
    const [profilepic, setprofilepic]   = useState(null);
    const [validState, setvalidState]   = useState({"pic_status": false, "location_status": false, "category_status": false});
    const [trainerType, settrainerType] = useState("");
    const [showbackdrop, setShowbackdrop] = useState(false);
    const [lstoftrainers, setlstoftrainers] = useState([]) ;
    const [selectedUserInfo, setselectedUserInfo] = useState({"category":"","location":""});

    const userInfo      = useSelector((state)=> state.storeComponent.configData.profileData);
    const regConfigInfo = useSelector((state)=>state.storeComponent.configData);
    const confirmRegState       = useSelector((state)=> state.storeComponent.loginState);

    useEffect(()=>{
        let picinfo = process.env.REACT_APP_S3_URL + userInfo["whatsapp_number"]+  "/profilepic/"+ userInfo["whatsapp_number"]+ "_" + "profilepic_";
        setprofilepic(picinfo);
        setimgsrc(fitness_trainer);
        setlstoftrainers(regConfigInfo.user_category);
    },[]);

    useEffect(()=>{
        if(confirmRegState){
            if(200 === confirmRegState.status){
                dispatch({type:"reset_status"})
                dispatch({type:"clear_credentials"});
                navigate("/homepage");
            }else if(400 === confirmRegState.status){
                dispatch({type:"reset_status"})
                navigate("/error")
            }
            setShowbackdrop(false);
        }
    },[confirmRegState]);

    const handleProfilePicChange = (picInfo) =>{
        setprofilepic(picInfo);
        setvalidState({"pic_status": false});
    }

    const handleCompleteClick = (pcinfo, imagedata) =>{
        if(!IsValid()){
            setShowbackdrop(true);
            const userinfokeys = Object.keys(pcinfo);
            for (let index = 0; index < userinfokeys.length; index++) {
                userInfo[userinfokeys[index]] = pcinfo[userinfokeys[index]];
            }
            
            userInfo["user_category"] = selectedUserInfo.category;
            userInfo["location"]      = selectedUserInfo.location;
            const postAsyncCtrl = new PostRegisterController();
            const registrationData = postAsyncCtrl.getconfirmregisterData(userInfo, imagedata,  (typeof(profilepic) === 'string')?null:profilepic);
            dispatch({"type": "set_confirmregistrationinfo", registrationData});
        }
    }

    const handleChangeName = (evt, selecteditem) => {
        setselectedUserInfo({...selectedUserInfo, [selecteditem]: evt.target.value});
    }

    const handleSelect = (evt) =>{
        setselectedUserInfo({...selectedUserInfo, "category": evt.target.value});
        settrainerType(lstoftrainers[evt.target.value - 1]);
    }

    function IsValid(){
        let isvalidstate = validState;
        if(profilepic === null){
            isvalidstate.pic_status = true;
        }else if(selectedUserInfo.category === ""){
            isvalidstate.category_status = true;
        }else if(selectedUserInfo.dob === ""){
            isvalidstate.dob_status = true;
        }
        console.log(isvalidstate.pic_status);
        setselectedUserInfo({...isvalidstate});
        return isvalidstate.pic_status || isvalidstate.category_status || isvalidstate.dob_status;
    }

    return(
        <div className="signupformFinal-container">
            <div className="image_main_final_div" >  
                <img src={imgsrc}/>
            </div>
            <div className="profile">
                <ProfilePicComponent profilepic={profilepic}
                        handleProfilePicChange={handleProfilePicChange} isdelete = {true}/> 
            </div>
            {
                (validState.pic_status)&&
                <>
                    <div className="errmessage_validState">Please upload Profile pic</div>
                </>
            }

            <div className="text-align-items_edit">
                <Select displayEmpty value={selectedUserInfo.category}
                    onChange={handleSelect} 
                    style={{height: "30px", borderRadius: "15px", width: "300px", alignItems: "center", justifyContent: "center"}}>
                    <MenuItem value="" disabled>Who am I</MenuItem>
                    {
                        lstoftrainers.map((item, idx)=>{
                            return <MenuItem value={idx+1}>{item}</MenuItem>
                        })
                    }
                </Select>
            </div>

            <div className="text-align-items_dob">
            <TextField type="text" 
                    // fullWidth
                    value={selectedUserInfo.location}
                    helperText = {(validState.location_status)?"Please select the location":""}
                    placeholder="location" 
                    variant="outlined" onChange={(evt)=> handleChangeName(evt, "location")}
                    sx={{
                        '& fieldset': { borderRadius: 33 }
                        }}
                    InputProps={{
                        sx: { height: 32, width: 300 },
                        startAdornment:<InputAdornment position="start">
                            <IconButton>
                                <LocationOnIcon/>
                            </IconButton>
                        </InputAdornment>,
                    }}/>

            </div>
            <>
                    {
                        (userInfo) && (()=>{
                            if((trainerType === "Fitness Trainer")      ||
                               (trainerType === "Martial Arts Expert")  ||
                               (trainerType === "Dance Teacher")        ||
                               (trainerType === "Yoga Instructor")){
                                return(<ProfileComponentFirst handleCompleteClick={handleCompleteClick} />)
                            }else if(trainerType === "Fitness Studio / Gym Owner"){
                                return(<ProfileComponentSecond handleCompleteClick={handleCompleteClick} />)
                            }else if(trainerType === "Fitness Product Seller"){
                                return(<ProfileComponentThird handleCompleteClick={handleCompleteClick} />)
                            }else if((trainerType === "Phychiatrist/Psychologist") ||
                                    (trainerType === "Dietician / Nutritionist")  ||
                                    (trainerType === "Sports Person/ Athlete / SportCoach")){
                                return(<ProfileComponentFifth handleCompleteClick={handleCompleteClick} />)
                            }else if(trainerType === "Physiotherapist"){
                                return(<ProfileComponentSixth handleCompleteClick={handleCompleteClick} />)
                            }else if(trainerType === "Just want to be fit"){
                                return(<ProfileComponentFourth handleCompleteClick={handleCompleteClick} />)
                            }
                        })()
                    }
                </>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showbackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    );
}

export default SignupFormEdit
