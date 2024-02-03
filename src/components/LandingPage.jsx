
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
        <div className="flex padoff align-items-stretch justify-center wrap hinherit ypad-off slide-container">
            <div className="flex--8 xsm--12 slide-picture relative transition">
                <div className="abs trbl slide-change slide-b-radius oh bg grey-skin">
                    {
                        lstofImages.map((item, idx) => {
                            return (
                                <div key={idx} className={["abs trbl slide-item transition ease", ((idx == slide) ? "slide-img-on" : "")].join(" ")}>
                                    <span className="abs trbl bg-cover bg-center" style={{ "backgroundImage": "url(" + item.src + ")" }}></span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex wrap align-items-stretch relative justify-center h">
                    <div className="">
                        <div className="flex justify-center">
                            <div>
                                <div className="slide-bullet">
                                    <span className="flex justify-center align-items-center">
                                        {lstofImages.map((_, idx) => {
                                            return <React.Fragment key={idx}>
                                                <div className="relative">
                                                    <a href={null} onClick={() => handleIndicator(idx)} className={["circle",(slide === idx ? "bullet-item active" : "bullet-item")].join(" ")}></a>
                                                </div>
                                            </React.Fragment>
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex--12">
                        <div className="flex align-items-center h justify-center">
                            <div>
                                <h1 className='brand-h1'>Fijoli</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex--12 slide-card">
                <div className="desktop flex justify-center">
                    <div className="flex--5 md--6 sm--12 ">
                        <div className="flex justify-center text-center">
                            <div className="flex--12 sm--8 xsm--12">
                                <div className="slide-change slide-active-onoff slide-context">
                                    {
                                        lstofImages.map((item, idx) => {
                                            return (
                                                <div key={idx} className={["slide-item transition ease s2", ((idx == slide) ? "slide-img-on" : "")].join(" ")}>
                                                    <h5 className='lead h6 nomargi pad padyb line-space-h6'>{item.msg.join("\n")}</h5>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="pad padtd">
                            <div className='flex padoff justify-center'>
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
                                            <span><span className="pad padxd">SignUp</span></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pad padyc"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
