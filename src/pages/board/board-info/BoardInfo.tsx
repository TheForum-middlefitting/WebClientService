import {useParams} from "react-router-dom";
import BoardInfoForm from "../../../components/board-info/BoardInfoForm";
import React, {Suspense} from "react";
import LoadingSpinners from "../../../components/spinner/LoadingSpinner";

export default function BoardInfo() {

    const params = useParams();

    return(
        <Suspense fallback={<LoadingSpinners />}>
            <BoardInfoForm bookInfoId={{params}}/>
        </Suspense>
    )
}
