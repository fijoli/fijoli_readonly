

import "./ProfileComponentFourth.css";
import {Box, checkboxClasses, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentFourth = (props) =>{

    const [description, setdescription]     = useState("");
    const [selectedLang, setselectedLang]   = useState([]);
    const [validState, setvalidState]        = useState({"desc_status":false, "lang_status": false});

    const handletxtChanged = (evt) =>{
        setdescription(evt.target.value);
        setvalidState({...validState, desc_status: false});
    }

    const handleCompleteClick = () => {

        if(!IsValid()){
            const user_info = {
                "user_description"  : description,
                "languages_known"   : selectedLang.join(",")
            }

            // props.handleCompleteClick(user_info, {});
        }
    }

    const handleChange = (lstoflanguages) => {
        setselectedLang(lstoflanguages);
        setvalidState({...validState, lang_status: false});
    };    

    function IsValid(){
        let isStateValid = validState;
        if(description === ""){
            isStateValid.desc_status = true;
        }else if(selectedLang.join(",") === ""){
            isStateValid.lang_status = true;
        }

        setvalidState({...isStateValid});
        return (isStateValid.desc_status || isStateValid.lang_status);
    }

    return(
        <div className="signupformFinal-container-pcfourth"> 
            <table className="table_container-pcfourth">
                <tr>
                    <td>
                        <AboutMyselfComponent height={'270px'}
                            document_desc = {description}
                            handletxtChanged={handletxtChanged}
                            placeholdertext = "About Myself Not more than (500 characters)"/>
                            {
                                (validState.desc_status)&&
                                <div className="errmessage_aboutyourself">Please describe about yourself</div>
                            }
                    </td>
                </tr>
                <tr>
                    <td>
                        <CustomLanguageSelection handleChange={handleChange} />
                        {
                            (validState.lang_status)&&
                            <div className="errmessage_aboutyourself">Language is not selected</div>
                        }

                    </td>
                </tr>
            </table>       
            <>
                <button onClick={handleCompleteClick} 
                        className="button_oval_style_submit-pcfourth">Complete Profile</button>
            </>
        </div>
    )

}

export default ProfileComponentFourth;