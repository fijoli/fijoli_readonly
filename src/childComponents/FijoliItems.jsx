import { IconButton, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import getPostItemsAction from '../actions/getPostItemsAction';
import "./FijoliItems.css";

///<summary>
// home page category post items component
///</summary>
const FijoliItems = (props) => {

    const dispatch = useDispatch();
    const [postitems, setpostitems] = useState([]);
    const [indexRange, setindexRange] = useState({ min: 0, max: 6, start: 0, islast: 1, isfirst: 0 });


    useEffect(() => {
        let { data } = props;
        data = [...data, ...data];
        let sliced = [...data].slice(indexRange.min, indexRange.max);
        if (sliced.length) {
            setpostitems(sliced);
        }
    }, [indexRange]);

    const handleDisplayPost = (selectedItem) => {
        if (selectedItem) {
            // dispatch(getPostItemsAction(userinfo.user_id));
            dispatch(getPostItemsAction({ [selectedItem.id]: selectedItem }))
            //navigate to page which displays post comment info
            // dispatch(navigateItem(EnumNavigate.postContainer));
        }
    }

    const handleNext = () => {
        let { isfirst, islast, start, max, min } = indexRange;
        start++;
        min = (start * max);
        islast = (Math.ceil(props.data.length / max) == start) ? 0 : 1;
        setindexRange({ ...indexRange, min, start, isfirst, islast });
    }
    const handlePrev = () => {
        let { isfirst, islast, start, max, min } = indexRange;
        start--;
        isfirst = start;
        min = (start * max);
        islast = (Math.ceil(props.data.length / max) == start) ? 0 : 1;
        setindexRange({ ...indexRange, min, start, isfirst, islast });
    }

    return (
        <>
        {

            (postitems.length) && (

                <div className='fijoli_main-container'>
                    <div className='flex align-items-center'>
                        <div className="icon-sized-xs">
                            <img src={"/categoryImages/" + props.categoryName + ".svg"} alt={props.data.key} />
                        </div>
                        <div>
                            <h5 className='lead h7 nomargi'>{props.categoryName}</h5>
                        </div>
                    </div>
                    <div className='flex align-items-center grow'>
                        {
                            (indexRange.start) && (
                                <div className="icon-sized-xs">
                                    <IconButton onClick={handlePrev}>
                                        <span className="pad padxb"><i className="fa5 fa5-chevron-left"></i></span>
                                    </IconButton>
                                </div>
                            ) || ("")
                        }
                        <div className="">
                            <div className="flex align-items-center">
                                {
                                    (!props.data.length) && (
                                        <Skeleton variant="circular" textAlign="center" animation="wave" width={90} height={90} style={{ cursor: "pointer", border: "1px solid black" }} />
                                    ) || (postitems.map((postitem, idx) => {
                                        let imgsrc = process.env.REACT_APP_S3_URL + postitem.post_pic_1_path;
                                        return (
                                            <div className="flex--2">
                                                <a href={null} className='oh nolh anchor-outline ao-grey-theme circle block' onClick={() => handleDisplayPost(postitem)}>
                                                    <span className="relative block w">
                                                        <img className='w' src="./base/1x1.png" alt="Pic" />
                                                        <span className="transition abs trbl bg-cover bg-center" style={{ backgroundImage: ("url(" + imgsrc + ")") }}></span>
                                                    </span>
                                                </a>
                                            </div>
                                        )
                                    }))
                                }
                            </div>
                        </div>
                        {
                            (indexRange.islast) && (
                                <div className="icon-sized-xs">
                                    <IconButton onClick={handleNext}>
                                        <span className="pad padxb"><i className="fa5 fa5-chevron-right"></i></span>
                                    </IconButton>
                                </div>
                            ) || ("")
                        }
                    </div>
                    <div className="pad pady1 bg grey-skin marg margya"></div>
                </div>
            ) || ("")
        }
        </>
    )
}

export default FijoliItems;