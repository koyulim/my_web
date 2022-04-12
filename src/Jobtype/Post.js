import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Location from 'Location';


class Post extends Component {
    render(){
        return (
            <div>
                글쓰기
                <div>
                <input type={'text'} placeholder = "제목" style={{width:'300px'}}></input>
                </div>
                <br/>
                <input type={'text'} placeholder = "내용" style={{width:'300px', height: '200px'}} ></input>
                <h4>지도</h4>
                <div className='map'>
                <Location/>
                </div>
                <br/>
                <button>올리기</button>
            </div>
        );
    }
}


export default Post;