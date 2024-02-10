

import { Backdrop, Button, IconButton, Paper, Slide, Snackbar, Tab, Tabs, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProfilePicComponent from '../customControls/ProfilePicComponent'
import fitnesstrainer from "./../asset/trainer.jpg";
// import "./SelfProfile.css";
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ShareIcon from '@mui/icons-material/Share';
import CakeIcon from '@mui/icons-material/Cake';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import BlockIcon from '@mui/icons-material/Block';

import { useDispatch, useSelector } from 'react-redux';
import ProfileTabComponent from './ProfileTabComponent';
import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import StringConstants from '../constants/StringConstants';

import blockuserAction from '../actions/blockuserAction';
import unblockuserAction from '../actions/unblockuserAction';
import { useNavigate } from 'react-router-dom';
import resetStatus from '../actions/resetStatus';
import PostFollowController from '../PostCommentComponents/PostControllers/PostFollowController';
import PostFollowAction from '../PostCommentComponents/PostActions/PostFollowAction';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';
import FollowConfirmationMsgr from './viewmodels/FollowConfirmationMsgr';

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const SelfProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profilepic, setprofilepic] = useState(null);
    const [imgsrc, setimgsrc] = useState(null);
    const [trainertype, settrainertype] = useState("");
    const [isloggedInUser, setisloggedInUser] = useState(false);
    const [followSBarState, setfollowSBarState] = useState(FollowConfirmationMsgr.getDefaultConfirmationMsg());

    const [transition, setTransition] = React.useState(undefined);

    const [blockUserinfo, setblockUserinfo] = useState({
        "confirminfo": { "isOpen": false, "Message": "" },
        "userinfo": { "logged_in_user_id": "", "blocked_user_id": "" },
        "isblocked": false,
        "menuOptions": ["Cancel", "OK"]
    });

    const otherUserInfo = useSelector((state) => state.storeComponent.otherProfileData);
    const loggedInUserinfo = useSelector((state) => state.storeComponent.configData.profileData);
    const lstoftrainingtypes = useSelector((state) => state.storeComponent.configData.user_category);
    const un_blockState = useSelector((state) => state.storeComponent.blockState);

    const [sbstate, setsbState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = sbstate;
    //redirect if block/unblock to error page when it fails
    useEffect(() => {
        if (un_blockState && (400 === un_blockState.status)) {
            dispatch(resetStatus());
            navigate("/error");
        } else if (un_blockState && (200 === un_blockState.status)) {
            dispatch(resetStatus());
        }
    }, [un_blockState])

    //initialize default values which passes to child controls
    useEffect(() => {
        //set default image
        setimgsrc(fitnesstrainer);

        //other userinfo holds either loggedinUser/other user
        if (otherUserInfo) {
            let picinfo = process.env.REACT_APP_S3_URL + otherUserInfo["whatsapp_number"] + "/profilepic/" + otherUserInfo["whatsapp_number"] + "_" + "profilepic_";
            setprofilepic(picinfo);
            //holds the state of loggerin user or not
            otherUserInfo["isLoggedInUser"] = (otherUserInfo.user_id === loggedInUserinfo.user_id);

            //initialzes logger in user id, which is required in child controls
            otherUserInfo["logged_in_user_id"] = loggedInUserinfo.user_id;

            //initializes to display controls based on loggedinuser/otheruser
            setisloggedInUser(otherUserInfo.user_id === loggedInUserinfo.user_id);
            settrainertype(lstoftrainingtypes[otherUserInfo.user_category - 1]);
        }
    }, [otherUserInfo])

    const handleProfilePicChange = (picInfo) => {

    }

    //event handler which initializes confirmation info based on block/unblock user
    const handleBlockUserState = () => {
        blockUserinfo.confirminfo.isOpen = true;
        blockUserinfo.confirminfo.Message = (otherUserInfo.isblocked) ? StringConstants.UNBLOCK_USER_MSG : StringConstants.BLOCK_USER_MSG;
        setblockUserinfo({ ...blockUserinfo });
    }

    //handles blocking/unblocking user info confirmation dialog
    const handleBlockUserConfirmation = (state) => {

        if (state) {
            blockUserinfo.isblocked = otherUserInfo.isblocked;
            blockUserinfo.userinfo.logged_in_user_id = loggedInUserinfo.user_id;
            blockUserinfo.userinfo.blocked_user_id = otherUserInfo.user_id;
        }

        blockUserinfo.confirminfo.isOpen = !blockUserinfo.confirminfo.isOpen;
        setblockUserinfo({ ...blockUserinfo });

        //invokes api to store block/unblock of users if it is not logged in user
        if (otherUserInfo.isblocked) {
            dispatch(unblockuserAction(blockUserinfo.userinfo))
        } else {
            dispatch(blockuserAction(blockUserinfo.userinfo));
        }
    }

    //event handler gets invoke when follow button is pressed
    const handlefollowClick = () => {
        dispatch(PostFollowAction(PostFollowController.getFollowState(otherUserInfo)));
    }

    const handlefollowEvent = (followtype) => {
        let totalCount = 0;
        switch (followtype) {
            case EnumNavigate.followers:
                totalCount = otherUserInfo.follower_count;
                break;
            case EnumNavigate.following:
                totalCount = otherUserInfo.following_count;
                break;
            default:
                totalCount = 0;
                break;
        }
        if (0 < totalCount) {
            dispatch(navigateItem(followtype))
        } else {
            setTransition(() => TransitionDown);
            setfollowSBarState(FollowConfirmationMsgr.getOpenConfirmationMsg(followtype));
        }
    }

    const handlefollowSnackbarClose = () => {
        setfollowSBarState(FollowConfirmationMsgr.getDefaultConfirmationMsg());
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
        <div className="">

            <div className="flex padoff grow align-items-stretch mnvh30">
                <div>
                    <p className="nomargi bg grey-skin h text-center relative">
                        <span className="abs trbl skeleton"></span>
                        <img src="./base/1x1.png" alt="Post Image" className='w h' style={{ "--height": "65vh" }} />
                        <span className="abs trbl bg-cover bg-center" style={{ backgroundImage: ["url(", imgsrc, ")"].join("") }}></span>
                    </p>
                </div>
            </div>

            <div className="flex justify-center pad-">
                <div className="profile-icon-box bg lightgrey circle">
                    <ProfilePicComponent profilepic={profilepic} handleProfilePicChange={handleProfilePicChange} />
                </div>
            </div>
            {(otherUserInfo) &&
                <div>
                    <div className="flex justify-center padoff align-items-center">
                        <div>
                            <div class="relative">
                                <TextField type="text"
                                    value={otherUserInfo.user_name}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    }}
                                    InputProps={{ sx: { height: 30, "& input": { textAlign: "center" } } }} />
                            </div>
                        </div>
                        {
                            (1 || !isloggedInUser) &&
                            (
                                <span>
                                    <WhatsAppIcon />
                                </span>
                            )
                        }
                    </div>
                    <div className="flex justify-center padoff align-items-center">
                        <div>
                            <div class="relative">
                                <TextField type="text"
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    value={trainertype}
                                    sx={{
                                        marginTop: 1,
                                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                    }}
                                    InputProps={{ sx: { height: 30, "& input": { textAlign: "center" } } }} />
                            </div>
                        </div>
                        {
                            (isloggedInUser) &&
                            <div className="">
                                <ModeEditIcon />
                            </div>
                        }
                    </div>
                    <div className="divider"></div>
                    <div className="flex align-items-center justify-center marg margyd wrap">
                        {
                            [
                                { label: "Followers", count: otherUserInfo.follower_count, keyon: EnumNavigate.followers },
                                { label: "Following", count: otherUserInfo.following_count, keyon: EnumNavigate.following }
                            ].map((item, i) => {
                                return (
                                    <div>
                                        <span className='hidden-from-xsm pad padb block'>{item.label}</span>
                                        <button onClick={() => handlefollowEvent(item.keyon)} className="anchor-outline rounded ao-fill-theme pad padxc">
                                            <span className="flex align-items-center justify-between">
                                                <span className='visible-from-xsm'>{item.label}</span>
                                                <span>{item.count}</span>
                                            </span>
                                        </button>
                                    </div>

                                )
                            })
                        }
                        <div>
                            <span className='hidden-from-xsm pad padb block'>Share</span>
                            <button onClick={()=>{}} className={["anchor-outline rounded pad padxb","ao-grey-theme"].join(" ")}>
                                <span className="flex align-items-center justify-between">
                                    <span>
                                        <i className="fa5 fa5-share-alt pad padxb"></i>
                                    </span>
                                </span>
                            </button>
                        </div>
                        {
                            (!isloggedInUser) &&
                            (
                                <>
                                    <div className=''>
                                        <span className='hidden-from-xsm pad padb block'>User</span>
                                        <button onClick={handlefollowClick} className={["anchor-outline rounded pad padxb", ((otherUserInfo.isfollower) ? "ao-fill-theme" : "ao-grey-theme")].join(" ")}>
                                            <span className="flex align-items-center justify-between pad padxc">
                                                <span>{(otherUserInfo.isfollower) ? "Unfollow" : "Follow"}</span>
                                            </span>
                                        </button>
                                    </div>
                                </>
                            )
                        }
                        {
                            (!isloggedInUser) &&
                            <>
                                <div className=''>
                                    <span className='hidden-from-xsm pad padb block'>User</span>
                                    <button title={[otherUserInfo.isblocked ? "Unblock" : "Block"].join("")} onClick={handleBlockUserState} className={["anchor-outline rounded pad padxc", ((otherUserInfo.isblocked) ? "ao-fill-theme" : "ao-grey-skin")].join(" ")}>
                                        <span className="flex align-items-center justify-between">
                                            <span>{(otherUserInfo.isblocked) ? "Unblock" : "Block"}</span>
                                            <span>
                                                <i className="fa5 fa5-ban"></i>
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                    <div className="divider"></div>
                    {
                        (isloggedInUser) && (
                            <div className="flex wrap align-items-center justify-center ypad-">
                                <div className="flex--6 xs--12">
                                    <div className="flex flex-container align-items-center grow ypad-">
                                        <div className='icon-sized-xs'>
                                            <WhatsAppIcon className='selfprofile_div_table_dob_icon' />
                                        </div>
                                        <div>
                                            <input value={otherUserInfo.whatsapp_number} type="text" readOnly={true} key="whatsappnumber" className='form-control nohover nofocus' />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex--6 xs--12">
                                    <div className="flex flex-container align-items-center grow ypad-">
                                        <div className='icon-sized-xs text-center'>
                                            <LocationOnIcon className='selfprofile_div_table_dob_icon' />
                                        </div>
                                        <div>
                                            <input value={otherUserInfo.location} type="text" readOnly={true} key="whatsappnumber" className='form-control nohover nofocus' />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex--12">
                                    <div className="flex flex-container align-items-center grow ypad-">
                                        <div className='icon-sized-xs'>
                                            <EmailIcon className='selfprofile_div_table_dob_icon' />
                                        </div>
                                        <div>
                                            <div className="relative icon-right-pad">
                                                <div className="pad padrc"><input value={otherUserInfo.user_email} type="text" readOnly={true} key="email" className="form-control nohover nofocus" /></div>
                                                { (isloggedInUser) && (
                                                    <div className="abs topright h flex align-items-center padoff icon-item justify-center bg grey-skin">
                                                        <div className="">
                                                            <ModeEditIcon className='selfprofile_div_table_dob_icon' />
                                                        </div>
                                                    </div>
                                                )||("") }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div>
                        <ProfileTabComponent userinfo={otherUserInfo} />
                    </div>
                </div>
            }
            {
                (blockUserinfo.confirminfo.isOpen) &&
                <ConfirmationDialog isopenDialog={blockUserinfo.confirminfo.isOpen}
                    confirmMsg={blockUserinfo.confirminfo.Message}
                    handleConfirmationState={handleBlockUserConfirmation}
                    menuOptions={blockUserinfo.menuOptions} />
            }
            {
                <>
                    <Snackbar
                        open={followSBarState.openfollowsb}
                        TransitionComponent={transition}
                        message={followSBarState.errMsg}
                        action={action}
                        autoHideDuration={6000}
                        anchorOrigin={{ vertical, horizontal }}
                        key={transition ? transition.name : ''}
                    />

                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={followSBarState.openfollowsb}>
                    </Backdrop>
                </>
            }
        </div>
    )
}

export default SelfProfile