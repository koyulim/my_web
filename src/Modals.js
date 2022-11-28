
import Modal from 'react-modal';
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import moment from "moment";

function Modals ({ isOpen, onCancel, user_name }) {

  const [conversation, setConversation] = useState('');
  const nickname = sessionStorage.getItem('nickname');
  const today = moment();
  const dates = today.format('YYYY-MM-DD hh:mm:ss');

  const handleClickCancel = () => {
    onCancel();
  };

  const conversationUpdate = (e) => {
    setConversation(e.target.value);
}

const addDatas = async (e) => {
    e.preventDefault();

    const res = await axios('/add/eatnote', {
        method: 'POST',
        data: {
            'user_name': user_name,
            'my_name': nickname,
            'conversation': conversation,
            'date': dates,
        }
    });

    if (res.data) {
        alert('쪽지가 전송되었습니다.');
        return window.location.reload();
    }
}

  return (
    <>
      <Modal className= 'Modal2' isOpen={isOpen}>
        <div className='note2'>
                    <div className='right'><button onClick={handleClickCancel} >x</button></div>
                    <br/>
                    <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>답장 보내기</h3>
                    <br/>
                    <div>
                    <div style={{ padding: '10px' }}>
                      <a style={{ fontWeight: 'bold'}}>보낸 사람 : </a>
                      <a className="madaltext">{nickname}</a>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <a style={{ fontWeight: 'bold'}}>받은 사람 : </a>
                      <a className="madaltext">{user_name}</a>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <a style={{ fontWeight: 'bold' }} >보낸 시간 :</a> 
                      <a>{dates}</a>
                    </div>
                    <hr/>
                    <div style={{ fontWeight: 'bold', textAlign: 'center'}} >내용</div>
                    <br/>
                    <div style={{textAlign: 'center' }}>
                    <input type={'text'} placeholder="comment..." style={{ width: '200px', height: '200px',textAlign: 'center' }} onChange={(e) => conversationUpdate(e)} ></input>
                    <br/>
                    <br/>
                    </div>
                    <hr/>
                    <form className='center' method='POST' onSubmit={addDatas}><button className='loginbtn' >보내기</button>
                    </form>
                    </div>
                </div>
      </Modal>
    </>

  );
};

export default Modals;