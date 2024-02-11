

import React from 'react'
import "./ViewPostComponent.css";

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Backdrop, Button, CircularProgress, Divider, IconButton, Skeleton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';
import getselectedprofile from '../actions/getselectedprofile';

import ConfirmationDialog from '../childComponents/ConfirmationDialog';
import deletePostItemAction from '../actions/deletePostItemAction';
import { useState } from 'react';
import { useEffect } from 'react';
import editpostItemAction from '../actions/editpostItemAction';
import PostCommentContainer from '../PostreviewComponents/PostCommentContainer';
import PostLikeDislikeController from './PostControllers/PostLikeDislikeController';
import postlikesDislikesAction from './PostActions/PostLikesDislikesAction';
import PostFollowController from './PostControllers/PostFollowController';
import PostFollowAction from './PostActions/PostFollowAction';
import PostMenuController from './PostControllers/PostMenuController';
import posthideAction from './PostActions/posthideAction';
import PostDialogComponent from './CustomDialogComponent/PostDialogComponent';
import PostMenuComponent from './PostMenuComponent';
import DummyViewPostComponent from './DummyViewPostComponent';
import dislikeHeart from './../../src/asset/heart.svg';
import rdislikeHeart from './../../src/asset/rDislikeheart.svg';
import share from './../../src/asset/share-alt.svg';
import lheart from './../../src/asset/lheart.svg';
import rheart from './../../src/asset/rheart.svg';
import comment from './../../src/asset/awesome-comment.svg';
import EnumPostMenuOptions from './PostControllers/PostMenuOptions';
import { CircleImageTemplate } from '../helper/component_block';

const iconStyle = {
    fontSize: '25px', // Adjust the size as needed
    color: "black"
};

const whatsappiconStyle = {
    fontSize: '35px', // Adjust the size as needed
    color: "green"
};

const selectediconStyle = {
    fontSize: "25px",
    color: "red"
}

const followiconStyle = {
    color: "black"
}

const followSelectediconStyle = {
    color: "red"
}

const ViewPostComponent = ({ postkey }) => {
    const postitem = useSelector((state) => state.storeComponent.lstofPosts[postkey]);
    // console.log(" ViewPostCommentComponent " + postitem.id);
    const dispatch = useDispatch();

    const [showbackdrop, setShowbackdrop] = useState(false);
    const [menuOptions, setmenuOptions] = useState(["Report", "Hide", "follow"]);
    const [confirmDlgInfo, setconfirmDlgInfo] = useState(PostMenuController.getDefaultConfirmation());
    const [confirmreportInfo, setconfirmreportInfo] = useState(PostMenuController.getDefaultConfirmation());

    const [ispostReview, setispostReview] = useState(false);

    const [picinfo, setpicinfo] = useState();
    const [userpicinfo, setuserpicinfo] = useState();

    //initialize menu items to be displayed 
    //if post belongs to logged in user - displays edit/delete options
    useEffect(() => {

        if (postitem.isLoggedInUser) {
            setmenuOptions([
                EnumPostMenuOptions.Edit,
                EnumPostMenuOptions.Delete,
                EnumPostMenuOptions.Hide
            ]);
        }

        setTimeout(() => {
            if (!postitem["post_pic_1_path"].includes("undefined")) {
                let urlpath = process.env.REACT_APP_S3_URL + postitem["post_pic_1_path"];
                setpicinfo(urlpath);

                let picpath = process.env.REACT_APP_S3_URL + postitem["whatsapp_number"] + "/profilepic/" + postitem["whatsapp_number"] + "_profilepic_";
                setuserpicinfo(picpath);
            }
        }, 1000);

    }, [postitem]);

    //redirects to self profile when user img is clicked
    const handleOtherProfile = () => {
        if (postitem.isLoggedInUser) {
            dispatch(getselectedprofile(true, 0));
        } else {
            dispatch(getselectedprofile(false, postitem.whatsapp_number, postitem.logged_in_user_id));
        }
        dispatch(navigateItem(EnumNavigate.profileState));
    }

    //event which executes when the menu icons are clicked
    const handleClick = (eventtype) => {
        switch (eventtype) {
            case EnumPostMenuOptions.Edit:
                dispatch(editpostItemAction(postitem));
                dispatch(navigateItem(EnumNavigate.postState));
                break;
            case EnumPostMenuOptions.Delete:
                setconfirmDlgInfo({ ...PostMenuController.getDeleteConfirmation() });
                break;
            case EnumPostMenuOptions.Report:
                setconfirmreportInfo({ ...PostMenuController.getPostConfirmation() });
                break;
            case EnumPostMenuOptions.Hide:
                setconfirmDlgInfo({ ...PostMenuController.getHideConfirmation() });
                break;
            case EnumPostMenuOptions.Follow:
                setTimeout(() => {
                    postitem.isfollower = !postitem.isfollower;
                    setShowbackdrop(false);
                }, 2000);
                setShowbackdrop(true);
                dispatch(PostFollowAction(PostFollowController.getFollowState(postitem)));
                break;
            default:
                setconfirmDlgInfo({ ...PostMenuController.getDefaultConfirmation() });
                break;
        }
    }

    const handlePostConfirmation = (confirmstate) => {
        if (confirmstate) {
            switch (confirmreportInfo.postmenutype) {
                case EnumPostMenuOptions.Report:
                    setconfirmreportInfo({ ...PostMenuController.getDefaultConfirmation() });
                    setconfirmDlgInfo({ ...PostMenuController.getHideConfirmation("we have reported this post - would you also like to hide this post?") });
                    break;
            }
        } else {
            setconfirmreportInfo({ ...PostMenuController.getDefaultConfirmation() });
        }
    }

    //deletes post based on the confirmed state
    const handleConfirmationState = (confirmState) => {
        if (confirmState) {

            switch (confirmDlgInfo.postmenutype) {
                case EnumPostMenuOptions.Delete:
                    //call delete post item 
                    dispatch(deletePostItemAction({ "id": postitem.id, "post_category": postitem.post_category }));
                    break;
                case EnumPostMenuOptions.Hide:
                    dispatch(posthideAction(PostMenuController.getHideMenuData(postitem)));
                    break;

            }

        }
        handleClick("");
    }

    const handlepostreview = () => {
        setispostReview(!ispostReview);
    }

    const handlelikeState = (state) => {
        console.log("like state ==> " + postitem.id);
        const postState = PostLikeDislikeController.getpostlike(postitem.id, postitem.logged_in_user_id, postitem.post_category, state);
        dispatch(postlikesDislikesAction(postState));
    }


    return (
        <div className=''>
            {
                ("" === picinfo) ?
                    <DummyViewPostComponent /> :
                    <>
                        {(postitem) &&
                            <div className=''>
                                <div className='flex align-items-center grow'>
                                    <div className='icon-sized-xsm'>
                                        <a href={null} className='anchor-outline ao-grey-black-theme circle oh nolh block' onClick={handleOtherProfile}>
                                            <CircleImageTemplate image={userpicinfo} />
                                        </a>
                                    </div>
                                    <div>
                                        <p className="pad padba nomargi font-bold">
                                            <a href={null} onClick={handleOtherProfile} className="anchor-outline ao-link-themeblack">
                                                <span className="lead h6">
                                                    {postitem.user_name}
                                                </span>
                                            </a>
                                        </p>
                                        <p className='nomargi lead h7' >{postitem.user_category_type}</p>
                                    </div>
                                    <div className='icon-sized-xsm text-center'>
                                        <PostMenuComponent menuOptions={menuOptions} isfollower={postitem.isfollower} handleClick={handleClick} />
                                    </div>
                                </div>
                                <div className="flex padoff grow align-items-stretch">
                                    <div>
                                        <p className="nomargi bg grey-skin h text-center relative">
                                            <img src="./base/1x1.png" alt="Post Image" className='w h' style={{ "--height": "65vh" }} />
                                            <span className="abs trbl bg-cover bg-center" style={{ backgroundImage: ["url(", picinfo, ")"].join("") }}></span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex padoff align-items-center justify-between">
                                    <div>
                                        <div className="flex align-items-center">
                                            <div>
                                                <span className="flex padoff align-items-center">
                                                    <span>
                                                        <IconButton key="upkey" onClick={(evt) => handlelikeState(1)}>
                                                            {
                                                                (([postitem.is_active, postitem.reaction].join("")) === "11") && (<img src={rheart} className="view_image_pic" />) ||
                                                                (<img src={lheart} className="view_image_pic" />)
                                                            }
                                                        </IconButton>
                                                    </span>
                                                    <span>
                                                        <span className='lead h9'>{postitem.likes_count}</span>
                                                    </span>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="flex padoff align-items-center">
                                                    <span>
                                                        <IconButton key="downkey" onClick={(evt) => handlelikeState(0)}>
                                                            {
                                                                (([postitem.is_active, postitem.reaction].join("")) === "10") &&
                                                                (<img src={rdislikeHeart} className="view_image_pic" />) ||
                                                                (<img src={dislikeHeart} className="view_image_pic" />)
                                                            }
                                                        </IconButton>
                                                    </span>
                                                    <span>
                                                        <span className='lead h9'>{postitem.likes_count}</span>
                                                    </span>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="flex padoff align-items-center">
                                                    <span>
                                                        <IconButton key="modekey" onClick={(evt) => handlepostreview()}>
                                                            <img src={comment} className="view_image_pic" />
                                                        </IconButton>
                                                    </span>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="flex padoff align-items-center">
                                                    <span>
                                                        <IconButton key="modekey" onClick={(evt) => { }}>
                                                            <img src={share} className="view_image_pic" />
                                                        </IconButton>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex align-items-center">
                                            <div>
                                                <span className="flex padoff align-items-center">
                                                    <span>
                                                        <WhatsAppIcon key="whatsappkey" style={whatsappiconStyle} />
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex grow align-items-center">
                                    <div className='font-child'>
                                        {postitem.post_desc}
                                    </div>
                                </div>
                                <div className="divider"></div>
                                {
                                    (confirmDlgInfo.showConfirmationDlg) &&
                                    <ConfirmationDialog isopenDialog={confirmDlgInfo.showConfirmationDlg}
                                        confirmMsg={confirmDlgInfo.confirmationMessage}
                                        handleConfirmationState={handleConfirmationState}
                                        menuOptions={confirmDlgInfo.menuOptions} />
                                }
                                {
                                    (ispostReview) &&
                                    <PostCommentContainer key={postitem.id} post_id={postitem.id} logged_in_user_id={postitem.logged_in_user_id} post_category={postitem.post_category} />
                                }
                                {
                                    (confirmreportInfo.showConfirmationDlg) &&
                                    <PostDialogComponent isopenDialog={confirmreportInfo.showConfirmationDlg}
                                        handlePostConfirmation={handlePostConfirmation}
                                        postitem={postitem} />
                                }
                                <Divider />
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={((showbackdrop) || (confirmDlgInfo.showConfirmationDlg) || (confirmreportInfo.showConfirmationDlg))}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>

                            </div>
                        }
                    </>
            }
        </div>

    )
}

export default ViewPostComponent