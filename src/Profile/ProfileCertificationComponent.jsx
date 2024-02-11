

import React from 'react'

import "./ProfileCertificationComponent.css";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useEffect } from 'react';
import { useState } from 'react';

const ProfileCertificationComponent =({item}) =>{

    const [doc_desc, setdoc_desc] = useState("");

    useEffect(()=>{
        setdoc_desc(item.document_desc);
    },[item])

  return (
    <div className="flex align-items-center">
        <div className='icon-sized-xsm'>
            <label className='bg grey-skin circle block nolh relative' >
                <img src="./base/1x1.png" alt="DocIcon" className='w' />
                <span className="abs trbl flex align-items-center justify-center">
                    <span>
                        <PictureAsPdfIcon />
                    </span>
                </span>
            </label>
        </div>
        <div>
            <p> {doc_desc} </p>
        </div>
    </div>
  )
}

export default ProfileCertificationComponent