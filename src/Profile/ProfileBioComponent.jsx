

import { useSelect } from '@mui/base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ProfileCertificationComponent from './ProfileCertificationComponent';
import { useEffect } from 'react';
import certificateAction from '../actions/certificationAction';

//components which displays about BIO info of an user
const ProfileBioComponent = ({ userinfo }) => {

    const dispatch = useDispatch();

    //holds the lst of certificates which are uploaded of an user
    const lstofCertificates = useSelector((state) => state.storeComponent.lstCertificates);

    //useeffect which fetches list of certifications of given user
    useEffect(() => {
        dispatch(certificateAction({ "whatsapp_number": userinfo.whatsapp_number }));
    }, [])

    return (
        <div className='flex wrap'>
            <div className='flex--12'>
                <h6 className="lead h6 nomargi flex justify-between align-items-center">
                    <span className='opacity75 font-semibold'>About My Self</span>
                    <span>
                        <button onClick={() => { }} className={["anchor-outline rounded pad padxc ao-grey-skin"].join(" ")}>
                            <span className="flex align-items-center justify-between">
                                <span>
                                    <i className="fa5 fa5-pencil"></i>
                                </span>
                            </span>
                        </button>
                    </span>
                </h6>
                <div className="divider nospace dashed"></div>
                <div className="flex">
                    <div>{userinfo.user_description}</div>
                </div>
            </div>

            <div className='flex--12'>
                <h6 className="lead h6 nomargi flex justify-between align-items-center">
                    <span className='opacity75 font-semibold'>Languages I Speak</span>
                    <span>
                        <button onClick={() => { }} className={["anchor-outline rounded pad padxc ao-grey-skin"].join(" ")}>
                            <span className="flex align-items-center justify-between">
                                <span>
                                    <i className="fa5 fa5-pencil"></i>
                                </span>
                            </span>
                        </button>
                    </span>
                </h6>
                <div className="divider nospace dashed"></div>
                <div className="flex">
                    <div>{userinfo.languages_known}</div>
                </div>
            </div>

            <div className='flex--12'>
                <h6 className="lead h6 nomargi flex justify-between align-items-center">
                    <span className='opacity75 font-semibold'>My Certifications</span>
                    <span>
                        <button onClick={() => { }} className={["anchor-outline rounded pad padxc ao-grey-skin"].join(" ")}>
                            <span className="flex align-items-center justify-between">
                                <span>
                                    <i className="fa5 fa5-pencil"></i>
                                </span>
                            </span>
                        </button>
                    </span>
                </h6>
                <div className="divider nospace dashed"></div>
                <div className="flex">
                    {
                        (lstofCertificates||[]).map((item, index) => {
                            return <ProfileCertificationComponent key={index} item={item} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileBioComponent