

import { Avatar, Backdrop, Dialog, DialogContent, DialogTitle, IconButton, Skeleton, Slide, Snackbar } from '@mui/material';
import React, { useCallback } from 'react'
import { useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import "./SelectedImageDescription.css";
import AboutMyselfComponent from '../childComponents/AboutMyselfComponent';
import { useEffect } from 'react';
import ConfirmationDialog from '../childComponents/ConfirmationDialog';

function TransitionDown(props) {
    return <Slide {...props} direction="up" />;
}

const SelectedImageDescription = ({ opendialog, documentinfo, dlgTitle, emitdocumentInfo }) => {

    const [certificationInfo, setCertificationInfo] = useState({
        "image": null,
        "document_desc": ""
    });

    const [disableState, setdisableState] = useState(false);
    const [setfilename] = useState("");
    const [deleteforeverState, setdelforeverState] = useState(false);
    const [selPicMessage, setselPicMessage] = useState({ "open": false });

    const [transition, setTransition] = useState(undefined);

    const [sbstate] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = sbstate;


    const handleCancelClick = () => {
        emitdocumentInfo(documentinfo);
    }

    const handleOkClick = () => {
        emitdocumentInfo(certificationInfo);
    }

    const handleuploadfile = () => {
        document.getElementById("fileid").click();
    }

    
    const setSelectedFile = useCallback((selectedfile) => {

        if (null == selectedfile) {
            setfilename("");
            certificationInfo.image = null;
            certificationInfo.document_desc = "";
        } else {
            certificationInfo.image = selectedfile;
            setfilename(selectedfile.name);
        }

        setCertificationInfo({ ...certificationInfo });
    },[certificationInfo,setfilename])
    //hook which initializes the useState of certificate
    useEffect(() => {
        if (null !== documentinfo) {
            certificationInfo["document_desc"] = documentinfo.document_desc;
            //call api to set the image to useState
            setSelectedFile(documentinfo.image);
            setdisableState(!disableState);
        }
    }, [documentinfo,certificationInfo,disableState,setSelectedFile]);
    const handlefileChange = (evt) => {
        if (evt.target.files[0].size <= 4000000) {
            setSelectedFile(evt.target.files[0]);
            evt.target.value = null;
            setdisableState(!disableState);
        } else {
            setTransition(() => TransitionDown);
            setselPicMessage({ "open": true, "errMsg": "file size should be lessthan or equal to 4MB" });
        }
    }

    // const handleRemoveCertificate = () => {
    //     setSelectedFile(null);
    //     setdisableState(!disableState);
    // }

    const handletxtChanged = (evt) => {
        certificationInfo[evt.target.name] = evt.target.value;
        setCertificationInfo({ ...certificationInfo });
    }


    const handledeleteForever = (evt) => {
        setdelforeverState(true);
    }

    const handleConfirmationState = (confirmationState) => {
        if (confirmationState) {
            documentinfo = null;
            handleCancelClick();
        }
        setdelforeverState(!deleteforeverState);
    }

    const handlefollowSnackbarClose = () => {
        setselPicMessage({ "open": false, "errMsg": "" });
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handlefollowSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Dialog open={opendialog} PaperProps={{
                style: {
                    // minHeight: '32%', minWidth: "40%", 
                    borderRadius: "10px"
                }
            }}>
                <DialogTitle textAlign="center">{dlgTitle}</DialogTitle>
                <DialogContent>
                    <div className='flex wrap justify-center'>
                        <div className='flex--4'>
                            {
                                ((certificationInfo.image) ? (
                                    <Avatar src="/images/fileuploaded.jpeg" sx={{ width: 92, height: 92 }} />
                                ) : (
                                    <Skeleton variant="circular" animation="wave" width={100} height={100} />
                                ))
                            }
                            <div className='flex justify-center text-center pad padtb pad-'>
                                <div>
                                    <button disabled={disableState} className="anchor-outline rounded ao-grey-black-theme font-bold" onClick={handleuploadfile}>
                                        <span className="flex text-center grow pad-">
                                            <span>
                                                <UploadIcon className='' />
                                            </span>
                                        </span>
                                    </button>
                                </div>
                                <div>
                                    <button disabled={disableState} className="anchor-outline rounded ao-grey-black-theme font-bold" onClick={handledeleteForever} >
                                        <span className="flex text-center grow pad-">
                                            <span>
                                                <DeleteForeverIcon className=''/>
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex--8 flex--12'>
                            <AboutMyselfComponent height="100px"
                                document_desc={certificationInfo.document_desc}
                                handletxtChanged={handletxtChanged}
                                placeholdertext="Write few lines about  your certification (max 500 characters)" />
                        </div>
                    </div>
                    <div className="pad pad1 bg lightgrey opacity25"></div>
                    <div className='flex wrap align-items-center justify-center'>
                        <div>
                            <button className="anchor-outline rounded ao-grey-black-theme" onClick={handleCancelClick} >
                                <span className="flex justify-center align-items-center ypad-">
                                    <span className="icon-xs nomargi">
                                        <CancelIcon style={{ fontSize: "20px" }} />
                                    </span>
                                    <span>
                                        Cancel
                                    </span>
                                </span>
                            </button>
                        </div>
                        <div>
                            <button className="anchor-outline rounded ao-fill-theme" onClick={handleOkClick} >
                                <span className="flex justify-center align-items-center ypad-">
                                    <span className="icon-xs nomargi">
                                        <HowToRegIcon style={{ fontSize: "20px" }} />
                                    </span>
                                    <span>
                                        Ok
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {
                deleteforeverState &&
                <ConfirmationDialog isopenDialog={deleteforeverState}
                    confirmMsg="Are you sure, you want to delete?"
                    handleConfirmationState={handleConfirmationState}
                    menuOptions={["Cancel", "OK"]}
                />
            }
            <input type="file" style={{ display: "none" }} accept=".pdf"
                onChange={(evt) => handlefileChange(evt)} id="fileid" />
            {
                <>
                    <Snackbar
                        open={selPicMessage.open}
                        TransitionComponent={transition}
                        message={selPicMessage.errMsg}
                        action={action}
                        autoHideDuration={6000}
                        anchorOrigin={{ vertical, horizontal }}
                        key={transition ? transition.name : ''}
                    />

                    <Backdrop
                        sx={{ color: '#FFFFFF', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={selPicMessage.open}>
                    </Backdrop>
                </>
            }

        </div>
    )
}

export default SelectedImageDescription