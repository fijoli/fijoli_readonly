{/* <button onClick={{}} className="anchor-outline rounded ao-fill-theme font-bold">
    <span className="flex text-center grow">
        <span><span className="pad padxd">Complete Profile</span></span>
    </span>
</button> */}


{/* <span className="relative block">
    <img src="./base/1x1.png" alt="Post" className="w" />
    <span className="abs trbl bg-cover bg-center" style={{ backgroundImage: ["url(", userpicinfo, ")"].join("") }}></span>
</span> */}


export const LikeIconTemplate = (prop)=>{
    let {blockdata, onlike, ondislike} = prop;
    return (
        <>
            <div className="flex wrap pad- ypad-off">
                <div className=''>
                    <span class="flex padoff align-items-center flex-container">
                        <span>
                            <button onClick={onlike} className="anchor-outline rounded ao-grey-theme">
                                <span className="flex text-center grow align-items-center h">
                                    <span><i className={["fa5 fa5-heart"].join(" ")}></i></span>
                                </span>
                            </button>
                        </span>
                        <span>
                            <span class="pad padxb lead h8">{blockdata.likes_count}</span>
                        </span>
                    </span>
                </div>
                <div className=''>
                    <span class="flex padoff align-items-center">
                        <span>
                            <button onClick={ondislike} className="anchor-outline rounded ao-grey-skin">
                                <span className="flex text-center grow align-items-center h ">
                                    <span className='icon-sized-xss'>
                                        <img src={"/categoryImages/rDislikeheart.svg"} className="flex--12" />
                                    </span>
                                </span>
                            </button>
                        </span>
                        <span>
                            <span class="pad padxb lead h8">{blockdata.dislikes_count}</span>
                        </span>
                    </span>
                </div>
            </div>
        </>
    )
}

export const PostUserCallBlock = (prop)=>{
    let {blockdata, onreply, onedit,ondelete} = prop;
    return (
        <>
            <div className="flex wrap pad- ypad-off font-size-small">
                <div>
                    <button onClick={onreply} className="anchor-outline rounded ao-grey-skin">
                        <span className="flex text-center grow align-items-center h">
                            <span><i className="fa5 fa5-reply "></i></span>
                        </span>
                    </button>
                </div>
                {
                    (blockdata.logged_in_user_id === blockdata.comment_user_id) &&
                    <>
                        <div>
                            <button onClick={onedit} className="anchor-outline rounded ao-grey-skin">
                                <span className="flex text-center grow align-items-center h">
                                    <span><i className="fa5 fa5-pencil "></i></span>
                                </span>
                            </button>
                        </div>
                        <div>

                            <button onClick={ondelete} className="anchor-outline rounded ao-grey-skin">
                                <span className="flex text-center grow align-items-center h">
                                    <span><i className="fa5 fa5-trash pad padxa"></i></span>
                                </span>
                            </button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export const CircleImageTemplate = (prop)=>{
    let {image,dimension,wrapperclass} = prop;
    return (
        <>
            <span className={["relative block",wrapperclass||""].join(" ")}>
                <img src={[(dimension||"./base/1x1.png")].join("")} alt="Post" className="w" />
                <span className="abs trbl bg-cover bg-center" style={{ backgroundImage: ["url(", image, ")"].join("") }}></span>
            </span>
        </>
    )
}