import ListGroup from "react-bootstrap/ListGroup";
import React, {useEffect, useState} from "react";
import {boardsPageParams} from "../../request/boardsRequest";
import BoardListForm from "./board-list-element/BoardListElement";
import BoardCard from "./board-card/BoardCard";
import BoardBottom from "./board-bottom/BoardBottom";
import BoardSearch from "./board-search/BoardSearch";


export default function BoardForm(props: any) {
    const response = props.data
    const [boardsData, setBoardsData] = useState<any[]>([]);
    const [pageable, setPageable] = useState<any>([]);

    useEffect(() => {
        const responseData = response.data;
        const loadedBoards = [];
        if (response.status === 200) {
            const content = responseData.content;
            for (const key in responseData.content) {
                loadedBoards.push({
                    id: content[key].boardId,
                    category: content[key].boardCategory,
                    memberId: content[key].memberId,
                    nickname: content[key].nickname,
                    title: content[key].title,
                    regDate: content[key].regDate,
                })
            }
            setBoardsData(loadedBoards);
            let pageable = responseData.pageable
            pageable.last = responseData.last;
            pageable.first = responseData.first;
            pageable.totalPages = responseData.totalPages;
            pageable.totalElements = responseData.totalElements;
            pageable.number = responseData.number;
            setPageable(pageable)
        }
    }, [response])

    let initialParams: boardsPageParams = {
        boardWriterNickname: props.params.boardWriterNickname,
        boardTitle: props.params.boardTitle,
        boardContent: props.params.boardContent,
        boardCategory: props.params.boardCategory,
        page: props.params.page,
        sort: props.params.sort,
        direction: props.params.direction,
    }

    let initialCategoryHandler = (category: string) => {
        initialParams.boardCategory = category;
    }

    let initialDirectionHandler = (direction: string) => {
        initialParams.direction = direction;
    }

    let initialPageHandler = (page: number) => {
        initialParams.page = page;
    }

    let initialSearchHandler = (boardTitle: string, boardContent: string, boardWriterNickname: string) => {
        initialParams.boardTitle = boardTitle;
        initialParams.boardContent = boardContent;
        initialParams.boardWriterNickname = boardWriterNickname;
    }

    const refreshHandler = () => {
        props.setRefresh(!props.refresh);
    }

    const boardList = boardsData.map((board) => {
        return <BoardListForm
            key={board.id}
            id={board.id}
            category={board.category}
            memberId={board.memberId}
            nickname={board.nickname}
            title={board.title}
            regDate={board.regDate}
        />
    })

    return (
        <>
            <BoardCard initialParams={initialParams} initialCategoryHandler={initialCategoryHandler}
                       initialDirectionHandler={initialDirectionHandler} initialPageHandler={initialPageHandler}
                       initialSearchHandler={initialSearchHandler} setParams={props.setParams}
                       refreshHandler={refreshHandler}/>
            <BoardSearch initialParams={initialParams} initialSearchHandler={initialSearchHandler}
                         initialPageHandler={initialPageHandler} setParams={props.setParams} params={props.params}/>
            <div className="list-group list-group-flush">
                {boardList}
                {boardsData.length === 0 && <ListGroup.Item><h2>게시글이 없습니다</h2></ListGroup.Item>}
                <BoardBottom initialParams={initialParams} initialPageHandler={initialPageHandler}
                             setParams={props.setParams} pageable={pageable}/>
            </div>
        </>
    )
}
