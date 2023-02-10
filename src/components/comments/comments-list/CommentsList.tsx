import React, {useEffect, useState} from "react";
import {commentsPageRequest} from "../../../request/commentsRequest";
import CommentsListElement from "./comments-element/CommentsListElement";
import Button from "react-bootstrap/Button";
import NewComments from "../new-comments/NewComments";
import {useQuery} from "react-query";

export default function CommentsList(props: any) {
    const [commentsData, setCommentsData] = useState<any[]>([]);
    const [isFinal, setIsFinal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [commentsId, setCommentsId] = useState(null);
    const [commentsCount, setCommentsCount] = useState(0);

    const tempId = commentsId ? commentsId : -1
    const { data } = useQuery(["boardsCommentsPage" + props.boardId,
            {
                commentsId : tempId
            }],
        () => commentsPageRequest(props.boardId, commentsId),
        {
            suspense: true,
            onSuccess : () => {
                // queryClient.invalidateQueries(["boardsCommentsPage", props.boardId, commentsId])
                // queryClient.invalidateQueries(["boardsCommentsPage"])
            }
        })

    const appendCommentsHandler = async () => {
        let loadedComments: any[] = commentsData;
        let response = data;
        if (commentsId != null)
            response = await commentsPageRequest(props.boardId, commentsId);
        const responseData = await response?.data;
        if (response?.status === 200) {
            const content = responseData.content;
            for (const temp in commentsData) {
                for (const key in responseData.content) {
                    if (commentsData[temp]?.id === content[key]?.commentId) {
                        return
                    }
                }
            }
            for (const key in content) {
                loadedComments.push({
                    id: content[key].commentId,
                    memberId: content[key].memberId,
                    nickname: content[key].nickname,
                    content: content[key].content,
                    regDate: content[key].regDate,
                })
            }
            setCommentsCount(!commentsId ? responseData.totalElements : commentsCount)
            setCommentsData(loadedComments);
            setCommentsId(loadedComments.slice(-1)[0]?.id);
            setIsFinal(responseData.last);
        }
    }

    useEffect(() => {
        appendCommentsHandler();
    }, [refresh])

    const commentsList = commentsData?.map((comment) => {
            return <CommentsListElement
                key={"comment" + comment.id}
                id={comment.id}
                memberId={comment.memberId}
                nickname={comment.nickname}
                content={comment.content}
                boardId={props.boardId}
                regDate={comment.regDate}
                setRefresh={setRefresh}
                refresh={refresh}
                setCommentsData={setCommentsData}
                setCommentsId={setCommentsId}
            />
        }
    )
    return (
        <>
            <p className="text-break">{commentsCount} 개의 댓글</p>
            <NewComments boardId={props?.boardId} setRefresh={setRefresh} refresh={refresh} setCommentsData={setCommentsData} setCommentsId={setCommentsId}/>
            <div className="list-group list-group-flush">
                {commentsList}
                {!isFinal && <Button variant={"outline-primary"} onClick={appendCommentsHandler}>더보기</Button>}
            </div>
        </>
    )
}
