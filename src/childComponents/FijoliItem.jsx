

import { IconButton } from '@mui/material'
import React from 'react'
import "./FijoliItem.css"

const FijoliItem = ({imgsrc, postitem, handleDisplayPost}) =>{
  return (
    <div>
            <IconButton onClick={()=>handleDisplayPost(postitem)}>
                <img src={imgsrc} className="post_icon fijoli_skeleton" 
                        alt="uploadfiles..."/>
            </IconButton>
    </div>
  )
}

export default FijoliItem