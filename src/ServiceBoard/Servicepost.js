import { useSearchParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import moment from "moment";

function Servicepost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const today = moment();
  const date = today.format('YYYY-MM-DD');
  const nickname = sessionStorage.getItem('nickname');
  const [searchParams, setSearchParams] = useSearchParams();
  const area = searchParams.get('area');
  const jobname = searchParams.get('jobname');

  const addData = async (e) => {
    e.preventDefault();

    const res = await axios('/add/Servicepost', {
      method: 'POST',
      data: {
        'area': area,
        'jobname': jobname,
        'nickname': nickname,
        'title': title,
        'content': content,
        'date': date,
      }
    });

    if (res.data) {
      alert('게시글이 등록되었습니다.');
      window.location.replace('/Joblist/Service');
    }
  }

  const titleUpdate = (e) => {
    setTitle(e.target.value);
  }

  const contentUpdate = (e) => {
    setContent(e.target.value);
  }


  return (
    <div style={{ background: '#cecece', height: '840px' }}>
      <h2 className='login'>
        글쓰기
      </h2>
      <hr color='#202f57'/>
      <div >
      <div >
        <div style={{ color: '#202f57' }} >제목</div> <input type={'text'} placeholder="제목" style={{ width: '300px' }} onChange={(e) => titleUpdate(e)}></input>
      </div>
      <div  style={{ padding: '10px', color: '#202f57' }} >내용</div><input  type={'text'} placeholder="내용" style={{ width: '300px', height: '200px' }} onChange={(e) => contentUpdate(e)} ></input>
      <br />
      <br />
      </div>
      <hr color='#202f57'/>
      <form method='POST' onSubmit={addData} ><button className='loginbtn'>올리기</button></form>

    </div>
  );
}



export default Servicepost;