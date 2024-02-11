import React from 'react'
import "./ViewPostCommentComponent.css";

import { useState } from 'react';
import PostCommentsController from '../Controllers/PostCommentsController';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import ReplyPostCommentContainer from './ReplyPostCommentContainer';
import PostCommentComponent from './PostCommentComponent';

import EnumPostCommentType from '../singletonControllers/PostReviewTypes';
import postCommentAction from '../actions/postCommentAction';
import EnumPostCommentLikeDisliketype from './models/EnumPostCommentLikeDisliketype';
import postcommentlikedislikeAction from './Actions/postcommentlikedislikeAction';
import { CircleImageTemplate, LikeIconTemplate, PostUserCallBlock } from '../helper/component_block';

const ViewPostCommentComponent = ({ post_id, comment_id }) => {

    const dispatch = useDispatch();
    // const navigate      = useNavigate();
    console.log("post comment component ==>" + comment_id);
    const [userpicinfo, setuserpicinfo] = useState();
    const postcomment = useSelector((state) => {
        return state.storeComponent.lstofPosts[post_id.toString()].comments[comment_id];
    });
    const [posttype, setposttype] = useState(EnumPostCommentType.none);

    useEffect(() => {
        setposttype(EnumPostCommentType.none);
        let picpath = process.env.REACT_APP_S3_URL + postcomment["whatsapp_number"] + "/profilepic/" + postcomment["whatsapp_number"] + "_profilepic_";
        setuserpicinfo(picpath);
    }, [postcomment]);

    //reply comment objects 
    const [updatedpostcomment, setupdatedpostcomment] = useState("");
    const [isrepliesOpen, setisrepliesOpen] = useState(false);
    const [replyid, setreplyid] = useState("");

    useEffect(() => {
        setreplyid("details" + postcomment.root_reply_id);
    }, []);


    //handle comment sub operations / state operations
    const handleCommentState = (eventType) => {
        switch (eventType) {
            case EnumPostCommentType.replyMainPost:
                handlereplyComponent(false);
                setupdatedpostcomment(PostCommentsController.getReplyPostComment(postcomment));
                setposttype(EnumPostCommentType.replyMainPost);
                break;

            case EnumPostCommentLikeDisliketype.like:
                let postcommentlikeState = PostCommentsController.getpostMainCommentlikeORdislikeState(postcomment, 1);
                console.log(postcommentlikeState);
                dispatch(postcommentlikedislikeAction(postcommentlikeState));
                break;

            case EnumPostCommentLikeDisliketype.dislike:
                let postcommentdislikeState = PostCommentsController.getpostMainCommentlikeORdislikeState(postcomment, 0);
                console.log(postcommentdislikeState);
                dispatch(postcommentlikedislikeAction(postcommentdislikeState));
                break;
        }
    }

    //event which sets the operation type as edit/delete
    //perform the selected operation
    const handlesubCURDOperation = (eventType) => {

        //executes event 
        switch (eventType) {
            case EnumPostCommentType.editMainPost:
                setposttype(EnumPostCommentType.editMainPost);
                setupdatedpostcomment(PostCommentsController.getEditPostComment(postcomment));
                break;

            case EnumPostCommentType.deleteMainPost:
                dispatch(postCommentAction(PostCommentsController.getDeleteMainPostComment(postcomment), EnumPostCommentType.deleteMainPost));
                break;
        }
    }

    //
    const handlereplyComponent = (state) => {
        let detailsctrl = document.getElementById(replyid);
        try {
            detailsctrl.open = state;
            setisrepliesOpen(state);
        } catch (error) {
            //do nothing
        }
    }

    return (
        <div>
            {
                ((postcomment) && ((EnumPostCommentType.none === posttype) ||
                    (EnumPostCommentType.replyMainPost === posttype))) &&
                <>
                    <div className="flex grow wrap">
                        <div className="icon-sized-sm">
                            <CircleImageTemplate image={userpicinfo} wrapperclass={"circle oh nolh bg grey-skin"} />
                        </div>
                        <div>
                            <p className='marg margbc'>{postcomment.comment_desc}</p>
                            <label className="block italic opacity65">
                                <span className=''>{postcomment.user_name}</span>
                            </label>
                            <div className="flex flex-container wrap justify-between align-items-center">
                                <div className="">
                                    <LikeIconTemplate blockdata={postcomment} onlike={() => handleCommentState(EnumPostCommentLikeDisliketype.like)} ondislike={()=>handleCommentState(EnumPostCommentLikeDisliketype.dislike)} />
                                </div>
                                <div>
                                    <PostUserCallBlock blockdata={postcomment} onreply={() => handleCommentState(EnumPostCommentType.replyMainPost)} onedit={() => handlesubCURDOperation(EnumPostCommentType.editMainPost)} ondelete={() => handlesubCURDOperation(EnumPostCommentType.deleteMainPost)} />
                                </div>
                            </div>
                        </div>
                        <div className="flex--12">
                            <>
                                {
                                    (EnumPostCommentType.replyMainPost === posttype) &&
                                    <PostCommentComponent title={"Reply Comment"} postcomment={updatedpostcomment} posttype={posttype} />
                                }
                            </> 
                        </div>
                        {
                            (0 < postcomment.count_reply_comments) &&
                            <div className='flex--12' >
                                <details id={replyid}>
                                    <summary className='flex align-items-center padcell'>
                                        <span>
                                            <button className="anchor-outline ao-link-themeblack" onClick={() => handlereplyComponent(!isrepliesOpen)}>
                                                <span className="flex ypad-off align-items-center pad-">
                                                    <span>
                                                        <i className={["lead h9 fa5",(isrepliesOpen?"fa5-chevron-up":"fa5-chevron-down")].join(" ")}></i> 
                                                    </span>
                                                    <span>
                                                        Replies
                                                    </span>
                                                </span>
                                            </button>
                                        </span>
                                        <span>
                                            <span className="inlineblock rounded bg grey-skin pad padc nolh">{postcomment.count_reply_comments}</span>
                                        </span>
                                    </summary>
                                    {
                                        (isrepliesOpen) &&
                                        <ReplyPostCommentContainer post_id={postcomment.post_id} id={postcomment.root_reply_id} logged_in_user_id={postcomment.logged_in_user_id} />
                                    }
                                </details>
                            </div>
                        }
                    </div>
                    <div className="divider"></div>
                </>
            }
            {
                (EnumPostCommentType.editMainPost === posttype) &&
                <>
                    <PostCommentComponent title={"Edit Comment"} postcomment={updatedpostcomment} posttype={posttype} />
                    <div className="divider"></div>
                </>
            }
        </div>
    )
}

export default ViewPostCommentComponent;