import React, { Component } from 'react';
import axios from 'axios';

class Findnickname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            nickname: '',
            password: '',
            sample1List: [],
        }
    };

    emailUpdate(e) {
        this.setState({ email: e.target.value })
    }
    nicknameUpdate(e) {
        this.setState({ nickname: e.target.value })
    }


    getemailnicknameDataData = async () => {
        const res = await axios('/get/emailnicknameData', {
            method: 'POST',
            data: {
                'email': this.state.email,
                'nickname': this.state.nickname
            },
            headers: new Headers()
        });
        this.setState({
            sample1List: res.data
        })

        if (this.state.sample1List.length === 0) {
            alert('이메일과 닉네임 모두를 정확하게 입력해 주세요.')
        }

    }

    render() {
        const { sample1List } = this.state;
        return (
            <>
                <div className='login'>
                    <h1>비밀번호 찾기</h1>
                    <h4>이메일</h4>
                    <input type='email' placeholder='이메일을 입력하시오.' onChange={(e) => this.emailUpdate(e)} />
                    <h4></h4>
                    <h4>닉네임</h4>
                    <input type='text' placeholder='닉네임을 입력하시오.' onChange={(e) => this.nicknameUpdate(e)} />
                    <h4></h4>
                    <a>
                        {sample1List.length !== 0 ?
                            sample1List.map((el, key) => {
                                return (
                                    <div key={key}>
                                        <span className='overlap'> 당신의 Password 은 {el.password} 입니다. </span>
                                    </div>
                                )
                            })
                            : null
                        }


                    </a>
                    <h4>
                        <button onClick={this.getemailnicknameDataData} >조회하기</button>
                    </h4>

                </div>
            </>
        );
    }
}

export default Findnickname;