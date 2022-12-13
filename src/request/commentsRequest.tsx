import axios from "axios";
import qs from "qs";
axios.defaults.paramsSerializer = params => {
    return qs.stringify(params);
}


export interface commentsParams {
    commentsContent : string | null;
};

export interface newCommentsParams {
    boardId : string;
    commentsContent : string | null;
};

export interface commentsUpdateParams {
    commentsContent : string | null;
    boardId : string | null;
    commentsId : string | null;
}


export const commentsPageRequest = async (boardId : string, commentsId : any) => {
    let url;
    console.log("query")
    console.log(commentsId)
    url = `/comment-service/boards/${boardId}/comments/next/`
    const response = await axios.post(url,{
        commentId: commentsId,
    })
    if(response.status !== 200) {
        alert(response.status)
    }
    return response.data;
}

export const newCommentsRequest = async (params : newCommentsParams, token : string) => {
    let url;
    url = `/comment-service/boards/${params.boardId}/comments`
    console.log(params)
    const response = await axios.post(url, {
        content: params.commentsContent
    }, {
        headers: {
            authorization: token,
        }
    })
    return response;
}

export const commentsUpdateRequest = async (params : commentsUpdateParams, token : string) => {
    let url;
    url = `/comment-service/boards/${params.boardId}/comments/${params.commentsId}`
    return await axios.put(url, {
        content: params.commentsContent
    }, {
        headers: {
            authorization: token,
        }
    }).catch(function (error) {
        alert(error.response.data.message);
        return {'status': error}
    });
}

export const commentsDeleteRequest = async (boardId : string, commentsId : string | null, token : string) => {
    let url;
    url = `/comment-service/boards/${boardId}/comments/${commentsId}`
    return await axios.delete(url, {
        headers: {
            authorization: token,
        }
    }).catch(function (error) {
        alert(error.response.data.message);
        return {'status': error}
    });
}
