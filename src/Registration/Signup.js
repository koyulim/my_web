import React, { Component } from 'react';

class Signup extends Component {
    render() {
        return (
            <div className='signup'>
                <h2>회원가입</h2>
                <h4>닉네임</h4>
                <input></input><button>중복 확인</button>
                <h4>비밀번호</h4>
                <input></input>
                <h4>비밀번호 확인</h4>
                <input></input>
                <h4>
                    <button>완료</button>
                </h4>
            </div>
        );
    }
}

export default Signup;