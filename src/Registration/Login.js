import axios from 'axios';
import React, { useEffect, useState, Component } from "react";
import { AiOutlineUser } from "react-icons/ai";

function Login() {

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [sample1List, setSample1List] = useState([]);

    const nicknameUpdate = (e) => {
        setNickname(e.target.value);
    }
    const passwordUpdate = (e) => {
        setPassword(e.target.value);
    }

    const getMultiKeywordData = async () => {
        const res = await axios('/get/multiKeywordData', {
            method: 'POST',
            data: {
                'nickname': nickname,
                'password': password,
            }
        })
        setSample1List(res.data);

        if (sample1List.lenth !== 0) {
            alert('로그인 성공')
        } else {
            alert('아이디 비밀번호를 다시 확인해 주세요.')
        }
    }

    return (
        <>
            <div className='login'>
            <h1 className='loginmain'><AiOutlineUser size='100' />Login</h1>
            <br/>
            <br/>
                <h4>닉네임</h4>
                <input type='text' maxLength='10' placeholder='닉네임을 입력하시오.' onChange={(e) => nicknameUpdate(e)} />
                <h4>비밀번호</h4>
                <input type='password' maxLength='20' placeholder='비밀번호를 입력하시오.' onChange={(e) => passwordUpdate(e)} />
                <h4></h4>
                <a>
                    {
                        sample1List.length !== 0
                            ?
                            sample1List.map((el, key) => {
                                return (
                                    <>
                                        <div key={key}>
                                            <meta http-equiv='refresh' content='0;url=Main' />
                                            {
                                                sessionStorage.setItem('nickname', el.nickname) // 로그인 닉네임 값 보내기
                                            }
                                        </div>
                                    </>
                                )
                            })
                            : <div>
                            </div>
                    }
                </a>
                <h4>
                    <button className='loginbtn' onClick={getMultiKeywordData} >Login</button>
                </h4>
                <a className='href' href='Findnickname'>닉네임 찾기 | </a>
                <a className='href' href='Findpassword'>비밀번호 찾기 | </a>
                <a className='href' href='Signup'>회원가입</a>
            </div>
        </>
    )
}

export default Login;