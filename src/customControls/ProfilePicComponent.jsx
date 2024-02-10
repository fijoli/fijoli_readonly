import "./ProfilePicComponent.css"
import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import { useEffect } from "react";
import ProfilepicSelectionComponent from "../profilepiccontrols/ProfilepicSelectionComponent";

const ProfilePicComponent = (props) => {

  //set default values 
  const [opendlgstate,    setopendlgstate]        = useState(false);
  const [profilepicInfo, setprofilepicInfo]   = useState(null);
  const [previewImg,     setpreviewImg]       = useState("");
  const [removedlgstate, setremovedlgstate ]  = useState(false);

  useEffect(()=>{
    if(props.profilepic){
      setprofilepicInfo(props.profilepic)
      setpreviewImg(props.profilepic);
    }
  },[props]);

  //useEffect which updates pic to parent component
  useEffect(()=>{
    if(props.handleProfilePicChange){
      props.handleProfilePicChange(profilepicInfo);
    }
  },[profilepicInfo])

  //handle updating the profile pic status
  const handleProfilePicSelection = (picinfo) => {

    //set profile pic selection
    setSelectedPicInfo(picinfo);

    //close crop dialog state
    setopendlgstate(!opendlgstate);
  }

  //selected pic info
  const setSelectedPicInfo = (picinfo) => {
    //updates preview image 
    if((undefined !== picinfo) && (null !== picinfo)){
      setprofilepicInfo(picinfo);
      setpreviewImg(URL.createObjectURL(picinfo));
    }
    else{
      setprofilepicInfo(null);
      setpreviewImg(null);
    }
  }

  //removes the selected pic file
  const handleProfilePicRemove = (picState) => {
    console.log(picState);
    //deletes the 
    if(picState){
      setSelectedPicInfo(null);
    }

    //close removed dialog state
    setremovedlgstate(!removedlgstate);
  }

  //handles launching the file to choose the profile image
  const handleCameraClick = () =>{
    setopendlgstate(!opendlgstate);
  }

  //handles to remove the profile pic if not required
  const handleRemoveProfilePic = (evt) => {
    setremovedlgstate(!removedlgstate);
  }

  return (
    <div className='profile_pic'>
        <>
          <div className="relative">
            <img src="./base/1x1.png" className="w" />
            <label className='abs trbl flex grow padoff align-items-stretch justify-center circle oh' >
                <div className="relative">
                  {
                    (profilepicInfo) && (
                      <>
                          <span className="abs trbl bg-cover bg-center marg-pull-2x hinherit" style={{backgroundImage:["url(",previewImg,")"].join("")}}></span>
                      </>
                    )||(
                      <div className="flex align-items-center justify-center h">
                        <div>
                          <PersonIcon sx={{fontSize: "5rem"}} />
                        </div>
                      </div>
                    )
                  }
                </div>
            </label>
            <div className="flex align-items-end justify-end hinherit abs trbl">
              <div>
                {
                  (profilepicInfo) && (
                    <PersonRemoveIcon className='profile-icon-sized remove-icon' onClick={handleRemoveProfilePic} />
                  )||(
                    <CameraAltIcon className='profile-icon-sized camera-icon' onClick={handleCameraClick} />
                  )
                }
              </div>
            </div>
          </div>
        </>
      {
          (opendlgstate) &&
          <ProfilepicSelectionComponent opendialog={opendlgstate} 
                profilepicInfo={profilepicInfo} 
                handleProfilePicChange={handleProfilePicSelection}
                showcropIcons={true}
                removePicState={false}/>
      }
      {
        (removedlgstate) &&
        <ConfirmationDialog isopenDialog={removedlgstate} 
              confirmMsg="Are you sure, you want to delete?"
              handleConfirmationState = {handleProfilePicRemove}
              menuOptions={["Cancel", "OK"]}/>
      }
    </div>
  )
}

export default ProfilePicComponent
