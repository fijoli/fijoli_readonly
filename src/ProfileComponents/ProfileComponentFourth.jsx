import * as React from 'react';
import { useState } from "react";

import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentFourth = (props) => {

    const [description, setdescription] = useState("");
    const [selectedLang, setselectedLang] = useState([]);

    const handletxtChanged = (evt) => {
        setdescription(evt.target.value);
    }

    const handleCompleteClick = () => {

        const user_info = {
            "user_description": description,
            "languages_known": selectedLang.join(",")
        }

        props.handleCompleteClick(user_info, {});
    }

    const handleChange = (lstoflanguages) => {
        setselectedLang(lstoflanguages);
    };

    return (
        <div className="flex wrap flex-container">
            <div className="flex--12">
                <AboutMyselfComponent height={'90px'}
                    document_desc={description}
                    handletxtChanged={handletxtChanged}
                    placeholdertext="About Myself Not more than (500 characters)" />
            </div>
            <div className="flex--12">
                <div className="flex wrap">
                    <div className="flex--12">
                        <CustomLanguageSelection handleChange={handleChange} />
                    </div>
                    <div className="flex--12">
                        <div className="text-center pad padtb">
                            <button onClick={handleCompleteClick} className="anchor-outline rounded ao-fill-theme font-bold">
                                <span className="flex text-center grow">
                                    <span><span className="pad padxd">Complete Profile</span></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProfileComponentFourth;