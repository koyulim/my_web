import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Post from 'Jobtype/Post';

function Eat() {
    return (
        <div>
            <div>
                <h2>Eat</h2>
                <button><a className = 'href' href= 'Post' >글쓰기</a></button>
            </div>
        </div>
    )
}
export default Eat;