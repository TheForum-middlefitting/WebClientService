import BoardForm from "../../components/board/BoradForm";
import React, {Suspense, useState} from "react";
import {boardsPageParams, boardsPageRequest} from "../../request/boardsRequest";
import LoadingSpinners from "../../components/spinner/LoadingSpinner";
import {useQuery} from "react-query";

export const defaultParams = {
    boardWriterNickname: null,
    boardTitle: null,
    boardContent: null,
    boardCategory: "total",
    page: 0,
    sort: "regDate",
    direction: "desc"
}
export default function Board() {
    const [params, setParams] = useState<boardsPageParams>(defaultParams);
    const [refresh, setRefresh] = useState(false);
    const { data } = useQuery([
        "boardsPage",
        params.boardWriterNickname,
        params.boardTitle,
        params.boardContent,
        params.boardCategory,
        params.page,
        params.sort,
        params.direction
    ], () => boardsPageRequest(params), { suspense: true })
    return (
    <Suspense fallback={<LoadingSpinners />}>
        <BoardForm
            data={data}
            params={params}
            setParams={setParams}
            refresh={refresh}
            setRefresh={setRefresh}/>
    </Suspense>
    );
}
