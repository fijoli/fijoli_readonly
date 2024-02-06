
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Backdrop, CircularProgress, TextField } from "@mui/material";
import "./SignupformFinal.css";

import fitness_trainer      from "./../asset/trainer.jpg";
import martialarts  from "./../asset/martialarts.jpg";
import dancer       from "./../asset/dancer.jpg";
import yoga         from "./../asset/yoga.jpg";
import nutritionist from "./../asset/nutritionist.jpg";
import gymowner     from "./../asset/gymowner.jpg";
import seller       from "./../asset/seller.jpg";
import justfit      from "./../asset/justfit.jpg";
// import nutritionist from "./../asset/nutritionist.jpg";
import psychologist from "./../asset/psychologist.jpg";
import athlete      from "./../asset/athlete.jpg";
import physio       from "./../asset/physio.jpg";

import ProfileComponentFirst from "../ProfileComponents/ProfileComponentFirst";
import ProfileComponentSecond from "../ProfileComponents/ProfileComponentSecond";
import ProfileComponentThird from "../ProfileComponents/ProfileComponentThird";
import ProfileComponentFourth from "../ProfileComponents/ProfileComponentFourth";
import ProfileComponentfifth from "../ProfileComponents/ProfileComponentfifth";
import ProfileComponentSixth from "../ProfileComponents/ProfileComponentSixth";
import ProfilePicComponent from "../customControls/ProfilePicComponent";

import PostRegisterController from "../viewModels/PostRegisterController";


const SignUpFormFinal = () =>{
    
    const navigate                      = useNavigate();
    const dispatch                      = useDispatch();
    const [imgsrc, setimgsrc]           = useState(null);
    const [profilepic, setprofilepic]   = useState(null);
    const [showbackdrop, setShowbackdrop] = useState(false);
    const [validState, setvalidState]     = useState({"pic_status": false});

    const userInfo              = useSelector((state)=> state.storeComponent.configData.profileData);
    const lstoftrainingtypes    = useSelector((state)=> state.storeComponent.configData.user_category);
    const confirmRegState       = useSelector((state)=> state.storeComponent.loginState);

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

    var trainerType             = "";
    if(userInfo){
        trainerType = lstoftrainingtypes[userInfo.user_category-1];
    }

    useEffect(()=>{
        if(trainerType === "Fitness Trainer"){
            setimgsrc(fitness_trainer);
        }else if(trainerType === "Martial Arts Expert"){
            setimgsrc(martialarts);
        }else if(trainerType === "Dance Teacher"){
            setimgsrc(dancer);
        }else if(trainerType === "Yoga Instructor"){
            setimgsrc(yoga);
        }else if(trainerType === "Dietician / Nutritionist"){
            setimgsrc(nutritionist);
        }else if(trainerType === "Fitness Studio / Gym Owner"){
            setimgsrc(gymowner);
        }else if(trainerType === "Just want to be fit"){
            setimgsrc(justfit);
        }else if(trainerType === "Fitness Product Seller"){
            setimgsrc(seller);
        }else if(trainerType === "Sports Person/ Athlete / SportCoach"){
            setimgsrc(athlete);
        }else if(trainerType === "Phychiatrist/Psychologist"){
            setimgsrc(psychologist);
        }else if(trainerType === "Physiotherapist"){
            setimgsrc(physio);
        }else{
            setimgsrc(justfit);
        }
    },[trainerType])


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
    
            const postAsyncCtrl = new PostRegisterController();
            const registrationData = postAsyncCtrl.getconfirmregisterData(userInfo, imagedata, profilepic);
            dispatch({"type": "set_confirmregistrationinfo", registrationData});
        }
    }

    const handlebackhandler = () =>{
        const navigatelink  =  "/signupform2?whatsapp_number=" + userInfo.whatsapp_number;
        navigate(navigatelink)
    }

    function IsValid(){
        let isvalidstate = validState;
        if(profilepic === null){
            isvalidstate.pic_status = true;
            setvalidState({...isvalidstate});
        }
        return isvalidstate.pic_status;
    }
    
    return(
        <div className="signupformFinal-container">
            <div className="image_main_final_div" >  
                <img src={imgsrc}/>
            </div>
            <Avatar src="/images/back.jpeg"
                    onClick = {(e) => handlebackhandler()}
                    style={{marginTop: "10px", marginLeft:"25px", border: "1px solid black"}}
                    sx={{ width: 32, height: 32}}/>
            <div className="profile">
                <ProfilePicComponent 
                        handleProfilePicChange={handleProfilePicChange} isdelete = {true}/> 
            </div>
            {
                (validState.pic_status)&&
                <>
                    <div className="errmessage_validState">Please upload Profile pic</div>
                </>
            }
            {(undefined !== userInfo) && 
            <>
                <TextField type="text" 
                    value={userInfo.user_name}
                    variant="outlined" 
                    fullWidth
                    sx={{
                            marginTop: 7,
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            // '& fieldset': { borderRadius: 33 },
                    }}
                    InputProps={{ sx: { height: 15, "& input": {   textAlign: "center"  }  } }}/>
            </>
            }
            
            <TextField type="text" 
                    variant="outlined" 
                    disabled
                    value={trainerType}
                    fullWidth
                    sx={{
                            marginTop: 1,
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            // '& fieldset': { borderRadius: 33 },
                    }}
                    InputProps={{ sx: { height: 15,  "& input": {   textAlign: "center"  } } }}/>
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
                                return(<ProfileComponentfifth handleCompleteClick={handleCompleteClick} />)
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

export default SignUpFormFinal;