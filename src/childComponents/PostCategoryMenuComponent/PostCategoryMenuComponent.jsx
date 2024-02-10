

import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CoffeeIcon from '@mui/icons-material/Coffee';
import FilterTwoToneIcon from '@mui/icons-material/FilterTwoTone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import ManIcon from '@mui/icons-material/Man';
import EnumPostCategory from '../enums/EnumPostCategory';
import { IconButton, Menu, MenuItem, useStepContext } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EnumNavigate from '../../singletonControllers/NavigateController';
import navigateItem from '../../actions/navigateItemAction';

const iconStyle = { fontSize: '30px', color: "black" };
const rediconStyle = { fontSize: '30px', color: "red" };

let menus = {}
menus[EnumPostCategory.FitRecipesPost] = {
    "img" : "/categoryImages/fitrecipes_category.svg"
}
menus[EnumPostCategory.FitStoryboardsPost] = {
    "img" : "/categoryImages/storyborad_category.svg"
}
menus[EnumPostCategory.FitnessProductsPost] = {
    "img" : "/categoryImages/fitnessProduct_category.svg"
}
menus[EnumPostCategory.FitnessServicesPost] = {
    "img" : "/categoryImages/fitnessServicePost_category.svg"
}
menus[EnumPostCategory.TransformationStoriesPost] = {
    "img" : "/categoryImages/TransformationServices_category.svg"
}
// menus[EnumPostCategory.FitRecipesPost] = {
//     "imgcomponent" : <CoffeeIcon />
// }
const PostCategoryMenuComponent = ({ menuOptions, handleClick, children }) => {

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigateItemtype = useSelector((state) => state.storeComponent.navigateItemType);

    const handlemenuIconClick = (event) => {
        if (navigateItemtype !== EnumNavigate.postState) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = (e, seletedmenuItem) => {
        if ((typeof seletedmenuItem === "string") &&
            (seletedmenuItem !== "backdropClick")) {
            handleClick(e, seletedmenuItem);
        }
        setAnchorEl(null);
    };

    return (
        <div>
            {
                children.menuicon({ handlemenuIconClick, anchorEl })
            }
            <Menu className='desk-col' id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} >
                <div className="flex wrap align-items-stretch justify-center grow ypad-off">
                    {
                        menuOptions.map((option,i) => {
                            let havemenu = menus[option]||false;
                            return (
                                (havemenu) && (
                                    <div key={i} className="">
                                        <MenuItem key={option} selected={option === menuOptions[0]} onClick={(e) => handleClose(e, option)}>
                                            <div className='flex align-items-cener h'>
                                                <span>{option}</span>
                                                <span>
                                                    {
                                                        (havemenu.img) && (
                                                            <img src={havemenu.img} style={{ width: "25px", height: "25px" }} />
                                                        )
                                                    }
                                                    {
                                                        (havemenu.imgcomponent) && (
                                                            <img src={havemenu.imgcomponent} style={{ width: "25px", height: "25px" }} />
                                                        )
                                                    }
                                                </span>
                                            </div>
                                        </MenuItem>
                                    </div>
                                )
                            )
                        })
                    }
                </div>
            </Menu>
        </div>
    )
}

export default PostCategoryMenuComponent