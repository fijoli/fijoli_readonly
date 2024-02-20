
import React, { useEffect } from 'react'
import { useState } from 'react';
import { TextField } from '@mui/material';

import ConfirmationDialog from '../childComponents/ConfirmationDialog';

import { useDispatch } from 'react-redux';
import postdummyreviewcomments from '../actions/postdummyreviewcommentsState';
import postuserreviewcomment from '../actions/postuserreviewcomment';
import ProfilepicSelectionComponent from '../profilepiccontrols/ProfilepicSelectionComponent';
import PostReviewController from '../viewModels/PostReviewController';
import RatingComponent from './RatingComponent';



const ReviewPostComponent = ({ reviewcomment, callback }) => {

    const dispatch = useDispatch();
    const [desc, setdesc] = useState("");
    const [isuploaded, setisuploaded] = useState(false);
    const [openPicSelDlg, setopenPicSelDlg] = useState(false);
    const [uploadfiles, setuploadfiles] = useState({ "review": [undefined] });

    const [confirmDlgInfo, setconfirmDlgInfo] = useState({
        "showConfirmationDlg": false,
        "confirmationHeading": "Confirmation",
        "confirmationMessage": "Are you sure to post review comment?",
        "menuOptions": ["No", "Yes"]
    });

    //created this hook to fix an issue -displaying description to support onchange event
    //hook sets review comment of the description
    useEffect(() => {
        if (reviewcomment) {
            setdesc(reviewcomment[reviewcomment["desc_type"]]);
        }
    }, [reviewcomment]);


    //event which initialize description 
    //based on desc_type either to "reviewer_desc" / "reply_desc"
    const handletxtChanged = (evt) => {
        setdesc(evt.target.value);
        reviewcomment[reviewcomment["desc_type"]] = evt.target.value;
    }

    //event which initialize confirmation dialog state
    const handlConfirmationDlg = () => {
        confirmDlgInfo["showConfirmationDlg"] = true;
        setconfirmDlgInfo({ ...confirmDlgInfo });
    }

    //event which posts the review comment based 
    //on the confirmation status 
    const handlePostReviewConfirmation = (postState) => {
        //close confirmation dialog
        confirmDlgInfo["showConfirmationDlg"] = false;
        setconfirmDlgInfo({ ...confirmDlgInfo });

        //if Yes post the state and close confirmation dialog
        //else close confirmation dialog without posting
        if (postState) {
            let reviewpostCtrl = new PostReviewController();
            const reviewData = reviewpostCtrl.getpostItem(reviewcomment, uploadfiles);
            dispatch(postuserreviewcomment(reviewData, reviewcomment.mode));
        } else {
            dispatch(postdummyreviewcomments());
        }
    }

    //handles upload confirmation pic 
    const handleUploadfile = () => {
        setopenPicSelDlg(true)
    }

    //event handles profile pic change 
    const handleProfilePicChange = (picinfo) => {

        //handle profile pic change source code
        if (null === picinfo) {
            setisuploaded(false);
            delete uploadfiles["review"][0];
        } else {
            setisuploaded(true);
            uploadfiles["review"][0] = picinfo;
            setuploadfiles(uploadfiles);
        }

        setopenPicSelDlg(false);
    }

    const handleRatingClick = (rate) => {
        reviewcomment["user_rating"] = rate;
    }



    return (
        <div >
            {
                reviewcomment["rating_visible"] &&
                <div>
                    <div className='flex justify-end wrap'>
                        <div className=''>
                            Share your rating
                        </div>
                        <div className=''>
                            <RatingComponent handleRatingClick={handleRatingClick} rating={reviewcomment.user_rating} isenable={false} />
                        </div>
                    </div>
                </div>
            }
            <div className='flex wrap'>
                <div className='flex--12'>
                    <TextField
                        value={desc}
                        style={{ textAlign: 'left' }}
                        placeholder="Share your receipe in not more than 500 characters"
                        fullWidth
                        multiline
                        sx={{
                            // "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                            '& fieldset': { borderRadius: 5 }
                        }}
                        onChange={handletxtChanged}
                        InputProps={{ sx: { height: 120 } }}
                        rows={4}
                        variant="outlined" />
                </div>
            </div>
            <div className="flex justify-between padoff">
                <div>
                    {
                        (reviewcomment["rating_visible"]) && (
                            <div className='flex wrap justify-end align-items-center'>
                                <div>
                                    <button onClick={(evt) => { callback({ref:"close_edit_review"}) }} className="anchor-outline rounded ao-lightgrey-black font-bold">
                                        <span className="flex text-center grow">
                                            <span><span className="pad padxc">Close</span></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <div className='flex wrap justify-end align-items-center'>
                        <div className=''>
                            <button onClick={handleUploadfile} className="anchor-outline rounded ao-grey-skin font-bold">
                                <span className="flex text-center grow">
                                    <span>
                                        <i className={['fa5', (isuploaded ? "fa5-download" : "fa5-upload")].join(" ")}></i>
                                    </span>
                                </span>
                            </button>
                        </div>
                        <div>
                            <button onClick={(evt) => handlConfirmationDlg(evt)} className="anchor-outline rounded ao-fill-theme font-bold">
                                <span className="flex text-center grow">
                                    <span><span className="pad padxd">Post</span></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                (confirmDlgInfo.showConfirmationDlg) &&
                <ConfirmationDialog isopenDialog={confirmDlgInfo.showConfirmationDlg}
                    confirmMsg={confirmDlgInfo.confirmationMessage}
                    handleConfirmationState={handlePostReviewConfirmation}
                    menuOptions={confirmDlgInfo.menuOptions} />

            }
            {
                (openPicSelDlg) &&
                <ProfilepicSelectionComponent
                    opendialog={openPicSelDlg}
                    profilepicInfo={uploadfiles["review"][0]}
                    handleProfilePicChange={handleProfilePicChange}
                    showcropIcons={false}
                    removePicState={isuploaded} />
            }
        </div>
    )
}

export default ReviewPostComponent