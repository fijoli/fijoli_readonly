

class PostCommentValidation {

    constructor() {
    }

    IsValid(postinfo, category){
        const status       = {"desc_status": false, "file_uploaded_status": false, "currency_status" : false};

        switch(category){
            case "Fit Recipes Post":
                return this.FitReceipePostValidation(postinfo, status);
            case "Fit StoryBoards Post":
                return this.FitStoryBoardsPostValidation(postinfo, status);
            case "Fitness Products Post":
                return this.FitnessProductsPostValidation(postinfo, status);
            case "Fitness Services Post":
                return this.FitnessServicesPostValidation(postinfo, status);
            case "Transformation Stories Post":
                return this.TransformationStoriesPostValidation(postinfo, status);
        }
    }

    FitReceipePostValidation(postinfo, validStatus){

        if ("" === postinfo["post_description"]){
            validStatus.desc_status = true;
        }else if(postinfo['post_file'].post_pic.filter(item=>(item !== undefined)&&(item !== null)).length === 0){
            validStatus.file_uploaded_status = true;
        }
        validStatus["isValid"] = validStatus.desc_status || validStatus.file_uploaded_status;
        return validStatus;
    }

    FitnessProductsPostValidation(postinfo, selectedfiles,validStatus){

        if ("" === postinfo["post_description"]){
            validStatus.desc_status = true;
        }else if(postinfo['post_file'].post_pic.filter(item=>item !== undefined).length === 0){
            validStatus.file_uploaded_status = true;
        }
        validStatus["isValid"] = validStatus.desc_status || validStatus.file_uploaded_status;
        return validStatus;
    }

    FitnessServicesPostValidation(postinfo, selectedfiles,validStatus){

        if("" === postinfo["post_description"]){
            validStatus.desc_status = true;
        }else if(postinfo['post_file'].post_pic.filter(item=>item !== undefined).length === 0){
            validStatus.file_uploaded_status = true;
        }else if(0 === postinfo["post_currency"]){
            validStatus.currency_status = true;
        }
        validStatus["isValid"] = validStatus.desc_status || validStatus.file_uploaded_status || validStatus.currency_status;
        return validStatus;
    }

    FitStoryBoardsPostValidation(postinfo, selectedfiles,validStatus){

        if("" === postinfo["post_description"]){
            validStatus.desc_status = true;
        }else if(postinfo['post_file'].post_pic.filter(item=>item !== undefined).length === 0){
            validStatus.file_uploaded_status = true;
        }else if("" === postinfo["post_currency"]){
            validStatus.currency_status = true;
        }
        validStatus["isValid"] = validStatus.desc_status || validStatus.file_uploaded_status || validStatus.currency_status;
        return validStatus;
    }

    TransformationStoriesPostValidation(postinfo, selectedfiles,validStatus){

        if("" === postinfo["post_description"]){
            validStatus.desc_status = true;
        }else if(postinfo['post_file'].post_pic.filter(item=>item !== undefined).length <= 1){
            validStatus.file_uploaded_status = true;
        }

        validStatus["isValid"] = validStatus.desc_status || validStatus.file_uploaded_status;
        return validStatus;
    }
}

export default PostCommentValidation;