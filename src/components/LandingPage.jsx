
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

import { SlideLayoutTemplate } from '../childComponents/SlideLayoutComponent/template';


export const LandingPage = () => {

    const navigate = useNavigate();

    const handleloginbtnClick = (evt) => {
        navigate("/login");
    }

    const handlesignUpbtnClick = (evt) => {
        navigate("/signupform1");
    }

    return (
        <SlideLayoutTemplate {...{ handleloginbtnClick, handlesignUpbtnClick, slide_context : 1 }}>
            {
                {
                    component: () => {
                        return (
                            <>
                                <div className="pad padtd">
                                    <div className='flex padoff align-items-center justify-center'>
                                        <div>
                                            <button onClick={handleloginbtnClick} className="anchor-outline rounded ao-theme ao-fill-theme font-bold">
                                                <span className="flex text-center grow">
                                                    <span><span className="pad padxd">Login</span></span>
                                                </span>
                                            </button>
                                        </div>
                                        <div>
                                            <div className="line-lp"></div>
                                        </div>
                                        <div>
                                            <button onClick={handlesignUpbtnClick} className="anchor-outline rounded ao-theme ao-fill-theme font-bold">
                                                <span className="flex text-center grow">
                                                    <span><span className="pad padxd">Sign Up</span></span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pad padyc"></div>
                            </>
                        )
                    }
                }
            }
        </SlideLayoutTemplate>
    )
}
