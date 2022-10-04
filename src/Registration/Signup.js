import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      nickname: '',
      password: '',
      nicknameList: [],
    }
  };

  addData = async (e) => {
    const { email, nickname, password } = this.state;
    e.preventDefault();

    const res = await axios('/add/data', {
      method: 'POST',
      data: {
        'email' : email,
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

  emailUpdate(e) {
    this.setState({ email: e.target.value })
  }
  nicknameUpdate(e) {
    this.setState({ nickname: e.target.value })
  }
  passwordUpdate(e) {
    this.setState({ password: e.target.value })
  }

  getKeywordData = async () => {
    const res = await axios('/get/keywordData', {
      method: 'POST',
      data: {
        'nickname': this.state.nickname
      },
      headers: new Headers()
    });
    this.setState({
      nicknameList: res.data
    })

    if(this.state.nicknameList.length !== 0){
      alert('사용 불가능 합니다.')
    }else{
      alert('사용 가능 합니다.')
    }
  }

  render() {
    const { nicknameList } = this.state;

    return (
      <div className='login'>
        <h2>회원가입</h2>
        <h4>이메일</h4>
        <input type='email' placeholder='이메일을 입력하시오.' onChange={(e) => this.emailUpdate(e)} />
        <h4>닉네임</h4>
        <input type='text' placeholder='닉네임을 입력하시오.' onChange={(e) => this.nicknameUpdate(e)} />
        <a>&nbsp;</a>
        <button className='loginbtn' onClick={this.getKeywordData}>중복 확인</button>
        <div className='overlap'>중복확인을 해주세요.</div>
        <h4>비밀번호</h4>
        <input type='password'placeholder='비밀번호를 입력하시오.' onChange={(e) => this.passwordUpdate(e)} />
        <form method='POST' onSubmit={this.addData}>
          <h4>
            <div>
              {
                this.state.nickname.length == 0 || this.state.password.length == 0 || this.state.email.length == 0
                  ? <button disabled={true}>완료</button>
                  : (nicknameList.length !== 0
                    ? nicknameList.map((key) => {
                      return (
                        <div key={key}>
                          <button className='loginbtn' disabled={true}>완료</button>
                        </div>
                      )
                    })
                    : <button className='loginbtn' type='submit'>완료</button>
                  )
              }
            </div>
          </h4>
        </form>
      </div>
    );
  }
}

export default Signup;