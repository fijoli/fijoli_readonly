

import "./ProfileComponentSixth.css";
import {Box, checkboxClasses, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import uploadicon from "./../asset/uploadIcon.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import CustomLanguageSelection from "../customControls/CustomLanguageSelection";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentSixth = (props) =>{

    const [visibility, setvisibility]       = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedLang, setselectedLang]   = useState([]);
    const [uploadfiles, setuploadfiles]     = useState({
        "certificate": [undefined, undefined, undefined]
    });
    const [location,    setlocation]        = useState("");
    const [description, setdescription]     = useState("");

    const lstofsupportedCurrency            = useSelector((state)=> state.storeComponent.configData.currency);

    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    ///<summary>
    // set description 
    ///</summary>
    const handletxtChanged = (evt) =>{
        setdescription(evt.target.value);
    }

    const handlelocationChanged = (evt) =>{
        setlocation(evt.target.value);
    }
    const handleChange = (lstoflanguages) => {
        // const {
        //   target: { value },
        // } = event;
        // setselectedLang(
        //   // On autofill we get a stringified value.
        //   typeof value === 'string' ? value.split(',') : value,
        // );
        setselectedLang(lstoflanguages);
    };    

    const handleCurrencyChange = (event) => {
        setSelectedIndex(event.target.selectedIndex)
    }

    const handleCompleteClick = (evt) =>{
        
        const user_info = {
            "user_description"  : description,
            "languages_known"   : selectedLang.join(","),
            "location_address"  : location
        }

        props.handleCompleteClick(user_info, uploadfiles);
    }

    const handleOnSelect = (event) =>{
        setvisibility(!event.target.checked);
    }

    const handleuploadfile = (file, filetype, fileindex) =>{
        uploadfiles[filetype][fileindex] = file;
        setuploadfiles(uploadfiles);
    }

    const handleremovefile = (fileIndex, filetype) =>{
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    return(

        <div className="flex wrap flex-container">
            <div className="flex--12">
                <AboutMyselfComponent height={'90px'}
                    document_desc={description}
                    handletxtChanged={handletxtChanged}
                    placeholdertext="About Myself Not more than (500 characters)" />
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
                            <div className="flex flex-container padcell align-items-center grow wrap">
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
                            <div className="flex flex-container padcell align-items-center grow wrap">
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
                            <div className="flex flex-container padcell align-items-center grow wrap">
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
                            <div className="flex flex-container padcell align-items-center grow wrap">
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
                                <span className="pad padxb">At My Clinic</span>
                            </div>
                        </label>
                    </div>
                    <div className="flex grow align-items-center wrap">
                        <div className="flex--6 xs--12">
                            <label className="form-label"> Fees / Session</label>
                            <div className="flex flex-container padcell align-items-center grow wrap">
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
                            <div className="flex flex-container padcell align-items-center grow wrap">
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
                        </div>
                        <div className="flex--12">
                            <div className="text-center pad padtb">
                                <button onClick={handleCompleteClick} className="anchor-outline rounded ao-theme ao-fill-theme font-bold">
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
    
    )

}

export default ProfileComponentSixth;