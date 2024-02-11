import React from 'react'

import { useState } from 'react';
import PostCommentsController from '../Controllers/PostCommentsController';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import PostCommentComponent from './PostCommentComponent';
import EnumPostCommentType from '../singletonControllers/PostReviewTypes';
import postCommentAction from '../actions/postCommentAction';
import EnumPostCommentLikeDisliketype from './models/EnumPostCommentLikeDisliketype';
import replypostcommentlikedislikeAction from './Actions/replypostcommentlikedislikeAction';
import { CircleImageTemplate, LikeIconTemplate, PostUserCallBlock } from '../helper/component_block';


const ViewReplyPostCommentComponent = ({ post_id, comment_id, replycomment_id }) => {

    // console.log("postcomment " + postcomment.post_id);
    const dispatch = useDispatch();
    const [userpicinfo, setuserpicinfo] = useState();
    const postcomment = useSelector((state) => {
        return state.storeComponent.lstofPosts[post_id].comments[comment_id].subcomments[replycomment_id];
    });


    //reply comment objects 
    const [posttype, setposttype] = useState(EnumPostCommentType.none);
    useEffect(() => {
        setposttype(EnumPostCommentType.none);
        let picpath = process.env.REACT_APP_S3_URL + postcomment["whatsapp_number"] + "/profilepic/" + postcomment["whatsapp_number"] + "_profilepic_";
        setuserpicinfo(picpath);
    }, [postcomment]);

    const [updatedpostcomment, setupdatedpostcomment] = useState("");

    //handle comment sub operations / state operations
    const handleCommentState = (eventType) => {
        switch (eventType) {

            case EnumPostCommentType.replyReplyPost:
                setupdatedpostcomment(PostCommentsController.getRepliesReplyPostComment(postcomment));
                setposttype(EnumPostCommentType.replyReplyPost);
                break;

            case EnumPostCommentLikeDisliketype.like:
                let postcommentlikeState = PostCommentsController.getpostReplyCommentlikeORdislikeState(postcomment, 1);
                console.log(postcommentlikeState);
                dispatch(replypostcommentlikedislikeAction(postcommentlikeState));

                break;

            case EnumPostCommentLikeDisliketype.dislike:
                let postcommentdislikeState = PostCommentsController.getpostReplyCommentlikeORdislikeState(postcomment, 0);
                console.log(postcommentdislikeState);
                dispatch(replypostcommentlikedislikeAction(postcommentdislikeState));

                break;
        }
    }

    //event which sets the operation type as edit/delete
    //perform the selected operation
    const handlesubCURDOperation = (eventType) => {

        //executes event 
        switch (eventType) {
            case EnumPostCommentType.editReplyPost:
                setposttype(EnumPostCommentType.editReplyPost);
                setupdatedpostcomment(PostCommentsController.getEditRelyPostComment(postcomment));
                break;

            case EnumPostCommentType.deleteReplyPost:
                // setposttype(EnumPostCommentType.deleteReplyPost);
                dispatch(postCommentAction(PostCommentsController.getDeleteReplyPostComment(postcomment), EnumPostCommentType.deleteReplyPost));
                break;
        }
    }


    return (
        <div>
            {
                ((EnumPostCommentType.none === posttype) ||
                    (EnumPostCommentType.replyReplyPost === posttype)) &&
                <>
                    <div className="flex grow wrap xpad-off">
                        <div className="icon-sized-xs">
                            <CircleImageTemplate image={userpicinfo} wrapperclass={"circle oh nolh bg grey-skin"} />
                        </div>
                        <div className="">
                            <div className="pad padxd">
                                <p className='lead h7 marg margbc'>{postcomment.comment_desc}</p>
                                <label className="block italic opacity65">
                                    <span className=''>{postcomment.user_name}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex grow wrap padoff">
                        <div className="icon-sized-xsm visible-from-xsm"></div>
                        <div className="">
                            <div className="flex wrap justify-between align-items-center padoff marg margtd margld">
                                <div className="">
                                    <LikeIconTemplate blockdata={postcomment} onlike={() => handleCommentState(EnumPostCommentLikeDisliketype.like)} ondislike={() => handleCommentState(EnumPostCommentLikeDisliketype.dislike)} />
                                </div>
                                <div>
                                    <PostUserCallBlock blockdata={postcomment} onreply={() => handleCommentState(EnumPostCommentType.replyReplyPost)} onedit={() => handlesubCURDOperation(EnumPostCommentType.editReplyPost)} ondelete={() => handlesubCURDOperation(EnumPostCommentType.deleteReplyPost)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider nospace marg margyc"></div>
                    <>
                        {
                            (EnumPostCommentType.replyReplyPost === posttype) &&
                            <PostCommentComponent title={"Reply Comment"} postcomment={updatedpostcomment} posttype={posttype} />
                        }
                    </>
                </>
            }
            {
                (EnumPostCommentType.editReplyPost === posttype) &&
                <>
                    <PostCommentComponent title={"Edit Comment"} postcomment={updatedpostcomment} posttype={posttype} />
                </>
            }
        </div>
    )
}

export default ViewReplyPostCommentComponent