
import {Box, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./ProfileComponentThird.css";
import { useNavigate } from "react-router-dom";
import uploadicon from "./../asset/uploadIcon.jpg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentThird = (props) =>{

    const [uploadfiles, setuploadfiles]     = useState({
        "certificate"       : [undefined, undefined, undefined], 
        "product_seller"    : [undefined, undefined, undefined]
    });

    const [description, setdescription]     = useState("");
    const [validState, setvalidState]        = useState({"desc_status":false, "cert_status":false, "products_status": false});

    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    const productsdata =[
        { id: 3, text: 'product_seller' },
        { id: 4, text: 'product_seller' },
        { id: 5, text: 'product_seller' },
    ]

    const handleuploadfile = (file, filetype, fileindex) =>{
        uploadfiles[filetype][fileindex] = file;
        setuploadfiles(uploadfiles);
        switch(filetype){
            case "certificate":
                setvalidState({...validState, cert_status:false});
                break;
            case "product_seller":
                setvalidState({...validState, products_status:false});
                break;
        }

    }

    const handleremovefile = (fileIndex, filetype) =>{
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    ///<summary>
    // set description 
    ///</summary>
    const handletxtChanged = (evt) =>{
        setdescription(evt.target.value);
        setvalidState({...validState, desc_status:false});
    }

    const handleCompleteClick = (evt) =>{
        if(!IsValid()){
            const user_info = {
                "user_description"  : description
            }
            // props.handleCompleteClick(user_info, uploadfiles);
        }
    }

    function IsValid(){
        let isStateValid = validState;
        if(description === ""){
            isStateValid.desc_status = true;
        }else if(uploadfiles.certificate.filter(item => item !== undefined).length === 0){
            isStateValid.cert_status = true;
        }else if(uploadfiles.product_seller.filter(item => item!== undefined).length === 0){
            isStateValid.products_status = true;
        }
        setvalidState({...isStateValid});

        return (isStateValid.desc_status || isStateValid.cert_status || isStateValid.products_status);

    }

    return(
        <div className="signupformFinal-container-pct">
            <table className="table_container-pct">
                <tr>
                    <td>
                        {/* <Box
                            sx={{ boxShadow: 4, height: '90px',
                                    p: 1, m: 1, borderRadius: '15px',
                                }}>
                            <TextField type="text" 
                                    fullWidth
                                    style={{textAlign: 'left'}}
                                    placeholder="                        About Myself Not more than 500 characters" 
                                    variant="outlined"
                                    multiline
                                    sx={{
                                        // '& fieldset': { borderRadius: 1 },
                                        "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                                        }}
                                    onChange = {handletxtChanged}
                                    InputProps={{ sx: { height: 110 }}}       
                                    rows={4}/>
                        </Box> */}
                        <AboutMyselfComponent height={'90px'} 
                            document_desc={description}
                            handletxtChanged={handletxtChanged} 
                            placeholdertext="About Myself Not more than (500 characters)"/>
                            {
                                (validState.desc_status)&&
                                <div className="errmessage_aboutyourself">Please describe about yourself</div>
                            }
                    </td>
                </tr>
                <tr className="table_row_height_pct">
                    <td>
                    <Box
                            sx={{
                                boxShadow: 4,
                                height: '57px',
                                p: 1,
                                m: 1,
                                borderRadius: '15px',
                                textAlign: 'center',
                                margin: '0 auto',
                                width: '350px'
                            }}>
                            My Certification
                            <table className="table_container-certification_pct">
                                <tr>
                                    {
                                        certificatedata.map((item,index)=>{
                                            return(
                                                <td>
                                                    <FileUploadComponent key={item.id} filetype={item.text} fileindex ={index}
                                                        uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id} 
                                                        accesstype = ".jpg, .png, .jpeg, .gif, .bmp, .pdf"/>
                                                </td>                                                
                                            )
                                        })
                                    }
                                </tr>
                            </table>
                            {
                                (validState.cert_status)&&
                                <div className="errmessage_aboutyourself">Please upload atleast 1 certification for your profile credibilityPlease describe about yourself</div>
                            }

                        </Box>

                    </td>
                </tr>

                <tr className="table_row_height_pct">
                    <td>
                        <Box sx={{ boxShadow: 4, width: '350px',
                                    height: '57px', p: 1, m: 1,
                                    borderRadius: '15px', textAlign: 'center',
                                    margin: '0 auto'
                                }}> My Products
                            <table className="table_container-certification_pct">
                                <tr>
                                    {
                                        productsdata.map((item,index)=>{
                                            return(                                                
                                                <td>
                                                    <FileUploadComponent key={item.id} filetype={item.text} fileindex ={index}
                                                        uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id}
                                                        accesstype = ".jpg, .png, .jpeg, .gif, .bmp, .pdf"/>
                                                </td>                                                
                                            )})
                                    }
                                </tr>
                            </table>
                            {
                                (validState.products_status)&&
                                <div className="errmessage_aboutyourself">Please upload atleast 1 product pic for your credibility</div>
                            }

                        </Box>
                    </td>
                </tr>
            </table>

            <>
                <button onClick={handleCompleteClick} 
                        className="button_oval_style_submit_pct">Complete Profile</button>
            </>

        </div>
    );

}

export default ProfileComponentThird;