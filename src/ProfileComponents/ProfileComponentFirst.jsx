import "./ProfileComponentFirst.css";
import * as React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentFirst = (props) => {

    //set default member variables
    //set visibility to display payment gateway controls 
    const [visibility, setvisibility] = useState(true);
    //holds the languages known data
    const [selectedLang, setselectedLang] = useState("");
    //holds files selected to upload
    const [uploadfiles, setuploadfiles] = useState({ "certificate": [undefined, undefined, undefined] });
    //holds the selected currency data
    const [selectedIndex, setSelectedIndex] = useState(0);
    //holds the description 
    const [description, setdescripton] = useState("")

    const [validState, setvalidState] = useState({ "desc_status": false, "cert_status": false, "lang_status": false });

    //holds list of supported currency types
    const lstofsupportedCurrency = useSelector((state) => state.storeComponent.configData.currency);

    //default data to generate no. of certificate controls
    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    //handle complete click event handler
    const handleCompleteClick = (evt) => {
        if (!IsValid()) {
            //emit the user info to parent control 
            const pcinfo = {
                "languages_known": (0 === selectedLang.length) ? "" : selectedLang.join(","),
                "user_description": description
            };
            //emit userinfo and selected images to parent control
            props.handleCompleteClick(pcinfo, uploadfiles);
        }
    }

    ///<summary>
    // set description 
    const handletxtChanged = (evt) => {
        //set description
        setdescripton(evt.target.value);
        setvalidState({ ...validState, "desc_status": false });
    }

    //sets visibility of payment gateway controls
    const handleOnSelect = (event) => {
        setvisibility(!event.target.checked);
    }

    //sets selected languages 
    const handleChange = (selectedlanguages) => {
        setselectedLang(selectedlanguages);
        setvalidState({ ...validState, "lang_status": false });
    };

    //sets selected currency 
    const handleCurrencyChange = (event) => {
        setSelectedIndex(event.target.selectedIndex)
    }

    //holds the selected file based on category
    const handleuploadfile = (fileinfo, filetype, fileindex) => {
        uploadfiles[filetype][fileindex] = fileinfo;
        setuploadfiles(uploadfiles);
        setvalidState({ ...validState, "cert_status": false });
    }

    //deletes the file based on category
    //fileindex - index value in array location
    //filetype  - category type
    const handleremovefile = (fileIndex, filetype) => {
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    function IsValid() {
        let isStateValid = validState;
        if (description === "") {
            isStateValid.desc_status = true;
        } else if (uploadfiles.certificate.filter(item => item !== undefined).length === 0) {
            isStateValid.cert_status = true;
        } else if (selectedLang === "") {
            isStateValid.lang_status = true;
        }

        setvalidState({ ...isStateValid });

        return (isStateValid.desc_status || isStateValid.cert_status || isStateValid.lang_status);
    }

    return (
        <div className="flex wrap flex-container">
            <div className="flex--12">
                <AboutMyselfComponent height={'90px'}
                    document_desc={description}
                    handletxtChanged={handletxtChanged}
                    placeholdertext="About Myself Not more than (500 characters)" />
                {
                    (validState.desc_status) &&
                    <div>Please describe about yourself</div>
                }
            </div>
            <div className="flex--12">
                <h5 className="lead h6 text-center color color-theme nomargi pad padbc">My Certification</h5>
                <div className="flex flex-container justify-center align-items-center">
                    {
                        certificatedata.map((item, index) => {
                            return (
                                <div key={index}>
                                    <FileUploadComponent key={item.id} filetype={item.text}
                                        fileindex={index} dlgTitle="Upload Certificate and Description"
                                        uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="pad padt1 bg bg grey-skin"></div>
                {
                    (validState.cert_status) &&
                    <div>
                        <p className="lead h7 color color-theme">please upload atleast 1 certification for your profile credibility</p>
                    </div>
                }
                <label className="block pad padc">
                    <div className="flex align-items-center justify-between">
                        <div>
                            Currently Not Training
                        </div>
                        <div className="icon-sized-xs bg grey-skin radius text-center">
                            <input type="checkbox" onChange={handleOnSelect} />
                        </div>
                    </div>
                </label>
                <div className="pad padt1 bg bg grey-skin"></div>
                <div className={visibility ? "" : "nodisplay"} >
                    <div className="marg margtc bg grey-skin rounded">
                        <label className="flex align-items-center wrap"> 
                            <div className="icon-sized-xs">
                                <input type="checkbox" className="" />
                            </div>
                            <div className="">
                                <span className="pad padxb">Fees / Month</span>
                            </div>
                        </label>
                    </div>
                    <div className="flex grow align-items-center wrap">
                        <div className="flex--6 xs--12">
                            <label className="form-label"> Fees / Session</label>
                            <div className="flex flex-container padcell align-items-center wrap">
                                <div className="flex--6 xs--12">
                                    <input name="myt1" type="text" placeholder="Numbers only" className="form-control" />
                                </div>
                                <div className="flex--6 xs--12">
                                    <select className="form-control" value={selectedIndex} onChange={handleCurrencyChange}>
                                        {(lstofsupportedCurrency || []).map((item, indx) => {
                                            return <option key={indx} value={indx}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex--6 xs--12">
                            <label className="form-label"> Fees / Month</label>
                            <div className="flex flex-container padcell align-items-center wrap">
                                <div className="flex--6 xs--12">
                                    <input name="myt2" type="text" placeholder="Numbers only" className="form-control" />
                                </div>
                                <div className="flex--6 xs--12">
                                    <select value={selectedIndex} onChange={handleCurrencyChange}
                                        className='form-control'>
                                        {(lstofsupportedCurrency || []).map((item, indx) => {
                                            return <option key={indx} value={indx}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="marg margtc bg grey-skin rounded">
                        <label className="flex align-items-center wrap"> 
                            <div className="icon-sized-xs">
                                <input type="checkbox" className="" />
                            </div>
                            <div className="">
                                <span className="pad padxb">Training at client place</span>
                            </div>
                        </label>
                    </div>
                    <div className="flex grow align-items-center wrap">
                        <div className="flex--6 xs--12">
                            <label className="form-label"> Fees / Session</label>
                            <div className="flex flex-container padcell align-items-center wrap">
                                <div className="flex--6 xs--12">
                                    <input name="myt1" type="text" placeholder="Numbers only" className="form-control" />
                                </div>
                                <div className="flex--6 xs--12">
                                    <select className="form-control" value={selectedIndex} onChange={handleCurrencyChange}>
                                        {(lstofsupportedCurrency || []).map((item, indx) => {
                                            return <option key={indx} value={indx}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex--6 xs--12">
                            <label className="form-label"> Fees / Month</label>
                            <div className="flex flex-container padcell align-items-center wrap">
                                <div className="flex--6 xs--12">
                                    <input name="myt2" type="text" placeholder="Numbers only" className="form-control" />
                                </div>
                                <div className="flex--6 xs--12">
                                    <select value={selectedIndex} onChange={handleCurrencyChange}
                                        className='form-control'>
                                        {(lstofsupportedCurrency || []).map((item, indx) => {
                                            return <option key={indx} value={indx}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="marg margtc bg grey-skin rounded">
                        <label className="flex align-items-center wrap"> 
                            <div className="icon-sized-xs">
                                <input type="checkbox" className="" />
                            </div>
                            <div className="">
                                <span className="pad padxb">Training at client place</span>
                            </div>
                        </label>
                    </div>
                    <div className="flex grow align-items-center wrap">
                        <div className="flex--6 xs--12">
                            <label className="form-label"> Fees / Session</label>
                            <div className="flex flex-container padcell align-items-center wrap">
                                <div className="flex--6 xs--12">
                                    <input name="myt1" type="text" placeholder="Numbers only" className="form-control" />
                                </div>
                                <div className="flex--6 xs--12">
                                    <select className="form-control" value={selectedIndex} onChange={handleCurrencyChange}>
                                        {(lstofsupportedCurrency || []).map((item, indx) => {
                                            return <option key={indx} value={indx}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex--6 xs--12">
                            <label className="form-label"> Fees / Month</label>
                            <div className="flex flex-container padcell align-items-center wrap">
                                <div className="flex--6 xs--12">
                                    <input name="myt2" type="text" placeholder="Numbers only" className="form-control" />
                                </div>
                                <div className="flex--6 xs--12">
                                    <select value={selectedIndex} onChange={handleCurrencyChange}
                                        className='form-control'>
                                        {(lstofsupportedCurrency || []).map((item, indx) => {
                                            return <option key={indx} value={indx}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex wrap">
                        <div className="flex--12">
                            <CustomLanguageSelection handleChange={handleChange} />
                            {
                                (validState.lang_status) &&
                                <>Language is not selected</>
                            }
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
        </div>
    );
}

export default ProfileComponentFirst;