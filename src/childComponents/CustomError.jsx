import React from 'react'
import justfit from "./../asset/justfit.jpg";
import errorimage from './../asset/error.png';
import "./CustomError.css";

export const ErrorComponent = () => {
  return (
    <div className="flex padoff align-items-stretch justify-center wrap hinherit ypad-off slide-container">
      <div className="desk-col slide-picture  relative transition">
        <div className="abs trbl slide-change slide-b-radius oh bg grey-skin transition">
          <div className={["abs trbl slide-item transition ease slide-img-on"].join(" ")}>
            <span className="abs trbl bg-cover bg-center" style={{ "backgroundImage": "url(" + justfit + ")" }}></span>
          </div>
        </div>
        <div className="flex wrap align-items-stretch relative justify-center h">
          <div className="flex--12">
            <div className="pad padd">
              <a href={null} className="anchor-outline ao-black-theme inlineblock circle nolh"  >
                <span className="flex justify-center align-items-center h text-center">
                  <span><i className="pad padx1 fa5 fa5-arrow-left"></i></span>
                </span>
              </a>
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
        <div className="desk-col">
          <div className="pad padyf text-center">
            <h5 className="lead h5">Oops... Something went wrong</h5>
          </div>
        </div>
      </div>
    </div>
  )
}