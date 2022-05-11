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


    getemailData = async () => {
        const res = await axios('/get/emailData', {
          method: 'POST',
          data: {
            'email': this.state.email
          },
          headers: new Headers()
        });
        this.setState({
            sample1List: res.data
        })

        if (this.state.sample1List.length === 0) {
            alert('닉네임을 정확하게 입력해 주세요.')
        }

    }



    render() {
        const { sample1List } = this.state;
        return (
            <>
                <div className='login'>
                    <h1>닉네임 찾기</h1>
                    <h4>이메일</h4>
                    <input type='email' placeholder='이메일을 입력하시오.' onChange={(e) => this.emailUpdate(e)} />
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
                            : null }
                    </a>
                    <h4>
                        <button onClick={this.getemailData} >조회하기</button>
                    </h4>
                    
                </div>
            </>
        );
    }
}

export default Findnickname;