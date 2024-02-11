
import { Box } from "@mui/material";
import "./ProfileComponentThird.css";
import { useState } from "react";
import FileUploadComponent from "../childComponents/FileUploadComponent";
import AboutMyselfComponent from "../childComponents/AboutMyselfComponent";

const ProfileComponentThird = (props) => {

    const [uploadfiles, setuploadfiles] = useState({
        "certificate": [undefined, undefined, undefined],
        "product_seller": [undefined, undefined, undefined]
    });

    const [description, setdescription] = useState("");

    const certificatedata = [
        { id: 0, text: 'certificate' },
        { id: 1, text: 'certificate' },
        { id: 2, text: 'certificate' },
    ];

    const productsdata = [
        { id: 3, text: 'product_seller' },
        { id: 4, text: 'product_seller' },
        { id: 5, text: 'product_seller' },
    ]

    const handleuploadfile = (file, filetype, fileindex) => {
        uploadfiles[filetype][fileindex] = file;
        setuploadfiles(uploadfiles);
    }

    const handleremovefile = (fileIndex, filetype) => {
        delete uploadfiles[filetype][fileIndex];
        setuploadfiles(uploadfiles);
    }

    ///<summary>
    // set description 
    ///</summary>
    const handletxtChanged = (evt) => {
        setdescription(evt.target.value);
    }

    const handleCompleteClick = (evt) => {

        const user_info = {
            "user_description": description
        }

        props.handleCompleteClick(user_info, uploadfiles);
    }

    return (
        <div className="">
            <div className="desk-col">
                <div className="flex wrap justify-center flex-container">
                    <div className="flex--12">
                        <AboutMyselfComponent height={'90px'}
                            document_desc=""
                            handletxtChanged={handletxtChanged}
                            placeholdertext="About Myself Not more than (500 characters)" />
                    </div>
                </div>
                <div className="flex wrap justify-center flex-container">
                    <div className="flex--12">
                        <label className="form-label text-center">
                            My Certification
                        </label>
                        <div className="flex flex-container wrap align-items-center justify-center">
                            {
                                certificatedata.map((item, index) => {
                                    return (
                                        <div>
                                            <FileUploadComponent key={item.id} filetype={item.text} fileindex={index}
                                                uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="pad padt1 bg grey-skin"></div>
                    </div>

                    <div className="flex--12">
                        <label className="form-label text-center">
                            My Products
                        </label>
                        <div className="flex flex-container wrap align-items-center justify-center">
                            {
                                productsdata.map((item, index) => {
                                    return (
                                        <div>
                                            <FileUploadComponent key={item.id} filetype={item.text} fileindex={index}
                                                uploadfile={handleuploadfile} removefile={handleremovefile} keyItem={item.id} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="pad padt1 bg grey-skin"></div>
                    </div>

                    <div className="flex--12 text-center">
                        <div className="pad padyd">
                            <button onClick={handleCompleteClick} className="anchor-outline rounded ao-fill-theme font-bold">
                                <span className="flex text-center grow">
                                    <span><span className="pad padxd">Complete Profile</span></span>
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default ProfileComponentThird;