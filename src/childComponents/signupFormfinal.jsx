
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import "./SignupformFinal.css";

import fitness_trainer from "./../asset/trainer.jpg";
import martialarts from "./../asset/martialarts.jpg";
import dancer from "./../asset/dancer.jpg";
import yoga from "./../asset/yoga.jpg";
import nutritionist from "./../asset/nutritionist.jpg";
import gymowner from "./../asset/gymowner.jpg";
import seller from "./../asset/seller.jpg";
import justfit from "./../asset/justfit.jpg";
// import nutritionist from "./../asset/nutritionist.jpg";
import psychologist from "./../asset/psychologist.jpg";
import athlete from "./../asset/athlete.jpg";
import physio from "./../asset/physio.jpg";

import ProfileComponentFirst from "../ProfileComponents/ProfileComponentFirst";
import ProfileComponentSecond from "../ProfileComponents/ProfileComponentSecond";
import ProfileComponentThird from "../ProfileComponents/ProfileComponentThird";
import ProfileComponentFourth from "../ProfileComponents/ProfileComponentFourth";
import ProfileComponentfifth from "../ProfileComponents/ProfileComponentfifth";
import ProfileComponentSixth from "../ProfileComponents/ProfileComponentSixth";
import ProfilePicComponent from "../customControls/ProfilePicComponent";

import PostRegisterController from "../viewModels/PostRegisterController";


const SignUpFormFinal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imgsrc, setimgsrc] = useState(null);
    const [profilepic, setprofilepic] = useState(null);
    const [showbackdrop, setShowbackdrop] = useState(false);

    const userInfo = useSelector((state) => state.storeComponent.configData.profileData);
    const lstoftrainingtypes = useSelector((state) => state.storeComponent.configData.user_category);
    const confirmRegState = useSelector((state) => state.storeComponent.loginState);

    useEffect(() => {
        if (confirmRegState) {
            if (200 === confirmRegState.status) {
                dispatch({ type: "reset_status" })
                navigate("/homepage");
            } else if (400 === confirmRegState.status) {
                dispatch({ type: "reset_status" })
                navigate("/error")
            }
            setShowbackdrop(false);
        }
    }, [confirmRegState]);

    var trainerType = "";
    if (userInfo) {
        trainerType = lstoftrainingtypes[userInfo.user_category - 1];
    }

    useEffect(() => {
        if (trainerType === "Fitness Trainer") {
            setimgsrc(fitness_trainer);
        } else if (trainerType === "Martial Arts Expert") {
            setimgsrc(martialarts);
        } else if (trainerType === "Dance Teacher") {
            setimgsrc(dancer);
        } else if (trainerType === "Yoga Instructor") {
            setimgsrc(yoga);
        } else if (trainerType === "Dietician / Nutritionist") {
            setimgsrc(nutritionist);
        } else if (trainerType === "Fitness Studio / Gym Owner") {
            setimgsrc(gymowner);
        } else if (trainerType === "Just want to be fit") {
            setimgsrc(justfit);
        } else if (trainerType === "Fitness Product Seller") {
            setimgsrc(seller);
        } else if (trainerType === "Sports Person/ Athlete / SportCoach") {
            setimgsrc(athlete);
        } else if (trainerType === "Phychiatrist/Psychologist") {
            setimgsrc(psychologist);
        } else if (trainerType === "Physiotherapist") {
            setimgsrc(physio);
        } else {
            setimgsrc(justfit);
        }
    }, [trainerType])


    const handleProfilePicChange = (picInfo) => {
        setprofilepic(picInfo);
    }

    const handleCompleteClick = (pcinfo, imagedata) => {

        setShowbackdrop(true);
        const userinfokeys = Object.keys(pcinfo);
        for (let index = 0; index < userinfokeys.length; index++) {
            userInfo[userinfokeys[index]] = pcinfo[userinfokeys[index]];
        }

        const postAsyncCtrl = new PostRegisterController();
        const registrationData = postAsyncCtrl.getconfirmregisterData(userInfo, imagedata, profilepic);
        dispatch({ "type": "set_confirmregistrationinfo", registrationData });
    }

    return (
        <>
            <div className="flex padoff align-items-stretch justify-center wrap hinherit ypad-off slide-container">
                <div className="desk-col slide-picture  relative transition">
                    <div className="abs trbl slide-change slide-b-radius oh bg grey-skin transition">
                        <div className={["abs trbl slide-item transition ease slide-img-on"].join(" ")}>
                            <span className="abs trbl bg-cover bg-center" style={{ "backgroundImage": "url(" + imgsrc + ")" }}></span>
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
                    <div className="flex justify-center pad-">
                        <div className="profile-icon-box bg lightgrey circle">
                            <ProfilePicComponent handleProfilePicChange={handleProfilePicChange} />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-center relative wrap">
                            <div className="flex--10 sm--12">
                                <div className="pad padbc">
                                    {
                                        (userInfo) && (
                                            <TextField type="text"
                                                value={userInfo.user_name}
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    // marginTop: 7,
                                                    // "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                                    '& fieldset': { borderRadius: 33 },
                                                }}
                                                InputProps={{ sx: { height: 50, "& input": { textAlign: "center" } } }} />
                                        )
                                    }
                                </div>
                                <TextField type="text"
                                    variant="outlined"
                                    disabled
                                    value={trainerType}
                                    fullWidth
                                    sx={{
                                        '& fieldset': { borderRadius: 33 },
                                    }}
                                    placeholder="Trainer Type"
                                    InputProps={{ sx: { height: 50, "& input": { textAlign: "center" } } }} />
                                <>
                                    {
                                        (userInfo) && (() => {
                                            if ((trainerType === "Fitness Trainer") ||
                                                (trainerType === "Martial Arts Expert") ||
                                                (trainerType === "Dance Teacher") ||
                                                (trainerType === "Yoga Instructor")) {
                                                return (<ProfileComponentFirst handleCompleteClick={handleCompleteClick} />)
                                            } else if (trainerType === "Fitness Studio / Gym Owner") {
                                                return (<ProfileComponentSecond handleCompleteClick={handleCompleteClick} />)
                                            } else if (trainerType === "Fitness Product Seller") {
                                                return (<ProfileComponentThird handleCompleteClick={handleCompleteClick} />)
                                            } else if ((trainerType === "Phychiatrist/Psychologist") ||
                                                (trainerType === "Dietician / Nutritionist") ||
                                                (trainerType === "Sports Person/ Athlete / SportCoach")) {
                                                return (<ProfileComponentfifth handleCompleteClick={handleCompleteClick} />)
                                            } else if (trainerType === "Physiotherapist") {
                                                return (<ProfileComponentSixth handleCompleteClick={handleCompleteClick} />)
                                            } else if (trainerType === "Just want to be fit") {
                                                return (<ProfileComponentFourth handleCompleteClick={handleCompleteClick} />)
                                            }
                                        })()
                                    }
                                </>

                                <div className="">
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={showbackdrop}>
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpFormFinal;