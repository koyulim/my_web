import { param } from "jquery";
import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";

const nickname = sessionStorage.getItem('nickname');


function Board() {

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const Jolist = searchParams.get('Jolist');
    console.log("test : " + id);
    console.log("test : " + Jolist);

    return (
        <>
            <div>글 목록</div>
            {
                nickname !== null
                    ? <div><button><a className='href' href='Post'>글쓰기</a></button></div>
                    : <button style={{ padding: '5px' }} onClick={Posts}>글쓰기</button>

            }
        </>
    )
}
function Posts() {
    alert('로그인을 해주세요.')
}
export default Board;
