

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./HomePage.css";
import HomePageHeaderComponent from './HomePageHeaderComponent';
import MenuComponent from './MenuComponent';
import PostComponent from './PostComponent';
import FijoliItems from "./FijoliItems";
import SelfProfile from '../Profile/SelfProfile';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import PostContainer from '../PostCommentComponents/PostContainer';
import BlockUserContainer from '../blockusercomponents/BlockUserContainer';
import FollowersContainer from '../Follow/FollowerComponents/FollowersContainer';
import SearchpostContainer from '../SearchPosts/SearchPostComponents/SearchpostContainer';
import FollowingContainer from '../Follow/FollowingComponents/FollowingContainer';
import clearErrorMessageAction from '../actions/clearErrorMessageAction';
import DisplayMessage from '../DisplayMessageComponent/DisplayMessage';
import actiongetloginUser from "../actions/actiongetloginUser";
import { useSearchParams } from 'react-router-dom';
import EnumPostCategory from './enums/EnumPostCategory';
import PostAsyncController from '../viewModels/PostAsyncController';
import getPostItemsAction from '../actions/getPostItemsAction';

const HomePage = () =>{

  const dispatch                          = useDispatch();
  const [displaymsg, setdisplaymsg]       = useState({});
  const loginData  =   {
    "whatsapp_number":"", 
    "encrypted_password":"",
  };

  const [params]          = useSearchParams();
  const lstofItems        = useSelector(state => state.storeComponent.configData.postItems);
  let navigateItemtype  = useSelector((state) => state.storeComponent.navigateItemType);
  const loggedInUserInfo  = useSelector((state) => state.storeComponent.configData.profileData);
  const lstofPosts        = useSelector((state)=> state.storeComponent.lstofPosts);
  const errormsgstate     = useSelector(state => state.storeComponent.errormsg);
  // const [navigateItemtype, setnavigateitemType] = useState("");

  useEffect(()=>{
    if(errormsgstate){
      setdisplaymsg({"open": true, "msg": errormsgstate.errormsg});
    }
  },[errormsgstate]);

  useEffect(()=>{
    dispatch(navigateItem(params.get("navigateTo")))
  },[]);

  useEffect(()=>{
    getInfo();
  },[navigateItemtype]);

  const createUserinfo = (loggedInUser) =>{
    if(loggedInUser){
      return{
        "user_id" : loggedInUser.user_id,
        "whatsapp_number" : loggedInUser.whatsapp_number
      }
    }
  }
  
  const userinfo = useMemo(() => createUserinfo(loggedInUserInfo), [loggedInUserInfo]);

  function getInfo(){

    if(localStorage.getItem("whatsapp_number") === ''){
      localStorage.setItem("whatsapp_number", loggedInUserInfo.whatsapp_number);
      localStorage.setItem("token", loggedInUserInfo.encrypted_password)
      localStorage.setItem("navigateTo", params.get("navigateTo"));
    }

    switch(params.get("navigateTo")){
        case EnumNavigate.homepageState:
        case EnumNavigate.profileState:
          if(undefined === lstofItems){
            loginData.whatsapp_number = localStorage.getItem("whatsapp_number");
            loginData.encrypted_password = localStorage.getItem("token");
            loginData.navigateItemType   = params.get("navigateTo");
            // localStorage.setItem("whatsapp_number", "");
            dispatch(actiongetloginUser(loginData));
          }
          dispatch(navigateItem(params.get("navigateTo")));
          break;

        case EnumPostCategory.FitRecipesPost:
        case EnumPostCategory.FitStoryboardsPost:
        case EnumPostCategory.FitnessProductsPost:
        case EnumPostCategory.FitnessServicesPost:
        case EnumPostCategory.TransformationStoriesPost:
          // 
          if(undefined === lstofItems){
            loginData.whatsapp_number = localStorage.getItem("whatsapp_number");
            loginData.encrypted_password = localStorage.getItem("token");
            loginData.navigateItemType   = params.get("navigateTo");
            // localStorage.setItem("whatsapp_number", "");
            dispatch(actiongetloginUser(loginData));
          }else{

          if(undefined === lstofPosts){
            let postAsyncCtrl = new PostAsyncController();
            let postitems = lstofItems[postAsyncCtrl.getPostType(params.get("navigateTo"))];
            let items = {};
            Object.keys(postitems).map(item =>{
                items = {...items, [postitems[item].id]: postitems[item]}
            })
            dispatch(getPostItemsAction(items));
          }
          dispatch(navigateItem(EnumNavigate.postContainer));
          }
          break;

        default :
          dispatch(navigateItem(params.get("navigateTo")))
          break;
    }

  }
  const handlecloseDisplayMsg = () =>{
    setdisplaymsg({"open": false, "msg": ""});
    dispatch(clearErrorMessageAction());
  }

  return (
      <div className='homepage-container'>
        <HomePageHeaderComponent userinfo = {userinfo}/>
        <>
        { 
          (params.get("navigateTo") === EnumNavigate.menuState) &&
          <MenuComponent />
        }
        </>
        <>
        {
          (params.get("navigateTo") === EnumNavigate.postState) &&
          <PostComponent />
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.homepageState) && (undefined != lstofItems) && (Object.keys(lstofItems).length) &&
          Object.keys(lstofItems).map((item, index)=>{
            return (<FijoliItems key={index} categoryName={item} data={lstofItems[item]} ></FijoliItems>)
          })
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.profileState) &&
          <SelfProfile />
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.postContainer) &&
          <PostContainer />
        }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.blockusers) &&
          <BlockUserContainer logged_in_user_id = {loggedInUserInfo.user_id}/>
        }
        </>
        <>
          {
            (navigateItemtype === EnumNavigate.followers) &&
            <FollowersContainer />
          }
        </>
        <>
          {
            (navigateItemtype === EnumNavigate.following) &&
            <FollowingContainer />
          }
        </>
        <>
        {
          (navigateItemtype === EnumNavigate.searchposts) &&
          <SearchpostContainer user_id={loggedInUserInfo.user_id}/>
        }
        </>
        {
          <DisplayMessage displayState = {displaymsg} handleclose = {handlecloseDisplayMsg}/>
        }
      </div>
  )
}

export default HomePage;
