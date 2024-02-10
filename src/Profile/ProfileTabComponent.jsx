

import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import resetStatus from '../actions/resetStatus';
import ProfileBioComponent from './ProfileBioComponent';
import ProfilepostCatetoryComponent from './ProfilepostCatetoryComponent';
import ProfileReviewComponent from './ProfileReviewComponent';
import "./ProfileTabComponent.css";

//component which displays about user (BIO, REVIEWS, MY POSTS)
const ProfileTabComponent = ({ userinfo }) => {

  //set to default tab index
  const dispatch = useDispatch();
  const [tabindex, settabindex] = useState(2);

  //set selected tab index 
  const handleselectTabIndex = (selectedTabIndex) => {
    // if(tabindex !== selectedTabIndex){
    dispatch(resetStatus());
    settabindex(selectedTabIndex);
    // }
  }

  useEffect(() => {
    if (userinfo) {
      settabindex(2);
    }
  }, [userinfo]);
  const tabitems = [
    { label: "Bio" },
    { label: "Reviews" },
    { label: "My Posts" },
  ];

  return (
    <div className='pad padyf'>
      <div className="flex justify-center align-items-center ypad-off">
        {
          tabitems.map((item, i) => {
            return (
              <div className="text-center">
                <button onClick={(e) => handleselectTabIndex(i)} className={["anchor-outline", (tabindex==i)?"ao-fill-theme":"ao-grey-black"].join(" ")}>
                  <span className="flex text-center grow pad-">
                    <span><span className="pad padxd">{item.label}</span></span>
                  </span>
                </button>
              </div>
            )
          })
        }
      </div>
      <div className="divider nospace marg margbc"></div>
      {
        (()=>{
          var comps = [
            ()=>{
              return <ProfileBioComponent userinfo={userinfo} />
            },
            ()=>{
              return <ProfileReviewComponent userinfo={userinfo} handleselectTabIndex={handleselectTabIndex} />
            },
            ()=>{
              return <ProfilepostCatetoryComponent />
            }
          ][tabindex]||false;
          if(comps){
            return comps()
          }
        })()
      }
    </div>
  )
}

export default ProfileTabComponent