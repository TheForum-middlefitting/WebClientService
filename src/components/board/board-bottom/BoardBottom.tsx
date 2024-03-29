import Button from "react-bootstrap/Button";

import React, {useEffect, useState} from "react";

export default function BoardBottom(props : any) {
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(props.pageable.number)
    }, [props.pageable])


    let prePageHandler = () => {
        if (props.pageable.first) {
            return
        }
        props.initialPageHandler(page - 1);
        props.setParams(props.initialParams);
    }

    let nextPageHandler = () => {
        if (props.pageable.last) {
            return
        }
        props.initialPageHandler(page + 1);
        props.setParams(props.initialParams);
    }

    return (
        <div className="list-group-item list-group-item-light flex-column align-items-md-center">
            <div className="d-flex w-200 justify-content-between">
                {props.pageable.first ?  <Button variant="secondary" disabled={props.pageable.first}>이전</Button> : <Button variant="outline-primary" onClick={prePageHandler}>이전</Button>}
                <div>
                    {props?.pageable?.totalPages ? <h4>{page + 1} / {props.pageable.totalPages} 페이지</h4> : <h4>페이지가 없습니다</h4>}
                </div>
                {props.pageable.last ? <Button variant="secondary" disabled={props.pageable.last}>다음</Button> : <Button variant="outline-primary" onClick={nextPageHandler}>다음</Button>}
            </div>
        </div>
    )
}
