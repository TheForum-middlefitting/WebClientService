import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = params => {
    return qs.stringify(params);
}


export interface boardsPageParams {
    boardWriterNickname: string | null;
    boardTitle: string | null;
    boardContent: string | null;
    boardCategory: string;
    page: number | null;
    sort: any | null;
    direction: string | null;
};

export interface boardsInfoParams {
    boardWriterNickname: string | null;
    boardTitle: string | null;
    boardContent: string | null;
    boardCategory: string | null;
};

export interface newBoardParams {
    boardCategory: string;
    boardTitle: string | null;
    boardContent: string | null;
}
export const boardsPageRequest = async (boardsPageParams : boardsPageParams) => {

    let params = {
        page : 0,
        sort : "regDate,",
        boardWriterNickname: boardsPageParams?.boardWriterNickname,
        boardTitle : boardsPageParams?.boardTitle,
        boardContent : boardsPageParams?.boardContent,
        boardCategory : boardsPageParams?.boardCategory,
    };
    if (boardsPageParams.page) {params.page = boardsPageParams.page;}
    if (boardsPageParams.direction) {params.sort += boardsPageParams.direction;}
    let url;
    url = "/board-service/boards/"
    return axios
        .get(process.env.REACT_APP_DB_HOST + url, {params})
        .then((res) => res);
}


export const boardsInfoRequest = async (id: string | undefined) => {
    let url;
    url = `/board-service/boards/${id}`
    if (id === undefined) {
        return
    }
    const response = await axios.get(process.env.REACT_APP_DB_HOST + url)
    return response.data;
}

export const newBoardRequest = async (params: newBoardParams, token: string) => {
    let url;
    url = "/board-service/boards"
    return axios
        .post(process.env.REACT_APP_DB_HOST + url,
            {
                boardCategory: params.boardCategory,
                title: params.boardTitle,
                content: params.boardContent
            }, {
                headers: {
                    authorization: token,
                }
            })
        .then((res) => res.data)
}

export const updateBoardsRequest = async (params: newBoardParams, token: string, boardId: string) => {
    let url;
    url = `/board-service/boards/${boardId}`
    return axios
        .put(process.env.REACT_APP_DB_HOST + url,
            {
                boardCategory: params.boardCategory,
                title: params.boardTitle,
                content: params.boardContent
            }, {
                headers: {
                    authorization: token,
                }
            })
        .then((res) => res.data)
}

export const deleteBoardsRequest = async (token: string, boardId: string) => {
    let url;
    url = `/board-service/boards/${boardId}`
    return axios
        .delete(process.env.REACT_APP_DB_HOST + url,{
                headers: {
                    authorization: token,
                }
            })
        .then((res) => res.data)
}
