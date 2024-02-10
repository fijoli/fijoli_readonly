

import React, { useEffect, useState } from 'react';
import "../css/HomePageHeaderComponent.css";

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';

//need to delete once the actual image is downloaded
import { useDispatch, useSelector } from 'react-redux';
import EnumNavigate from '../singletonControllers/NavigateController';
import navigateItem from '../actions/navigateItemAction';
import getselectedprofile from '../actions/getselectedprofile';
import setpostcategoryType from '../actions/setpostcategoryType';
import PostAsyncController from '../viewModels/PostAsyncController';
import searchpostAction from '../SearchPosts/Actions/searchpostAction';
import PostCategoryMenuComponent from './PostCategoryMenuComponent/PostCategoryMenuComponent';


const iconStyle = { fontSize: '30px', color: "black" };
const rediconStyle = { fontSize: '30px', color: "red" };

//home page header component
const HomePageHeaderComponent = ({ userinfo }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [keyitems, setkeyitems] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [userpic, setuserpic] = useState("");

  const dispatch = useDispatch();
  const lstofPosts = useSelector(state => state.storeComponent.configData.Post);
  const searchpostState = useSelector(state => state.storeComponent.searchpostState);
  const navigateItemtype = useSelector((state) => state.storeComponent.navigateItemType);
  const postItemCtrl = new PostAsyncController();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (searchpostState) {
      setsearchkey("");
      dispatch(navigateItem(EnumNavigate.searchposts));
    }
  }, [searchpostState]);

  useEffect(() => {
    //temp fijoli items 
    if (lstofPosts) {
      let reciepeKeyItems = [];
      lstofPosts.map((itm, indx) => {
        reciepeKeyItems.push(itm);
      });
      setkeyitems(reciepeKeyItems);

      let picinfo = process.env.REACT_APP_S3_URL + userinfo["whatsapp_number"] + "/profilepic/" + userinfo["whatsapp_number"] + "_profilepic_";
      setuserpic(picinfo);
    }

  }, [lstofPosts]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setContextMenuVisible(!isContextMenuVisible);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //emits the selected post item type from context menu
  const handlepostMenuItemClick = (event, value) => {
    let postinfo = postItemCtrl.getDefaultPostComment();
    postinfo["post_category"] = value;
    Object.keys(userinfo).map((item, index) => {
      postinfo[item] = userinfo[item];
    });

    dispatch(setpostcategoryType(postinfo));
    dispatch(navigateItem(EnumNavigate.postState));
    handleClose();
  };

  const handleHdrPagevisibleState = (navigateTo) => {
    dispatch(navigateItem(navigateTo));
  }


  const handleProfile = (navigateTo) => {

    dispatch(getselectedprofile(true, 0));
    dispatch(navigateItem(navigateTo));

  }

  const handleSearchClick = (navigateTo) => {
    // setsearchkey("");
    // dispatch(navigateItem(navigateTo));
    dispatch(searchpostAction(searchkey));
  }

  const handlesearchkeyChange = (evt) => {
    setsearchkey(evt.target.value);
  }

  // const [userpicloaded, setuserpicloaded] = useState(true);

  const handleuserpicloaded = (evt) => {
    // setuserpicloaded(false);
  }
  return (
    <div className='app-skull'>
      <div className="app-skull-header">
        <div className="col-grid flex align-items-center grow ypad-off">
          <div className='col-brand'>
            <h1 className="brand-link ellipsis">Fijoli</h1>
          </div>
          <div>
            <TextField
              value={searchkey}
              placeholder="search content"
              sx={{
                '& fieldset': { borderRadius: 33 }
              }}
              fullWidth
              onChange={handlesearchkeyChange}
              InputProps={{
                sx: { height: 50 },
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={() => handleSearchClick(EnumNavigate.searchposts)}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment >
              }}
              variant="outlined" />
          </div>
          <div>
            <div className="relative nolh marg marga">
              <img src="./base/1x1.png" alt="img2" onLoad={handleuserpicloaded} className="w" />
              <a href={null} onClick={(evt) => handleProfile(EnumNavigate.profileState)} className='anchor-outline ao-grey-black-theme circle relative oh abs trbl'>
                <span className="abs trbl bg-cover bg-center" style={{ backgroundImage: ["url(", userpic, ")"].join("") }}>
                </span>
              </a>
            </div>
          </div>
          <div className='text-center'>
            <button onClick={(evt) => handleHdrPagevisibleState(EnumNavigate.menuState)} className={["anchor-outline radius ao-grey-theme font-bold"].join(" ")}>
              <span className="flex text-center grow align-iems-center">
                <span><span className="nolh">{<MenuIcon />}</span></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-main-menu">
          <div className='inner flex align-items-center justify-center grow text-center padoff'>
            <div>
              <button onClick={(evt) => handleHdrPagevisibleState(EnumNavigate.homepageState)} className={["anchor-outline ao-grey-black-theme font-bold w", ((EnumNavigate.homepageState === navigateItemtype) ? 'active' : '')].join(" ")}>
                <span className="flex text-center grow align-iems-center pad padyb">
                  <span><span className="nolh fa5 fa-home"></span></span>
                </span>
              </button>
            </div>
            <div>
              <button onClick={(evt) => handleHdrPagevisibleState('')} className={["anchor-outline ao-grey-black-theme font-bold w"].join(" ")}>
                <span className="flex text-center grow align-iems-center pad padyb">
                  <span><span className="nolh fa5 fa-globe"></span></span>
                </span>
              </button>
            </div>
            <div>
              <button onClick={(evt) => handleHdrPagevisibleState('')} className={["anchor-outline ao-grey-black-theme font-bold w"].join(" ")}>
                <span className="flex text-center grow align-iems-center pad padyb">
                  <span><span className="nolh fa5 fa-eye"></span></span>
                </span>
              </button>
            </div>
            <div>
              <button onClick={(evt) => handleHdrPagevisibleState('')} className={["anchor-outline ao-grey-black-theme font-bold w"].join(" ")}>
                <span className="flex text-center grow align-iems-center pad padyb">
                  <span><span className="nolh fa5 fa-bell"></span></span>
                </span>
              </button>
            </div>
            <div>
              <PostCategoryMenuComponent menuOptions={keyitems} handleClick={handlepostMenuItemClick}>
                {
                  {
                    menuicon: function ({handlemenuIconClick}) {
                      return (
                        <button onClick={handlemenuIconClick} className={["anchor-outline ao-grey-black-theme font-bold w"].join(" ")}>
                          <span className="flex text-center grow align-iems-center pad padyb">
                            <span><span className="nolh fa5 fa-plus-circle"></span></span>
                          </span>
                        </button>
                      )
                    }
                  }
                }
              </PostCategoryMenuComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageHeaderComponent