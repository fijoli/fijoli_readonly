

import React, { useEffect, useState } from 'react'
import "../css/MenuComponent.css";

import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import { Menu, Button, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import deactivateUser from '../actions/deactivateuser';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import getselectedprofile from '../actions/getselectedprofile';

const ITEM_HEIGHT = 48;
const useStyles = makeStyles(theme => ({
    iconButton: {
        display: "flex",
        flexDirection: "row",
        cursor: "pointer"
    }
}));

//component used to display all the options supported by fijoli
const MenuComponent = (props) => {
    const {onMenuToggle, menutoggle} = props;

    //create objects with default values
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isAccountMenuVisible, setAccountMenuVisible] = useState(false);

    //objects which holds profile data and deactivatestatus
    const userProfile = useSelector((state) => state.storeComponent.configData.profileData);
    const deactivateStatus = useSelector((state) => state.storeComponent.deactivateStatus);

    //hook navigates to login page if user
    //choose deactivate status from the options
    //else redirects to error page
    useEffect(() => {

        if ((undefined != deactivateStatus) && (200 === deactivateStatus.status)) {
            dispatch({ "type": "clear" });
            navigate("/login");
        } else if ((undefined != deactivateStatus) && (200 !== deactivateStatus.status)) {
            navigate("/error");
        }

    }, [deactivateStatus]);

    //event handler to initialize popup menu and visibility state
    const handleAccountClick = (evt) => {
        // setAnchorEl(evt.currentTarget);
        setAccountMenuVisible(!isAccountMenuVisible);
    }

    //event handler performs logout application
    const handleLogout = () => {
        dispatch({ "type": "set_deactivate_account_success", "data": { "status": 200 } });
    }

    //resets the selected control which is used during popup
    const handleClose = () => {
        setAnchorEl(null);
    }

    //navigate to logged in user profile or deactive logged in user
    const handleProfileState = (e, option) => {
        if ("viewProfile" === option) {
            dispatch(getselectedprofile(true, 0));
            dispatch(navigateItem(EnumNavigate.profileState));
        } else if ("deactivateAccount" === option) {
            dispatch(deactivateUser({ "user_id": userProfile.user_id }));
        } else if ("BlockUsers" === option) {
            dispatch(navigateItem(EnumNavigate.blockusers));
        }

        setAccountMenuVisible(false);
    }

    return (
        <div className={['transition ease sidebar-main',(menutoggle?"sm-open":"")].join(" ")}>
            <div className="sm-backdrop transition ease" onClick={()=>{onMenuToggle(!menutoggle)}} ></div>
            <div className='sm-inner'>
                <div className="flex wrap align-items-center grow">
                    <div className=''>
                        <h3 className='sm-menu-h1'>Menu</h3>
                    </div>
                    <div className="icon-sized-xsm">
                        <a href={null} className='menu-toggler block radius' onClick={()=>{onMenuToggle(!menutoggle)}} >
                            <span className="flex align-items-center justify-center">
                                <span>
                                    <i className="fa5 fa5-times"></i>
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="flex wrap">
                    <div className="flex--12">
                        <ul className="sm-list">
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <DiamondOutlinedIcon ></DiamondOutlinedIcon>
                                        </span>
                                        <span>
                                            <span className=''> Premium </span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <SettingsOutlinedIcon ></SettingsOutlinedIcon>
                                        </span>
                                        <span>
                                            <span className=''> Settings </span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <SecurityOutlinedIcon ></SecurityOutlinedIcon>
                                        </span>
                                        <span>
                                            <span className=''> Security </span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <HelpOutlineOutlinedIcon ></HelpOutlineOutlinedIcon>
                                        </span>
                                        <span>
                                            <span className=''> Help </span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <ChatBubbleOutlineOutlinedIcon ></ChatBubbleOutlineOutlinedIcon>
                                        </span>
                                        <span>
                                            <span className=''> Support </span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <InfoIcon ></InfoIcon>
                                        </span>
                                        <span>
                                            <span className=''> About Fijoli </span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li className={['sub-menu',(isAccountMenuVisible)?"open":""].join(" ")}>
                                <a href={null} className='menu-item' onClick={handleAccountClick}>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <PersonIcon ></PersonIcon>
                                        </span>
                                        <span>
                                            <span className=''> Account </span>
                                        </span>
                                        <span className='icon-item'>
                                            <i className="fa5 fa5-chevron-right off"></i>
                                            <i className="fa5 fa5-chevron-up on"></i>
                                        </span>
                                    </span>
                                </a>
                                <div className="sub-menu-container">
                                    <ul>
                                        <li>
                                            <a className='menu-item transition' href={null} onClick={(e) => handleProfileState(e, "viewProfile")}>
                                                <span className="flex h align-items-center">
                                                    <span>View Profile</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='menu-item transition' href={null} onClick={(e) => handleProfileState(e, "BlockUsers")}>
                                                <span className="flex h align-items-center">
                                                    <span>Block Users</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='menu-item transition' href={null} onClick={(e) => handleProfileState(e, "deactivateAccount")}>
                                                <span className="flex h align-items-center">
                                                    <span>Deactivate-Account</span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <PersonIcon ></PersonIcon>
                                        </span>
                                        <span>
                                            <span className=''> Privacy Policy </span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={null} className='menu-item'>
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <PersonIcon ></PersonIcon>
                                        </span>
                                        <span>
                                            <span className=''>Terms & Conditions</span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={null} className='menu-item' onClick={handleLogout} >
                                    <span className="flex align-items-center grow h">
                                        <span className='icon-item'>
                                            <PersonIcon ></PersonIcon>
                                        </span>
                                        <span>
                                            <span className=''>Logout</span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuComponent