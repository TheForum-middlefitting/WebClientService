import {useNavigate, useParams} from "react-router-dom";
import React, {Suspense, useContext, useState} from "react";
import {boardsInfoRequest} from "../../request/boardsRequest";
import CommentsList from "../comments/comments-list/CommentsList";
import {useQuery} from "react-query";
import LoadingSpinners from "../spinner/LoadingSpinner";
import AuthContext from "../../store/context/auth-context";
import {useDispatch} from "react-redux";
import BoardInfoContent from "./boardI-info-content/BoardInfoContent";
import BoardInfoUpdate from "./board-info-update/BoardInfoUpdate";

export default function BoardInfoForm(props: any) {
    const navigate = useNavigate();
    const params = useParams();
    const {data} = useQuery(["boardsInfo", params?.id?.toString()], () => boardsInfoRequest(params?.id), {suspense: true})
    const boardsInfoData = data;
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext)
    const [isUpdating, setIsUpdating] = useState(false);
    const dispatch = useDispatch();

    const categoryParse = (category: string | null) => {
        if (category === "free") {
            return "자유게시판"
        }
        if (category === "notice") {
            return "공지사항"
        }
        if (category === "total") {
            return "전체게시판"
        }
    }

    return (
        <>
            {
                !isUpdating ?
                    <BoardInfoContent
                    boardsInfoData={boardsInfoData}
                    setIsUpdating={setIsUpdating}/>
                    :
                    <BoardInfoUpdate
                        boardsInfoData={boardsInfoData}
                        setIsUpdating={setIsUpdating}/>
            }
                <Suspense fallback={<LoadingSpinners/>}>
                    <CommentsList boardId={params?.id}/>
                </Suspense>
        </>
    )
}
