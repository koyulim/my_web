import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Location from 'Location';
import { useSearchParams } from "react-router-dom";


function Post() {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const Jolist = searchParams.get('Jolist');
    console.log("test : " + id);
    console.log("test : " + Jolist);

    return (
        <div>
            글쓰기
            <div>
                <input type={'text'} placeholder="제목" style={{ width: '300px' }}></input>
            </div>
            <br />
            <input type={'text'} placeholder="내용" style={{ width: '300px', height: '200px' }} ></input>
            <h4>지도</h4>
            <div className='map'>
                {/* <Location/> */}
            </div>
            <br />
            <button>올리기</button>
        </div>
    );
}



export default Post;