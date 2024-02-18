import React from 'react'
import successimage from './../asset/success.png'
import "./SuccessComponent.css";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { SlideLayoutTemplate } from './SlideLayoutComponent/template';

export const SuccessComponent = () => {

  const registrationState = useSelector((state) => state.storeComponent.registrationState);
  // const navigatelink = process.env.REACT_APP_FIJOLI_URL + "signupform2?whatsapp_number=" + registrationState.whatsapp_number;
  const navigatelink = window.location.origin + "/signupform2?whatsapp_number=" + registrationState.whatsapp_number;

  return (
    <SlideLayoutTemplate {...{}}>
      {
        {
          component: () => {
            return (
              <>
                <div className="flex justify-center relative wrap">
                  <div className="">
                    <div className="text-center">
                      <h2 className='lead h5 color color-theme'>Hi, Welcome to Fijoli</h2>
                      <p className=''>
                        You have successfully registered with Fijoli.
                      </p>
                      <p className='opacity75'>
                        Click on the confirmation link shared in Whatsapp to complete the sign up
                      </p>
                      <p class="pad padtf">
                        <Link to={navigatelink} className="inlineblock anchor-outline rounded ao-fill-theme font-bold">
                          <span className="flex text-center grow">
                              <span><span className="pad padxd">Let's Start</span></span>
                          </span>
                        </Link>
                      </p>
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
