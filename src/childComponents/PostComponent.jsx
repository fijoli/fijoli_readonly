


import React, { useState, useEffect } from 'react'
import Button from "@mui/material/Button";
import {  Backdrop, ButtonGroup, CircularProgress, IconButton, TextField } from '@mui/material';
import "./PostComponent.css"
import { useDispatch, useSelector } from 'react-redux';
import { grey } from '@mui/material/colors';
import PostAsyncController from '../viewModels/PostAsyncController';
import ConfirmationDialog from '../DialogComponents/ConfirmationDialog';
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
import PostCommentValidation from '../ModulesValidation/PostCommentValidation';

//component which posts a new entry 
//about the trainer types based on choosed trainer type
const PostComponent = () =>{

    //set default values
    const dispatch             = useDispatch();
    
    //object creates postitem structure to post
    const postAsyncCtrl        = new PostAsyncController();
    const postValidation       = new PostCommentValidation();

    const [postItem, setpostItem] = useState({
        "post_description" : "",
        "post_currency" : 0,
        "post_file" : {"post_pic": [undefined, undefined]}
    });

    //holds index value to launch the type of the post component
    const [selectedIndex,   setSelectedIndex]   = useState(0);

    //structure which holds the uploaded files info
    const [uploadedfiles, setuploadedfiles] = useState({
            "post_pic"      :[undefined, undefined],
            "post_video"    :[undefined]
    });
    
    //holds new/posted info
    const postinfo                  = useSelector((state) => state.storeComponent.postinfo);

    //confirmation dialog structure to display messages
    const [confirmDlgInfo, setconfirmDlgInfo] = useState("");
    const [picinfo, setpicinfo] = useState("");
    const [selPicInfo, setSelPicInfo] = useState("");

    const [placeholdertxt, setplaceholdertxt] = useState("");

    //objects for holding profile data/supported currency/postinfo and status
    const lstofsupportedCurrency    = useSelector((state) => state.storeComponent.configData.currency);

    //holds the posted info
    const postedpost               = useSelector((state) => state.storeComponent.postcomment);
    const [desc, setdesc]           = useState("");
    const [showbackdrop, setShowbackdrop] = useState(false);
    // Adjust the size as needed
    const iconStyle                 = { fontSize: '45px' };
    const [validState, setvalidState] = useState({
        "desc_status"           : false,
        "file_uploaded_status"  : false,
        "currency_status"       : false
    });
    //initializes posted info 
    useEffect(() =>{

        if(postedpost){

            Object.keys(postinfo).forEach(item => {
                postinfo[item] = postedpost[item];
            });
            postItem.post_description = postedpost["post_desc"];
            postItem.post_currency    = postedpost["currency"];

            if((!postedpost["post_pic_1_path"].includes("undefined"))&&
                (!postedpost["post_pic_1_path"].includes("NaN")&&
                (postedpost["post_pic_1_path"] !== ""))){
                postItem.post_file.post_pic[0] = process.env.REACT_APP_S3_URL + postedpost["post_pic_1_path"];
                // uploadedfiles["post_pic"][0] = URL.createObjectURL(img1);
                // picinfo.profilepic1loaded = true;
                // uploadedfiles["post_pic"][0] = process.env.REACT_APP_S3_URL + postedpost["post_pic_1_path"];
            }
            if((!postedpost["post_pic_2_path"].includes("undefined"))&&
                (!postedpost["post_pic_2_path"].includes("NaN")&&
                (postedpost["post_pic_2_path"] !== ""))){
                // uploadedfiles["post_pic"][1] = img1;
                postItem.post_file.post_pic[1] = process.env.REACT_APP_S3_URL + postedpost["post_pic_1_path"];
                // picinfo.profilepic2loaded = true;
            }
            // if(0 < postedpost["post_video_1_path"].length){
            //     // uploadedfiles["post_video"][0] = img1;
            //     picinfo.profilevideoloaded = true;
            // }
            setpostItem({...postItem});
            // setuploadedfiles({...uploadedfiles});
            // setpicinfo({...picinfo});
            // setdesc(postedpost["post_desc"]);
        }
    },[postedpost]);

    //clears unwanted data in store once the component get unmount
    useEffect(()=>{
        return(()=>{
            setShowbackdrop(false);
           dispatch(clearpreviouspoststateAction());
        });
    },[]);

    //clears unwanted data in store once the component get unmount
    useEffect(()=>{
        if(postinfo && (undefined === postedpost)){
            setpostItem({
                "post_description" : "",
                "post_currency" : 0,
                "post_file" : {"post_pic": [undefined, undefined]}
            });
            // setdesc("");
            setplaceholdertxt("        share your  " + postAsyncCtrl.getPostType(postinfo.post_category) + " in not more than 500 characters");
            // setSelPicInfo(postAsyncCtrl.getProfilePicInfo(postinfo.post_category));
            // setconfirmDlgInfo(postAsyncCtrl.getConfirmationObject(postinfo.post_category));
            setvalidState({"desc_status": false, "file_uploaded_status": false, "currency_status" : false});
            // setuploadedfiles({
            //     "post_pic"      :[undefined, undefined],
            //     "post_video"    :[undefined]
            // });
            // setpicinfo(postAsyncCtrl.getProfilePicSelectionState());
        }else if (postinfo &&  postedpost){
            // setSelPicInfo(postAsyncCtrl.getProfilePicInfo(postinfo.post_category));
            // setconfirmDlgInfo(postAsyncCtrl.getConfirmationObject(postinfo.post_category));
        }
    },[postinfo]);

    const handleevent = (selectedfile) =>{
        switch(selPicInfo.name){
            case "1":
                postItem.post_file.post_pic[0]  = (null ===selectedfile)?undefined:selectedfile;
                break;
            case "2":
                postItem.post_file.post_pic[1]  = selectedfile;
                break;
            case "3":
                uploadedfiles["post_video"][0] = selectedfile;
                picinfo.profilevideoloaded = (selectedfile)?true:false;
                break;
        }
        setpostItem({...postItem});
        setSelPicInfo({...selPicInfo, opendialog: false});
        // setuploadedfiles({...uploadedfiles});
        // setpicinfo({...picinfo});
        // setSelPicInfo({...postAsyncCtrl.getProfilePicInfo(postinfo.post_category)});
    }

    //event posts the configured post item to server
    const handlepostInfo = (evt) =>{

        //initialize post item structure
        postinfo["id"] = (postedpost)?postedpost["id"]:"";
        postinfo["currency_category"] = lstofsupportedCurrency[selectedIndex];
        const postformData = postAsyncCtrl.getpostItem(postinfo, postItem);
        
        //sends teh post item structure to server
        if(postedpost){
            dispatch(updatepostAction(postformData));
        }else{
            dispatch(postactionItem(postformData));
        }
    }

    //event handler initializes the confirmation message box data
    const handlConfirmationDlg = (state) =>{
        if(!IsValid()){
            let confirmdlg = postAsyncCtrl.getConfirmationObject(postinfo.post_category);
            confirmdlg["showConfirmationDlg"] = true;
            setconfirmDlgInfo({...confirmdlg});
        }
    }

    //event handler launches windows open file explorer dialog
    const handleuploadevent = (evt, fileid) =>{
        evt.preventDefault();
        // postAsyncCtrl.getProfilePicInfo(fileid, true, null, ".jpg, .png, .jpeg, .gif, .bmp, .mov", postinfo.post_category);
        // document.getElementById(fileid).click();
        // selPicInfo.name             = fileid;
        // selPicInfo.opendialog       = true;
        // selPicInfo.profilepicInfo   = null;
        // selPicInfo.filetypes =(fileid === '3')?".mov":".jpg, .png, .jpeg, .gif, .bmp, .mov";
        setSelPicInfo({...postAsyncCtrl.getProfilePicInfo(fileid, true, null, ".jpg, .png, .jpeg, .gif, .bmp, .mov", postinfo.post_category)});
    }

    //event handler holds the selected currency index
    const handleCurrencyChange = (event) => {
        setSelectedIndex(event.target.selectedIndex);
    }

    //handle description in post info
    const handletxtChanged = (evt) => {
        setpostItem({...postItem, post_description: evt.target.value});
        if(validState.desc_status){
            setvalidState({...validState, "desc_status": false});
        }
    }

    //event handler which invokes based on the confirmaton state
    const handleConfirmationDialogClick = (confirmationState) =>{
        //if user confirmed to post 
        //posts item else navigate to home page
        if(confirmationState){
            setShowbackdrop(true);
            setTimeout(() => {
                handlepostInfo();
            }, 1000);
        }

        //reset confirmation state
        setconfirmDlgInfo({...confirmDlgInfo, showConfirmationDlg: false});
        // handlConfirmationDlg(false);
    }

    ///<summary>
    // sets currency value 
    ///</summary>
    const handleCurrencyValueChanged = (evt) =>{
        postinfo["currency"] = evt.target.value;
        setpostItem({...postItem, "post_currency": evt.target.value});
    }

    const handleCancelUpload = (evt, fileid) => {
        evt.preventDefault();
        let selpicinfo = postAsyncCtrl.getProfilePicInfo(fileid, true, null, ".jpg, .png, .jpeg, .gif, .bmp, .mov", postinfo.post_category);
        // document.getElementById(fileid).click();
        selpicinfo.name             = fileid;
        selpicinfo.opendialog       = true;
        selpicinfo.removePicState = false;
        switch(fileid){
            case "1":
            case "2":
                selpicinfo.profilepicInfo = postItem.post_file["post_pic"][fileid-1];
                break;
            case "3":
                selpicinfo.profilepicInfo = postItem.post_file["post_video"][0];
                break;
        }
        setSelPicInfo({...selpicinfo});
    }

    function IsValid(){
        let validStatus = postValidation.IsValid(postItem, postinfo.post_category);
        setvalidState(validStatus);
        return validStatus.isValid;
    }

  return (
    (postinfo)&&
    <div className='postcomponent_main_container'> 
    <div style={{width:"auto",
            height:"auto",
            border:"1px solid #000", color:"red",
            borderRadius:"10px",position:"relative" }}>
            <div style={{width:"auto",
                height:"125px",
                border:"1px solid #000", color:"red",
                borderRadius:"10px" }}>
                    <TextField 
                        style={{textAlign: 'left'}}
                        placeholder={placeholdertxt}
                        fullWidth
                        multiline
                        helperText={(validState.desc_status)?"Please write something about your " + `${postAsyncCtrl.getPostType(postinfo.post_category)}` :""}
                        value={postItem.post_description}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                        }}
                        onChange = {handletxtChanged}
                        InputProps={{ sx: { height: 120 }}}       
                        rows={4}                                
                        variant="outlined"/>
            </div>
            {
                ((postinfo.post_category === "Fit Recipes Post") ||
                (postinfo.post_category === "Fit StoryBoards Post")) && 
                    <div className='play_icons_post_component'>
                        {
                            (undefined === postItem.post_file.post_pic[0])?
                            <IconButton onClick={(evt)=> handleuploadevent(evt, "1")}>
                                    <UploadFileOutlinedIcon style={iconStyle}  />
                            </IconButton>:
                            <IconButton onClick={(evt)=> handleCancelUpload(evt, "1")}>
                                    <FileDownloadOffOutlinedIcon style={iconStyle} sx={{color: "red"}}  /> 
                            </IconButton>
                        }
                        {/* {
                            (!picinfo.profilevideoloaded)? 
                            <IconButton onClick={(evt)=> handleuploadevent(evt, "3")}>
                                    <PlayArrowIcon style={iconStyle} />
                            </IconButton>:
                            <IconButton onClick={(evt)=> handleuploadevent(evt, "3")} >
                                    <PlayDisabledIcon style={iconStyle} sx={{color: "red"}} /> 
                            </IconButton>
                        } */}
                        <Button className='post_message_post_component' onClick={(evt) => handlConfirmationDlg(true)}>Post</Button>
                        {
                            (validState.file_uploaded_status)&&
                            <>
                                <br/>
                                <div className='errmessage_aboutyourself_postcomponent'>Please upload atleast 1 pic or video of your {postAsyncCtrl.getPostType(postinfo.post_category)}</div>
                            </>
                        }

                    </div>
            }
            {
                (postinfo.post_category === "Transformation Stories Post") &&
                <div>
                    <div className='postcomponent_icons'>
                        <ButtonGroup variant="text" aria-label="text button group">
                                    <IconButton >
                                        {
                                            (undefined === postItem.post_file.post_pic[0])? 
                                            <UploadFileOutlinedIcon style={iconStyle} onClick={(evt)=> handleuploadevent(evt, "1")} /> :  
                                            <FileDownloadOffOutlinedIcon style={iconStyle} sx={{color: "red"}} onClick={(evt)=> handleCancelUpload(evt, "1")} /> 
                                        }
                                    </IconButton>
                                    &nbsp;&nbsp;&nbsp;
                                    <IconButton >
                                        {
                                            (undefined === postItem.post_file.post_pic[1])? 
                                            <UploadFileOutlinedIcon style={iconStyle} onClick={(evt)=> handleuploadevent(evt, "2")} /> :  
                                            <FileDownloadOffOutlinedIcon style={iconStyle} sx={{color: "red"}} onClick={(evt)=> handleCancelUpload(evt, "2")} /> 
                                        }
                                    </IconButton>
        
                        </ButtonGroup>
                    </div>
                    {/* <div className='postcomponent_icons'>
                        <IconButton  >
                                {
                                    (!picinfo.profilevideoloaded)? 
                                    <PlayArrowIcon style={iconStyle} onClick={(evt)=> handleuploadevent(evt, "3")}/> :  
                                    <PlayDisabledIcon style={iconStyle} sx={{color: "red"}} onClick={(evt)=> handleuploadevent(evt, "3")} /> 
                                }
                            </IconButton>

                    </div> */}
                    {
                        (validState.file_uploaded_status)&&
                        <>
                            <br/>
                            <div className='errmessage_aboutyourself_postcomponent'>Please upload 2 pic or video of your {postAsyncCtrl.getPostType(postinfo.post_category)}</div>
                        </>
                    }                        
                    <Button className='post_message_post_component' 
                        onClick={(evt) => handlConfirmationDlg(true)}>Post</Button>
                </div>
            }
            {
                ((postinfo.post_category === "Fitness Products Post") ||
                (postinfo.post_category === "Fitness Services Post")) &&
                <div>
                    <div className='postcomponent_play_icons'>
                        <input type="label" 
                            className='table_pricing_post_component_label'
                            value="Selling Price" disabled/>
                        <input name="myt2" type="text"
                                value = {postItem.post_currency}
                                placeholder="Numbers only"
                                onChange={(evt)=>handleCurrencyValueChanged(evt)}
                                className="table_pricing_post_component"/>
                        {
                            (undefined !== lstofsupportedCurrency) &&
                            <select value={selectedIndex} onChange={handleCurrencyChange}
                                className="postcomponent_currency">
                                    {lstofsupportedCurrency.map((item, indx)=>{
                                        return <option value={indx}>{item}</option>
                                    })}
                            </select>
                        }
                        {
                            (validState.currency_status)&&
                            <div className='errmessage_aboutyourself_postcomponent'>
                                Please enter selling price
                            </div>
                        }
                    </div>

                    <div className='play-icons'>
        <table>
            <tr>
                <td>
                <ButtonGroup variant="text" aria-label="text button group">
                <IconButton >
                        {
                        (undefined === postItem.post_file.post_pic[0])? 
                        <UploadFileOutlinedIcon style={iconStyle} onClick={(evt)=> handleuploadevent(evt, "1")} /> :  
                        <FileDownloadOffOutlinedIcon style={iconStyle} sx={{color: "red"}} onClick={(evt)=> handleCancelUpload(evt, "1")} /> 
                        }
                    </IconButton>
            &nbsp;&nbsp;&nbsp;
            {/* <IconButton  >
                        {
                            (!picinfo.profilevideoloaded)? 
                            <PlayArrowIcon style={iconStyle} onClick={(evt)=> handleuploadevent(evt, "3")}/> :  
                            <PlayDisabledIcon style={iconStyle} sx={{color: "red"}} onClick={(evt)=> handleuploadevent(evt, "3")} /> 
                        }
                    </IconButton> */}
                </ButtonGroup>
                </td>
            </tr>
        </table>
                    </div>
                    {
                        (validState.file_uploaded_status)&&
                        // <>please upload atleast 1 pic for your '${postinfo.post_category}' credibility</>
                        <>
                            <br/>
                            <div className='errmessage_aboutyourself_postcomponent'>Please upload atleast 1 pic or video of your {postAsyncCtrl.getPostType(postinfo.post_category)}</div>
                        </>
                    }                        
                    <Button className='post_message_post_component' 
                            onClick={(evt) => handlConfirmationDlg(true)}>Post</Button>
                </div>
            }
    </div>
            
        {
            (confirmDlgInfo.showConfirmationDlg) &&
            <ConfirmationDialog confirmationState={confirmDlgInfo} handleclosedialog={handleConfirmationDialogClick}/>
        }
        {
            (selPicInfo.opendialog)&&
            <ProfilepicSelectionComponent opendialog={selPicInfo.opendialog}
                        profilepicInfo = {selPicInfo.profilepicInfo}
                        handleProfilePicChange={handleevent} 
                        showcropIcons   = {selPicInfo.showcropIcons}
                        removePicState  = {selPicInfo.removePicState} 
                        headerMessage   = {selPicInfo.headerMessage}
                        filetypes       = {selPicInfo.filetypes}/>
        }
            
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showbackdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    
    </div>)
}

export default PostComponent
