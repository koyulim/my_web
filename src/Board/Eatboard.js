import { param } from "jquery";
import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";
import { BrowserRouter as Link } from 'react-router-dom';

function Eatboard() {
    const nickname = sessionStorage.getItem('nickname');
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const Jolist = searchParams.get('Jolist');
    console.log("test : " + id);
    console.log("test : " + Jolist);

    {/* <Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Post?Joblist=${Jolist}&id=${id}` }}>글쓰기</Link> */}
    return (
        <>
            <div>글 목록</div>
            {
                nickname !== null
                    ? <div><button><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Post?Joblist=${Jolist}&id=${id}` }}>글쓰기</Link></button></div>
                    : <button style={{ padding: '5px' }} onClick={Posts}>글쓰기</button>

            }
        </>
    )
}
function Posts() {
    alert('로그인을 해주세요.')
}
export default Eatboard;
