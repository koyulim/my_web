import axios from 'axios';
import React, { useEffect, useState, Component } from "react";


function Signup() {

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [nicknameList, setNicknameList] = useState([]);
  const [Num, setNum] = useState(true);
  const [Num2, setNum2] = useState(true);



  const addData = async (e) => {
    // const { email, nickname, password } = this.state;
    e.preventDefault();

    const res = await axios('/add/data', {
      method: 'POST',
      data: {
        'email': email,
        'nickname': nickname,
        'password': password
      },
      headers: new Headers()
    });

    if (res.data) {
      alert('회원가입이 완료되었습니다.');
      return window.location.reload();
    }
  }

  const emailUpdate = (e) => {
    setEmail(e.target.value);
  }

  const nicknameUpdate = (e) => {
    setNickname(e.target.value);
  }

  const passwordUpdate = (e) => {
    setPassword(e.target.value);
  }

  const getKeywordData = async () => {
    const res = await axios('/get/keywordData', {
      method: 'POST',
      data: {
        'nickname': nickname
      },
      headers: new Headers()
    });
    setNicknameList(res.data);
    setNum(false);
  }

  return (
    <div className='login'>
      <h2>회원가입</h2>
      <h4>이메일</h4>
      <input  className = "input_content" type='email' placeholder='이메일을 입력하시오.' onChange={(e) => emailUpdate(e)} />
      <h4>닉네임</h4>
      <input  className = "input_content" type='text' placeholder='닉네임을 입력하시오.' onChange={(e) => nicknameUpdate(e)} />
      <a>&nbsp;</a>
      <button className='loginbtn' onClick={getKeywordData}>중복 확인</button>
      <h4>비밀번호</h4>
      <input  className = "input_content" type='password' placeholder='비밀번호를 입력하시오.' onChange={(e) => passwordUpdate(e)} />
      <form method='POST' onSubmit={addData}>
        <h4>
            <div>
              {
                nickname.length == 0 || password.length == 0 || email.length == 0
                  ? <button disabled={true}>완료</button>
                  : (nicknameList.length !== 0
                    ? nicknameList.map((key) => {
                      return (
                        <div key={key}>
                          <button  disabled={true}>
                            완료</button>
                        </div>
                      )
                    })
                    : <button className='loginbtn' type='submit'><form method='POST' onSubmit={addData}>완료</form></button>
                  )
              }
            </div>
          </h4>
      </form>
    </div>
  );

}

export default Signup;