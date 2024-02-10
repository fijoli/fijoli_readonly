
import React from 'react'
import {Box, TextField} from "@mui/material";

///<summary>
//component which is used to update description of 
//user in profile registration
///</summary>
const AboutMyselfComponent =({height, document_desc, handletxtChanged, placeholdertext}) => {

    
    const handletxtdescChanged = (evt) =>{
        handletxtChanged(evt);
    }

  return (
    <div>
        <TextField type="text" fullWidth variant="outlined" className='form-control nohover'
            name = "document_desc"
            value = {document_desc}
            multiline
            placeholder={placeholdertext}
            sx={{
                // "& .MuiOutlinedInput-notchedOutline": { border_radius: 30 }
                '& fieldset': { borderRadius: 5 },
                }}
            onChange = {handletxtdescChanged} rows={4}
            InputProps={{ sx: { height: 100 }}}/>
    </div>
  )
}

export default AboutMyselfComponent