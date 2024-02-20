

import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RatingComponent from './RatingComponent'

import img2 from "./../asset/img3.jpg";
import "./SubmitterReview.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch } from 'react-redux';
import userreviewType from '../actions/userreviewType';
import deletereviewcomment from '../actions/deletereviewcomment';

//component to display submitter review comment
let g = {};
const SubmitterReview = ({ reviewComment, menuoption }) => {

    //set default objects
    const dispatch = useDispatch();
    const [userid, setuserid] = useState(0);

    //hook which is used to set userid
    useEffect(() => {
        if (reviewComment) {
            setuserid(reviewComment.user_id);
        }
    }, [reviewComment, setuserid]);

    //event which performs edit/delete operations 
    //of the review comment
    const handleClick = (eventtype) => {
        g.user_id = userid
        //initialize the rating visible type
        reviewComment["rating_visible"] = (eventtype === "reply") ? false : true;
        if ("delete" === eventtype) {
            dispatch(deletereviewcomment(reviewComment));
        } else {
            //pass review comment to parent control to post
            //ProfileReviewComponent which posts the review comment 
            reviewComment["mode"] = "edit";
            dispatch(userreviewType(reviewComment));
        }
    }

    return (
        <>
            <div className="flex grow">
                <div className="icon-sized-xsm">
                    <span className="relative oh block circle nolh">
                        <img src="./base/1x1.png" alt="scale" className='w' />
                        <span className="abs trbl bg-cover bg-center" style={{ backgroundImage: ["url(", img2, ")"].join("") }}></span>
                    </span>
                </div>
                <div className="">
                    <span>{reviewComment.user_id}</span>
                    <RatingComponent rating={reviewComment.user_rating} isenable={true} />
                </div>
                <div className="">
                    <div className="flex ypad-off justify-end pad-">
                        {(reviewComment.ismenuvisible) &&
                            (menuoption).map((item, index) => {
                                return (
                                    <React.Fragment>
                                        {(() => {
                                            if (item === "edit") {
                                                return (
                                                    <div className="">
                                                        <IconButton onClick={() => handleClick("edit")}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </div>
                                                );
                                            } else if (item === "delete") {
                                                return (
                                                    <div className="">
                                                        <IconButton onClick={() => handleClick("delete")}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                );
                                            } else if (item === "reply") {
                                                return (
                                                    <div className="">
                                                        <IconButton onClick={() => handleClick("reply")}>
                                                            <ReplyIcon />
                                                        </IconButton>
                                                    </div>
                                                );
                                            }
                                        })()
                                        }
                                    </React.Fragment>
                                )
                            })}
                    </div>
                </div>
            </div>
            <div className="flex grow">
                <div className="icon-sized-xsm visible-from-xsm"></div>
                <div className="lead h8">
                    <span>{reviewComment.review_desc}</span>
                </div>
            </div>
        </>
    )
}

export default SubmitterReview