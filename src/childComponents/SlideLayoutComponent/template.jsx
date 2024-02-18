import React, { useEffect, useState } from 'react'
import image1 from "../../asset/img1.jpg";
import image2 from "../../asset/img2.jpg";
import image3 from "../../asset/img3.jpg";
import image4 from "../../asset/img4.jpg";
import image5 from "../../asset/img5.jpg";

export const ListOfImages = [
    {
        "src": image1,
        "alt": "image 1 for caurosel",
        "msg": ["CONNECT WITH FITNESS", "PROFESSIONALS & ENTHUSIASTS", "ACROSS THE GLOBE"]
    },
    {
        "src": image2,
        "alt": "image 2 for caurosel",
        "msg": ["GET FITNESS TIPS", " ", " "]
    },
    {
        "src": image3,
        "alt": "image 3 for caurosel",
        "msg": ["TRY NEW FIT RECIPES", " ", " "]
    },
    {
        "src": image4,
        "alt": "image 4 for caurosel",
        "msg": ["TRANSFORM YOURSELF", " ", " "]
    },
    {
        "src": image5,
        "alt": "image 5 for caurosel",
        "msg": ["BUY | SELL", "FITNESS PRODUCTS AND", "AVAIL SERVICES"]
    }
];
export function SlideLayoutTemplate(prop) {
    let {slide_context} = prop;
    const [lstofImages] = useState(ListOfImages);
    const [slide, setslide] = useState(0);

    const handleIndicator = (index) => {
        setslide(index);
    }

    useEffect(() => {
        setslide(0);       
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            let slideVal = (slide === (lstofImages.length - 1)) ? 0 : slide + 1;
            setslide(slideVal);
        }, 5000);
        return () => clearInterval(interval);
    }, [slide])

    return (
        <>
            <div className="flex padoff align-items-stretch justify-center wrap hinherit ypad-off slide-container">
                <div className="desk-col slide-picture relative transition">
                    <div className="abs trbl slide-change slide-b-radius oh bg grey-skin transition">
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
                <div className="desk-col slide-card">
                    {
                        ({undefined:false,1:true,0:false}[slide_context]) && (
                            <div className="flex justify-center">
                                <div className="flex--5 md--6 sm--12 ">
                                    <div className="flex justify-center text-center">
                                        <div className="flex--12 sm--8 xsm--12">
                                            <div className="slide-change slide-active-onoff slide-context">
                                                {
                                                    lstofImages.map((item, idx) => {
                                                        return (
                                                            <div key={idx} className={["slide-item transition ease s2", ((idx == slide) ? "slide-img-on" : "")].join(" ")}>
                                                                <h5 className='lead h5 nomargi pad padyb'>{item.msg.join("\n")}</h5>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="flex justify-center">
                                                <div>
                                                    <div className="slide-bullet">
                                                        <span className="flex justify-center align-items-center">
                                                            {lstofImages.map((_, idx) => {
                                                                return <React.Fragment key={idx}>
                                                                    <div className="relative">
                                                                        <a href={null} onClick={() => handleIndicator(idx)} className={["circle", (slide === idx ? "bullet-item active" : "bullet-item")].join(" ")}></a>
                                                                    </div>
                                                                </React.Fragment>
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="pad padyd">
                        {
                            prop.children.component(prop)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}