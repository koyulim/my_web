import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

function Findnickname() {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [sample1List, setSample1List] = useState([]);

    const emailUpdate = (e) => {
        // setState({ email: e.target.value })
        setEmail(e.target.value);
    }
    const getemailData = async () => {
        const res = await axios('/get/emailData', {
            method: 'POST',
            data: {
                'email': email
            }
        });
        setSample1List(res.data);

    }
    return (
        <>
            <div className='login'>
                <h1>닉네임 찾기</h1>
                <h4>이메일</h4>
                <input type='email' placeholder='이메일을 입력하시오.' onChange={(e) => emailUpdate(e)} />
                <h4></h4>
                <a>
                    {sample1List.length !== 0 ?
                        sample1List.map((el, key) => {
                            return (
                                <div key={key}>
                                    <span className='overlap'> 당신의 Nickname 은 {el.nickname} 입니다. </span>
                                </div>
                            )
                        })
                        : <div>이메일을 정확히 입력해 주세요.</div>}
                </a>
                <h4>
                    <button className='loginbtn' onClick={getemailData} >조회하기</button>
                </h4>

            </div>
        </>
    )
}

export default Findnickname;