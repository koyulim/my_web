
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
      <Modal isOpen={isOpen}
      
      style={{
        overlay: {
          position : 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          position: 'fixed',
          top: '100px',
          left: '800px',
          right: '800px',
          bottom: '410px',
          border: '1px solid #ccc',
          background: '#F3ABB3',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '10px'
        }
      }}>
        <div className='note'>
                    <div className='right'><button onClick={handleClickCancel} >x</button></div>
                    <br/>
                    <h3>답장 보내기</h3>
                    <br/>
                    <div>
                    <div>받은 사람 : {user_name}</div>
                    <hr/>
                    <div>보낸 시간 : {dates}</div>
                    <hr/>
                    <div>내용</div>
                    <br/>
                    <input type={'text'} placeholder="comment..." style={{ width: '300px', height: '200px' }} onChange={(e) => conversationUpdate(e)} ></input>
                    <br/>
                    <br/>
                    <form className='center' method='POST' onSubmit={addDatas}><button className='loginbtn' >보내기</button>
                    </form>
                    </div>
                </div>
      </Modal>
    </>

  );
};

export default Modals;