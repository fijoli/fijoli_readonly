

import { IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useDispatch, useSelector } from 'react-redux';
import postCommentAction from '../actions/postCommentAction';
import { useEffect } from 'react';
import resetStatus from '../actions/resetStatus';
import { useNavigate } from 'react-router-dom';
import EnumPostCommentType from '../singletonControllers/PostReviewTypes';
import getpostCommentAction from '../actions/getpostCommentAction';
import "./PostCommentComponent.css";

const PostCommentComponent = ({ postcomment, posttype, title }) => {

  const iconStyle = { fontSize: '45px' };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postcmtdesc, setpostcmtdesc] = useState("");
  // const loggedInUser      = useSelector((state)=> state.storeComponent.configData.profileData);
  const postcommentState = useSelector((state) => state.storeComponent.postcommentState);

  useEffect(() => {
    switch (posttype) {
      case EnumPostCommentType.newPost:
      case EnumPostCommentType.editMainPost:
      case EnumPostCommentType.editReplyPost:
        setpostcmtdesc(postcomment["comment_desc"]);
        break;
      case EnumPostCommentType.replyMainPost:
      case EnumPostCommentType.replyReplyPost:
        setpostcmtdesc("");
        break;
    }
  }, []);

  useEffect(() => {
    if ((postcommentState) && (200 === postcommentState.status)) {
      dispatch(getpostCommentAction(postcomment.post_id, postcomment.comment_user_id));
    } else if ((postcommentState) && (400 === postcommentState.status)) {
      dispatch(resetStatus());
      navigate("/error");
    }
  }, [postcommentState]);

  const handletxtdescChanged = (evt) => {
    setpostcmtdesc(evt.target.value);
    postcomment["comment_desc"] = evt.target.value;
  }

  const handlepostingpostcomment = () => {
    // postcomment["comment_user_id"] = loggedInUser.user_id;
    dispatch(postCommentAction(postcomment, posttype));
    setpostcmtdesc("");
  }

  return (
    <div className='flex grow wrap ypad-' >
      <div>
        <label className="form-label">{title || "Post a Comment"}</label>
        <TextField type="text" fullWidth variant="outlined"
          name="document_desc" multiline rows={2}
          value={postcmtdesc}
          placeholder="Add comment"
          sx={{
            // "& .MuiOutlinedInput-notchedOutline": { border: "none" }
            '& fieldset': { borderRadius: 5 },
          }}
          onChange={handletxtdescChanged}
          InputProps={{ sx: { height: 120, alignContent: "center" } }} />
      </div>
      <div className="flex--12">
        <div className="flex justify-end ypad-">
          <div className="">
            <button className="anchor-outline rounded ao-grey-black-theme" onClick={()=>{}} >
              <span className="flex justify-center align-items-center">
                <span>
                  Cancel
                </span>
              </span>
            </button>
          </div>
          <div>
            <button onClick={handlepostingpostcomment} className="anchor-outline rounded ao-fill-theme font-bold">
              <span className="flex justify-between pad padxc grow">
                <span>Post</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCommentComponent