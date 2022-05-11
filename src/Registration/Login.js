import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            sample1List: [],
        }
    };

    nicknameUpdate(e) {
        this.setState({ nickname: e.target.value })
    }
    passwordUpdate(e) {
        this.setState({ password: e.target.value })
    }

    getMultiKeywordData = async () => {
        const res = await axios('/get/multiKeywordData', {
            method: 'POST',
            data: {
                'nickname': this.state.nickname,
                'password': this.state.password
            },
            headers: new Headers()
        })
        this.setState({
            sample1List: res.data
        })  
        if(this.state.sample1List.length !== 0){
            alert('로그인 성공')
          }else{
            alert('아이디 비밀번호를 다시 확인해 주세요.')
          }
    }

    render() {
        const { sample1List } = this.state;
        return (
            <>
                <div className='login'>
                    <h1>Login</h1>
                    <h4>닉네임</h4>
                    <input type='text' maxLength='10' placeholder='닉네임을 입력하시오.' onChange={(e) => this.nicknameUpdate(e)} />
                    <h4>비밀번호</h4>
                    <input type='password' maxLength='20' placeholder='비밀번호를 입력하시오.' onChange={(e) => this.passwordUpdate(e)} />
                    <h4></h4>
                    <a>
                        {
                            sample1List.length !== 0 
                            ?
                                sample1List.map((el, key) => 
                                {
                                    return (
                                        <>
                                        <div key={key}>
                                        <meta http-equiv='refresh' content='0;url=Joblist'/>
                                        {
                                            sessionStorage.setItem('nickname', el.nickname ) // 로그인 닉네임 값 보내기
                                        }
                                       </div>
                                       </>
                                    )
                                })
                                : null
                        }
                    </a>
                    <h4>
                        <button onClick={this.getMultiKeywordData} >Login</button>
                    </h4>
                    <a className='href' href='Findnickname'>닉네임 찾기 | </a>
                    <a className='href' href='Findpassword'>비밀번호 찾기 | </a>
                    <a className='href' href='Signup'>회원가입</a>
                </div>
            </>
        );
    }
}

export default Login;