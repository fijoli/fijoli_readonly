
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

import image1 from "./../asset/img1.jpg";
import image2 from "./../asset/img2.jpg";
import image3 from "./../asset/img3.jpg";
import image4 from "./../asset/img4.jpg";
import image5 from "./../asset/img5.jpg";
import scurve from "./../asset/sCurve.png";


export const LandingPage = () => {

    const navigate = useNavigate();

    const [slide, setslide] = useState(0);

    const [lstofImages] = useState([
        {
            "src": image1,
            "scurve": scurve,
            "alt": "image 1 for caurosel",
            "msg": ["CONNECT WITH FITNESS", "PROFESSIONALS & ENTHUSIASTS", "ACROSS THE GLOBE"]
        },
        {
            "src": image2,
            "scurve": scurve,
            "alt": "image 2 for caurosel",
            "msg": ["GET FITNESS TIPS", " ", " "]
        },
        {
            "src": image3,
            "scurve": scurve,
            "alt": "image 3 for caurosel",
            "msg": ["TRY NEW FIT RECIPES", " ", " "]
        },
        {
            "src": image4,
            "scurve": scurve,
            "alt": "image 4 for caurosel",
            "msg": ["TRANSFORM YOURSELF", " ", " "]
        },
        {
            "src": image5,
            "scurve": scurve,
            "alt": "image 5 for caurosel",
            "msg": ["BUY | SELL", "FITNESS PRODUCTS AND", "AVAIL SERVICES"]
        }
    ]);

    useEffect(() => {
        setslide(0);
        // if ("geolocation" in navigator) {
        //     navigator.geolocation.getCurrentPosition(
        //       (position) => {
        //         const latitude = position.coords.latitude;
        //         const longitude = position.coords.longitude;
        //         // this.setState({ latitude, longitude });
        //         console.log(latitude);
        //         console.log(longitude);
        //       },
        //       (error) => {
        //         console.error("Error getting geolocation:", error);
        //       }
        //     );
        //   }        
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            let slideVal = (slide === (lstofImages.length - 1)) ? 0 : slide + 1;
            setslide(slideVal);
        }, 5000);
        return () => clearInterval(interval);
    }, [slide])


    const handleloginbtnClick = (evt) => {
        navigate("/login");
    }

    const handlesignUpbtnClick = (evt) => {
        navigate("/signupform1");
    }

    const handleIndicator = (index) => {
        setslide(index);
    }

    return (
        <div className='hinherit relative'>
            <div className="abs trbl slide-change fixed">
                {
                    lstofImages.map((item, idx) => {
                        return (
                            <div key={idx} className={["abs trbl slide-item transition ease",((idx==slide)?"slide-img-on":"")].join(" ")}>
                                <span className="abs trbl bg-cover bg-center" style={{ "backgroundImage": "url(" + item.src + ")" }}></span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="image-container-lp relative hinherit zindexfront">
                <div className="desktop flex padoff align-items-stretch justify-center zindexfront relative wrap hinherit ypad-off">
                    <div className="flex--5 md--6 sm--8 xsm--12 relative">
                        <div className="relative zindexfront h">
                            <div className="flex flex-container align-items-end justify-center hinherit padoff">
                                <div className="flex--12">
                                    <div className="scruve"></div>
                                    <div className="scruve-content">
                                        <div className="relative">
                                            <div className="flex justify-center pad padyf text-center">
                                                <div className="flex--8 sm--12">
                                                    <h5 className='lead h7 nomargi pad padyb line-space-h6'>{lstofImages[slide].msg}</h5>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className='flex padoff justify-center'>
                                                    <div>
                                                        <button onClick={handleloginbtnClick} className="anchor-outline rounded ao-theme ao-fill-theme">
                                                            <span className="flex text-center grow">
                                                                <span><span className="pad padxd">Login</span></span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <div className="line-lp"></div>
                                                    </div>
                                                    <div>
                                                        <button onClick={handlesignUpbtnClick} className="anchor-outline rounded ao-theme ao-fill-theme">
                                                            <span className="flex text-center grow">
                                                                <span><span className="pad padxd">SignUp</span></span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pad padyf"></div>
                                            <div className="relative">
                                                <span className='flex justify-center'>
                                                    {lstofImages.map((_, idx) => {
                                                        return <React.Fragment key={idx}>
                                                            <div>
                                                                <button onClick={() => handleIndicator(idx)} className={[(slide === idx ? "indicator-lp" : "indicator-lp indicator-inactive-lp"),"cursor-pointer"].join(" ")} />
                                                            </div>
                                                        </React.Fragment>
                                                    })}
                                                </span>
                                            </div>
                                            <div className="pad padyc"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
