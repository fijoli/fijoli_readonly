import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import "./ProfilepicSelectionComponent.css";
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TransformIcon from '@mui/icons-material/Transform';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CancelIcon from '@mui/icons-material/Cancel';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Avatar, Backdrop, Button, Dialog, DialogContent, DialogTitle, IconButton, Skeleton, Slide, Snackbar } from '@mui/material'

import ProfilepicCropComponent from './ProfilepicCropComponent';

function TransitionDown(props) {
    return <Slide {...props} direction="up" />;
}

const ProfilepicSelectionComponent = ({
    opendialog, profilepicInfo, handleProfilePicChange, showcropIcons, removePicState, headerMessage, filetypes}) =>{

    const [picpreview,      setpicpreview]    = useState(null);
    const [openCropDlg,     setopenCorpDlg]   = useState(false);
    const [disableState,    setdisableState]  = useState(false);
    const [profilepicFile,  setprofilepicFile] = useState(null);
    const [orginalpicFile,  setOriginalpicFile] = useState(null);

    const [confirmbtnlst, setconfirmbtnlist] = useState(["Cancel", "OK"]);
    const [selPicMessage,   setselPicMessage]     = useState({"open": false});

    const [transition, setTransition] = useState(undefined);

    const [sbstate] = React.useState({
        vertical: 'top',
        horizontal: 'center',
      });
    const { vertical, horizontal } = sbstate;

    //initialize usestate member variables once
    //pic file selected
    const setselectedPic = useCallback((picinfo) => {
        //set usestate member variables
        setprofilepicFile(picinfo);
        if((filetypes === ".mov") || (filetypes === ".pdf")){
            setpicpreview("/images/fileuploaded.jpeg");
        }else{
            setpicpreview(URL.createObjectURL(picinfo));
        }

        //disable other controls once pic file selected
        let disableState = (picinfo)?true:false;
        setdisableState(disableState);

        // setdisableState(((disableState) && (showcropIcons)));
    },[filetypes,setpicpreview])
    ///<summary>
    // if pic is already selected initialize 
    // when the dialog is launched
    ///</summary>
    useEffect(()=>{
        if(profilepicInfo){
            setselectedPic(profilepicInfo);
            setOriginalpicFile(profilepicInfo);
            if(removePicState){
                setconfirmbtnlist([...["No", "Yes"]]);
            }
        }
    },[profilepicInfo,removePicState,setselectedPic])


    //launch windows file explorer
    const handleuploadpicevent = () =>{
        document.getElementById("fileid").click();
    }

    //initialize selected file
    const handlefileChange = (evt) => {
        if(evt.target.files[0].size <= 4000000){
            setselectedPic(evt.target.files[0]);
            setOriginalpicFile(evt.target.files[0]);
            evt.target.value = null;
        }else{
            setTransition(()=>TransitionDown);
            setselPicMessage({"open": true, "errMsg":"file size should be lessthan or equal to 4MB"});
        }
    }

    //remove selected file 
    const handlepicremoveevent = () =>{
        setprofilepicFile(undefined);
        setpicpreview(null);
        setdisableState(!disableState);
    }

    //launches crop dialog 
    const handleCropDlgLaunch = () => {
        setopenCorpDlg(!openCropDlg);
    }

    //set cropped image and close crop dilaog
    const handlecropState = (blob) =>{
        setselectedPic(blob);
        setopenCorpDlg(!openCropDlg);
    }

    //sets profile pic info 
    const handleOkClick = () => {
        handleProfilePicChange(profilepicFile);
    }

    //Cancel selected changes and reset original profile pic info
    const handleCancelClick = () =>{
        handleProfilePicChange(profilepicInfo)
    }

    //reset the changes which is done
    const handleResetevent = () =>{
        setselectedPic(orginalpicFile);
    }

    //removes profile pic 
    const handleRemovepicClick = () => {
        setprofilepicFile(undefined);
        setpicpreview(null);
        setdisableState(!disableState);
        handleProfilePicChange(null);
    }

    const handlefollowSnackbarClose = () =>{
        setselPicMessage({"open": false, "errMsg":""});
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handlefollowSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

  return (
    <div>
        <Dialog open={opendialog} PaperProps={{ style: {
                    minHeight: '32%', minWidth:"18%", borderRadius: "10px"
                }}}>
            <DialogTitle textAlign="center">{headerMessage}</DialogTitle>
            <DialogContent>
                <div style={{border:"1px solid black", borderRadius:"10px"}}>
                    {
                        (null === picpreview)?
                        <Skeleton variant="circular" 
                                  style={{marginTop: "10px", marginLeft: "25px"}}
                                  animation="wave" width={120} height={120} />
                        :
                        <Avatar 
                            src={picpreview}
                            style={{marginTop: "10px", marginLeft: "40px"}}
                            sx={{ width: 112, height: 112}}/>
                    }
                    <br/>
                    <>
                    {
                        (!removePicState) &&
                        <>
                            {
                            ((null === profilepicFile) || (undefined === profilepicFile)) &&
                                <IconButton >
                                    <UploadIcon className='select_pic_icon' onClick={handleuploadpicevent}  />
                                </IconButton>
                            }

                            {
                            ((null !== profilepicFile) && (undefined !== profilepicFile)) &&
                                <IconButton >
                                    <PersonRemoveIcon className='select_pic_icon' onClick={handlepicremoveevent}/>
                                </IconButton>
                            }

                            {
                            (showcropIcons) &&                                    
                                <IconButton disabled={!disableState}>
                                    <TransformIcon className='select_pic_icon' onClick={handleCropDlgLaunch}/>
                                </IconButton>
                            }
                            {
                            (showcropIcons) &&                                    
                                <IconButton disabled={!disableState}>
                                    <RestartAltIcon className="select_pic_icon" onClick={handleResetevent}/>
                                </IconButton>
                            }
                        </>
                        }
                    </>
                </div>
                <div className='select_pic_okcancel_div'  >
                    {
                        confirmbtnlst.map((item, index)=>{
                            if(("Cancel" === item) || ("No" === item)){
                                return <Button variant='outlined'
                                                className='pic_selection_cofirmation_btns'
                                                startIcon={<CancelIcon style={{fontSize: "20px"}}/>} 
                                                onClick={handleCancelClick}>{item}</Button>
                            }else if("OK" === item){
                                return <Button variant='outlined'  disabled = {!disableState} 
                                            className='pic_selection_cofirmation_btns'
                                            startIcon={<HowToRegIcon style={{fontSize: "20px"}}/>} 
                                            onClick={handleOkClick}>OK</Button>
                            }else if("Yes" === item){
                                return <Button variant='outlined'  
                                            className='pic_selection_cofirmation_btns'
                                            startIcon={<HowToRegIcon style={{fontSize: "20px"}}/>} 
                                            onClick={handleRemovepicClick}>Yes</Button>
                            }
                            return "";
                        })
                    }
                </div>
                {
                    openCropDlg && 
                    <ProfilepicCropComponent openCropDlg={openCropDlg}
                             handlecropState={handlecropState} 
                             profilepicFile={profilepicFile}/>
                }

                <input type="file" style={{display: "none"}} 
                    accept = {filetypes}
                    onChange={(evt)=> handlefileChange(evt)} id="fileid"/>
            </DialogContent>
        </Dialog>
        {
                <>
                <Snackbar
                    open={selPicMessage.open}
                    TransitionComponent={transition}
                    message={selPicMessage.errMsg}
                    action={action}
                    autoHideDuration={6000}
                    anchorOrigin = {{vertical, horizontal}}
                    key={transition ? transition.name : ''}
                />
                
                <Backdrop
                    sx={{ color: '#FFFFFF', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={selPicMessage.open}>
                </Backdrop>
            </>
        }
    </div>
  )
}

export default ProfilepicSelectionComponent