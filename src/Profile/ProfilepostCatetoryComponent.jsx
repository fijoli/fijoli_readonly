

import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getPostItemsAction from '../actions/getPostItemsAction';
import navigateItem from '../actions/navigateItemAction';
import EnumNavigate from '../singletonControllers/NavigateController';

import img_0 from "./../asset/beef_receipe.jpeg";
import img_1 from "./../asset/chicken_receipe.jpeg";
import img_2 from "./../asset/fitness_storyboard_1.jpg";
import img_3 from "./../asset/food_receipe.jpeg";
import img_4 from "./../asset/noodles_receipe.jpeg";
import getlstofselectedpostcategory from './actions/getlstofselectedpostcategory';

//component which displays list of post categories of a user
const ProfilepostCatetoryComponent = ({ handlePostItemClick }) => {

    const dispatch = useDispatch();
    const [userid, setuserid] = useState("");

    const loggedInUser = useSelector((state) => state.storeComponent.configData.profileData);
    const otherUser = useSelector((state) => state.storeComponent.otherProfileData);

    useEffect(() => {
        if (loggedInUser) {
            setuserid(loggedInUser.user_id);
        }
    }, [loggedInUser]);

    //get lst of categories which exists
    const lstofCategories = useSelector(
        (state) => state.storeComponent.configData.Post);

    //temp variable to display images
    const lstofImages = [img_0, img_1, img_2, img_3, img_4];

    //fetches list of post items for the selected category
    const handlePostClickEvent = (selectedIndex) => {

        dispatch(getlstofselectedpostcategory(otherUser.user_id, lstofCategories[selectedIndex], loggedInUser.user_id));
        // dispatch(getPostItemsAction(userid));
        //dispatch(navigateItem(EnumNavigate.postContainer));
    }

    return (
        <>
            <div className="flex align-items-center justify-center wrap">
                {
                    (lstofCategories || []).map((item, index) => {
                        let imgsrc = lstofImages[index];
                        return (
                            <div key={index} className="flex--3 xsm--4 xs--6 text-center">
                                <span className="flex justify-center align-items-sretch h">
                                    <span className="flex--10 xs--9">
                                        <a href={null} className='nolh anchor-outline ao-grey-theme circle block oh' onClick={() => handlePostClickEvent(index)}>
                                            <span className="relative block h">
                                                <img className='w' src="./base/1x1.png" alt="Pic" />
                                                <span className="transition abs trbl bg-cover bg-center" style={{ backgroundImage: ("url(" + imgsrc + ")") }}></span>
                                            </span>
                                        </a>
                                    </span>
                                </span>
                                <p className='lead h7' >
                                    <a href={null} className="anchor-outline" onClick={() => handlePostClickEvent(index)} >{item.replace("Post", "")}</a>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProfilepostCatetoryComponent;