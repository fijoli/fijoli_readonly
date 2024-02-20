
import { Box, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./ProfileComponentSecond.css";
import { useState } from "react";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";
import { SITECONF } from "../helper/siteconf";


const ProfileComponentSecond = (props) => {

    //member variables
    const [name, setname] = useState("");
    const [location, setlocation] = useState("");
    const [description, setdescription] = useState("");

    const [uploadfiles, setuploadfiles] = useState({
        "certificate": [undefined, undefined, undefined],
        "fitness_studio": [undefined, undefined, undefined]
    });

    //file upload types components default data
    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    //file upload types components default data
    const fitnessstudiodata = [
        { id: 3, text: 'fitness_studio' },
        { id: 4, text: 'fitness_studio' },
        { id: 5, text: 'fitness_studio' },
    ]

    ///<summary>
    // api which uploads files and user info 
    ///</summary.
    const handleCompleteClick = (evt) => {

        const userInfo = {
            "studio_name": name,
            "user_description": description,
            "location_address": location
        }

        props.handleCompleteClick(userInfo, uploadfiles);
    }


    ///<summary>
    // set description 
    ///</summary>
    const handletxtChanged = (evt) => {
        setdescription(evt.target.value);
    }

    ///<summary>
    // set description 
    ///</summary>
    const handlenametxtChanged = (evt) => {
        setname(evt.target.value);
    }

    const handleuploadfile = (file, filetype, fileindex) => {
        uploadfiles[filetype][fileindex] = file;
        setuploadfiles(uploadfiles);
    }

    const handleremovefile = (fileIndex, filetype) => {
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    const handlelocationchanged = (evt) => {
        setlocation(evt.target.value);
    }

    return (
        <div className="">
            <div className="flex wrap justify-center flex-container">
                <div className="flex--12">
                    <AboutMyselfComponent height={'90px'}
                        document_desc=""
                        handletxtChanged={handletxtChanged}
                        placeholdertext="About Myself Not more than (500 characters)" />
                </div>
            </div>
            <div className="flex wrap justify-center flex-container">
                <div className="flex--12">
                    <label className="form-label text-center">
                        My Gym / Fitness Studio Name
                    </label>
                    <TextField type="text" fullWidth style={{ textAlign: 'center' }} placeholder="type here" variant="outlined" sx={{
                        '& fieldset': { borderRadius: 33 },
                        // "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                    }} onChange={handlenametxtChanged} InputProps={{ sx: { height: SITECONF.INPUT_HEIGHT } }} />
                </div>
            </div>
            <div className="flex wrap justify-center flex-container">
                <div className="flex--12">
                    <label className="form-label text-center">
                        My Certification
                    </label>
                    <div className="flex flex-container wrap align-items-center justify-center">
                        {
                            certificatedata.map((item, index) => {
                                return (
                                    <div>
                                        <FileUploadComponent key={item.id} filetype={item.text} fileindex={index}
                                            uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="pad padt1 bg grey-skin"></div>
                </div>

                <div className="flex--12">
                    <label className="form-label text-center">
                        My Gym / Fitness studio
                    </label>
                    <div className="flex flex-container wrap align-items-center justify-center">
                        {
                            fitnessstudiodata.map((item, index) => {
                                return (
                                    <div>
                                        <FileUploadComponent key={item.id} filetype={item.text} fileindex={index}
                                            uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="pad padt1 bg grey-skin"></div>
                </div>

                <div className="flex--12">
                    <label className="form-label text-center">
                        My Gym / Fitness Studio Address
                    </label>
                    <TextField type="text"
                        fullWidth
                        placeholder="Enter Address"
                        variant="outlined"
                        sx={{
                            '& fieldset': { borderRadius: 33 },
                        }}
                        onChange={handlelocationchanged}
                        InputProps={{
                            sx: { height: SITECONF.INPUT_HEIGHT },
                            startAdornment: <InputAdornment position="start">
                                <IconButton>
                                    <LocationOnIcon />
                                </IconButton>
                            </InputAdornment>
                        }} />
                </div>

                <div className="flex--12 text-center">
                    <div className="pad padyd">
                        <button onClick={handleCompleteClick} className="anchor-outline rounded ao-fill-theme font-bold">
                            <span className="flex text-center grow">
                                <span><span className="pad padxd">Complete Profile</span></span>
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileComponentSecond;
