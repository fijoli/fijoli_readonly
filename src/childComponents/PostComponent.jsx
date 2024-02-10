import React, { useState, useEffect } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Button from "@mui/material/Button";
import { Backdrop, ButtonGroup, CircularProgress, IconButton, TextField } from '@mui/material';
import "./PostComponent.css"
import { useDispatch, useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';
import PostAsyncController from '../viewModels/PostAsyncController';
import ConfirmationDialog from '../DialogComponents/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';
import postactionItem from '../actions/postactionItem';
import img1 from "./../asset/img1.jpg";
import ProfilepicSelectionComponent from '../profilepiccontrols/ProfilepicSelectionComponent';
import resetStatus from '../actions/resetStatus';

import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import FileDownloadOffOutlinedIcon from '@mui/icons-material/FileDownloadOffOutlined';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayDisabledIcon from '@mui/icons-material/PlayDisabled';
import { upload } from '@testing-library/user-event/dist/upload';
import updatepostAction from '../actions/updatepostAction';
import clearpreviouspoststateAction from './Actions/clearpreviouspoststateAction';

//component which posts a new entry 
//about the trainer types based on choosed trainer type
const PostComponent = () => {

    //set default values
    const dispatch = useDispatch();
    // const navigate             = useNavigate();

    //object creates postitem structure to post
    const postAsyncCtrl = new PostAsyncController();

    //holds index value to launch the type of the post component
    const [selectedIndex, setSelectedIndex] = useState(0);

    //structure which holds the uploaded files info
    const [uploadedfiles, setuploadedfiles] = useState({
        "post_pic": [undefined, undefined],
        "post_video": [undefined]
    });

    //holds new/posted info
    const postinfo = useSelector((state) => state.storeComponent.postinfo);
    //confirmation dialog structure to display messages
    const [confirmDlgInfo, setconfirmDlgInfo] = useState(postAsyncCtrl.getConfirmationObject(postinfo.post_category));
    const [picinfo, setpicinfo] = useState(postAsyncCtrl.getProfilePicSelectionState());
    const [selPicInfo, setSelPicInfo] = useState(postAsyncCtrl.getProfilePicInfo(postinfo.post_category));

    //objects for holding profile data/supported currency/postinfo and status
    // const userProfile               = useSelector((state) => state.storeComponent.configData.profileData)
    const lstofsupportedCurrency = useSelector((state) => state.storeComponent.configData.currency);

    // const postStatus                = useSelector((state) => state.storeComponent.postinfoStatus);

    //holds the posted info
    const postedpost = useSelector((state) => state.storeComponent.postcomment);
    const [desc, setdesc] = useState("");
    const [showbackdrop, setShowbackdrop] = useState(false);
    // Adjust the size as needed
    const iconStyle = { fontSize: '45px' };
    const [validState, setvalidState] = useState({ "desc_status": false, "file_uploaded": false });
    //initializes posted info 
    useEffect(() => {

        if (postedpost) {

            Object.keys(postinfo).forEach(item => {
                postinfo[item] = postedpost[item];
            });

            if (0 !== postedpost["post_pic_1_path"].trim.length) {
                // uploadedfiles["post_pic"][0] = URL.createObjectURL(img1);
                picinfo.profilepic1loaded = true;
            }
            if (0 !== postedpost["post_pic_2_path"].trim.length) {
                // uploadedfiles["post_pic"][1] = img1;
                picinfo.profilepic2loaded = true;
            }
            if (0 !== postedpost["post_video_1_path"].trim.length) {
                // uploadedfiles["post_video"][0] = img1;
                picinfo.profilevideoloaded = true;
            }
            setuploadedfiles({ ...uploadedfiles });
            setpicinfo({ ...picinfo });
            setdesc(postedpost["post_desc"]);
        }
    }, [postedpost]);

    //clears unwanted data in store once the component get unmount
    useEffect(() => {
        return (() => {
            setShowbackdrop(false);
            dispatch(clearpreviouspoststateAction());
        });
    }, []);

    //hook which invokes when a new post is posted into server
    //if successfully posted navigates to home page
    //else error page
    // useEffect(()=>{
    //     if((undefined != postStatus) && (200 === postStatus.status)){
    //         // dispatch({"type":"reset_status"});
    //         dispatch(navigateItem(EnumNavigate.postContainer));
    //     }else if((undefined != postStatus) && (200 !== postStatus.status)){
    //         // dispatch({"type":"reset_status"});
    //         navigate("/error");
    //     }
    // },[postStatus])


    const handleevent = (selectedfile) => {

        switch (selPicInfo.name) {
            case "1":
                uploadedfiles["post_pic"][0] = selectedfile;
                picinfo.profilepic1loaded = (selectedfile) ? true : false;
                break;
            case "2":
                uploadedfiles["post_pic"][1] = selectedfile;
                picinfo.profilepic2loaded = (selectedfile) ? true : false;
                break;
            case "3":
                uploadedfiles["post_video"][0] = selectedfile;
                picinfo.profilevideoloaded = (selectedfile) ? true : false;
                break;
        }

        setuploadedfiles({ ...uploadedfiles });
        setpicinfo({ ...picinfo });
        setSelPicInfo({ ...postAsyncCtrl.getProfilePicInfo(postinfo.post_category) });
    }

    //event posts the configured post item to server
    const handlepostInfo = (evt) => {

        //initialize post item structure
        postinfo["id"] = (postedpost) ? postedpost["id"] : "";
        postinfo["currency_category"] = lstofsupportedCurrency[selectedIndex];
        const postformData = postAsyncCtrl.getpostItem(postinfo,
            uploadedfiles);

        // setShowbackdrop(true);
        //sends teh post item structure to server
        //dispatch({"type": "set_postinfodata", postformData});
        if (postedpost) {
            dispatch(updatepostAction(postformData));
        } else {
            dispatch(postactionItem(postformData));
        }
    }

    //event handler initializes the confirmation message box data
    const handlConfirmationDlg = (state) => {
        if (!IsValid()) {
            confirmDlgInfo["showConfirmationDlg"] = state;
            setconfirmDlgInfo({ ...confirmDlgInfo });
        }
    }

    //event handler launches windows open file explorer dialog
    const handleuploadevent = (evt, fileid) => {
        evt.preventDefault();
        // document.getElementById(fileid).click();
        selPicInfo.name = fileid;
        selPicInfo.opendialog = true;
        selPicInfo.profilepicInfo = null;
        selPicInfo.filetypes = (fileid === '3') ? ".mov" : ".jpg, .png, .jpeg, .gif, .bmp";
        setSelPicInfo({ ...selPicInfo });
    }

    //event handler holds the selected currency index
    const handleCurrencyChange = (event) => {
        setSelectedIndex(event.target.selectedIndex);
    }

    //handle description in post info
    const handletxtChanged = (evt) => {
        postinfo["post_desc"] = evt.target.value;
        setdesc(evt.target.value);
        setvalidState({ ...validState, "desc_status": false });
    }

    //event handler which invokes based on the confirmaton state
    const handleConfirmationDialogClick = (confirmationState) => {
        //if user confirmed to post 
        //posts item else navigate to home page
        if (confirmationState) {
            setShowbackdrop(true);
            setTimeout(() => {
                handlepostInfo();
            }, 1000);
        }
        // else{
        //     dispatch(resetStatus());
        //     dispatch(navigateItem(EnumNavigate.homepageState));
        // }

        //reset confirmation state
        handlConfirmationDlg(false);
    }

    ///<summary>
    // sets currency value 
    ///</summary>
    const handleCurrencyValueChanged = (evt) => {
        postinfo["currency"] = evt.target.value;
    }

    const handleCancelUpload = (evt, fileid) => {
        evt.preventDefault();
        // document.getElementById(fileid).click();
        selPicInfo.name = fileid;
        selPicInfo.opendialog = true;
        selPicInfo.removePicState = false;
        switch (fileid) {
            case "1":
            case "2":
                selPicInfo.profilepicInfo = uploadedfiles["post_pic"][fileid - 1];
                break;
            case "3":
                selPicInfo.profilepicInfo = uploadedfiles["post_video"][0];
                break;
        }
        setSelPicInfo({ ...selPicInfo });
    }

    function IsValid() {
        let validStatus = validState;
        if (desc === "") {
            validStatus.desc_status = true;
        } else if ((uploadedfiles['post_pic'].filter(item => item !== undefined).length === 0) &&
            (uploadedfiles['post_video'].filter(item => item !== undefined).length === 0)) {
            validState.file_uploaded = true;
        }
        setvalidState({ ...validStatus });

        return (validStatus.desc_status || validStatus.file_uploaded);
    }

    return (
        <div className='postcomponent_main_container'>
            <div style={{
                width: "auto",
                height: "auto",
                border: "1px solid #000", color: "red",
                borderRadius: "10px", position: "relative"
            }}>

                <div style={{
                    width: "auto",
                    height: "125px",
                    border: "1px solid #000", color: "red",
                    borderRadius: "10px"
                }}>

                    <TextField
                        style={{ textAlign: 'left' }}
                        placeholder="              share your receipe in not more than 500 characters"
                        fullWidth
                        multiline
                        helperText={(validState.desc_status) ? "please write something about your " + `${postinfo.post_category}` + " offering" : ""}
                        value={postinfo["post_desc"]}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                        }}
                        onChange={handletxtChanged}
                        InputProps={{ sx: { height: 120 } }}
                        rows={4}
                        variant="outlined" />
                </div>
                {
                    ((postinfo) && ({ "Fit Recipes Post": true, "Fit StoryBoards Post": true }[postinfo.post_category])) && (

                        <div className='play_icons_post_component'>
                            {
                                (!picinfo.profilepic1loaded) ?
                                    <IconButton onClick={(evt) => handleuploadevent(evt, "1")}>
                                        <UploadFileOutlinedIcon style={iconStyle} />
                                    </IconButton> :
                                    <IconButton onClick={(evt) => handleCancelUpload(evt, "1")}>
                                        <FileDownloadOffOutlinedIcon style={iconStyle} sx={{ color: "red" }} />
                                    </IconButton>
                            }
                            {
                                (!picinfo.profilevideoloaded) ?
                                    <IconButton onClick={(evt) => handleuploadevent(evt, "3")}>
                                        <PlayArrowIcon style={iconStyle} />
                                    </IconButton> :
                                    <IconButton onClick={(evt) => handleuploadevent(evt, "3")} >
                                        <PlayDisabledIcon style={iconStyle} sx={{ color: "red" }} />
                                    </IconButton>
                            }
                            {
                                (validState.file_uploaded) && (
                                    <p>Please upload atleast 1 pic for your receipe credibility</p>
                                )
                            }
                            <Button className='post_message_post_component' onClick={(evt) => handlConfirmationDlg(true)}>Post</Button>
                        </div>
                    )
                }
                {
                    ((postinfo) && (postinfo.post_category === "Transformation Stories Post")) &&
                    <div>
                        <div className='postcomponent_icons'>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <IconButton >
                                    {
                                        (!picinfo.profilepic1loaded) ?
                                            <UploadFileOutlinedIcon style={iconStyle} onClick={(evt) => handleuploadevent(evt, "1")} /> :
                                            <FileDownloadOffOutlinedIcon style={iconStyle} sx={{ color: "red" }} onClick={(evt) => handleCancelUpload(evt, "1")} />
                                    }
                                </IconButton>
                                &nbsp;&nbsp;&nbsp;
                                <IconButton >
                                    {
                                        (!picinfo.profilepic2loaded) ?
                                            <UploadFileOutlinedIcon style={iconStyle} onClick={(evt) => handleuploadevent(evt, "2")} /> :
                                            <FileDownloadOffOutlinedIcon style={iconStyle} sx={{ color: "red" }} onClick={(evt) => handleCancelUpload(evt, "2")} />
                                    }
                                </IconButton>

                            </ButtonGroup>
                        </div>
                        <div className='postcomponent_icons'>
                            <IconButton  >
                                {
                                    (!picinfo.profilevideoloaded) ?
                                        <PlayArrowIcon style={iconStyle} onClick={(evt) => handleuploadevent(evt, "3")} /> :
                                        <PlayDisabledIcon style={iconStyle} sx={{ color: "red" }} onClick={(evt) => handleuploadevent(evt, "3")} />
                                }
                            </IconButton>

                        </div>
                        {
                            (validState.file_uploaded) &&
                            <>please upload atleast 1 pic for your receipe credibility</>
                        }
                        <Button className='post_message_post_component'
                            onClick={(evt) => handlConfirmationDlg(true)}>Post</Button>
                    </div>
                }
                {
                    ((postinfo) && ((postinfo.post_category === "Fitness Products Post") ||
                        (postinfo.post_category === "Fitness Services Post"))) &&
                    <div>
                        <div className='play-icons'>
                            <table>
                                <tr>
                                    <td>
                                        <ButtonGroup variant="text" aria-label="text button group">
                                            <IconButton >
                                                {
                                                    (!picinfo.profilepic1loaded) ?
                                                        <UploadFileOutlinedIcon style={iconStyle} onClick={(evt) => handleuploadevent(evt, "1")} /> :
                                                        <FileDownloadOffOutlinedIcon style={iconStyle} sx={{ color: "red" }} onClick={(evt) => handleCancelUpload(evt, "1")} />
                                                }
                                            </IconButton>
                                            &nbsp;&nbsp;&nbsp;
                                            <IconButton  >
                                                {
                                                    (!picinfo.profilevideoloaded) ?
                                                        <PlayArrowIcon style={iconStyle} onClick={(evt) => handleuploadevent(evt, "3")} /> :
                                                        <PlayDisabledIcon style={iconStyle} sx={{ color: "red" }} onClick={(evt) => handleuploadevent(evt, "3")} />
                                                }
                                            </IconButton>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className='postcomponent_play_icons'>
                            <input name="myt2" type="text"
                                placeholder="Numbers only"
                                onChange={(evt) => handleCurrencyValueChanged(evt)}
                                className="table_pricing_post_component" />
                            {(undefined !== lstofsupportedCurrency) &&
                                <select value={selectedIndex} onChange={handleCurrencyChange}
                                    className="postcomponent_currency">
                                    {lstofsupportedCurrency.map((item, indx) => {
                                        return <option value={indx}>{item}</option>
                                    })}
                                </select>
                            }
                        </div>
                        {
                            (validState.file_uploaded) &&
                            <>please upload atleast 1 pic for your '${postinfo.post_category}' credibility</>
                        }
                        <Button className='post_message_post_component'
                            onClick={(evt) => handlConfirmationDlg(true)}>Post</Button>
                    </div>
                }
            </div>

            {
                (confirmDlgInfo.showConfirmationDlg) &&
                <ConfirmationDialog confirmationState={confirmDlgInfo} handleclosedialog={handleConfirmationDialogClick} />
            }
            {
                (selPicInfo.opendialog) &&
                <ProfilepicSelectionComponent opendialog={selPicInfo.opendialog}
                    profilepicInfo={selPicInfo.profilepicInfo}
                    handleProfilePicChange={handleevent}
                    showcropIcons={selPicInfo.showcropIcons}
                    removePicState={selPicInfo.removePicState}
                    headerMessage={selPicInfo.headerMessage}
                    filetypes={selPicInfo.filetypes} />
            }

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showbackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    )
}


export default PostComponent
