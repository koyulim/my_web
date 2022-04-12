import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className='login'>
                <h1>Login</h1>
                <h4>닉네임</h4>
                <input></input>
                <h4>비밀번호</h4>
                <input></input>
                <h4>
                    <button>Login</button>
                </h4>
                <a>닉네임 찾기 | </a>
                <a>비밀번호 찾기 | </a>
                <a className = 'href' href= 'Signup'>회원가입</a>
            </div>
        );
    }
}

export default Login;