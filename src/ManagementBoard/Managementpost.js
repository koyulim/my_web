import { useSearchParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import moment from "moment";

function Managementpost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const today = moment();
  const date = today.format('YYYY-MM-DD');
  const nickname = sessionStorage.getItem('nickname');
  const [searchParams, setSearchParams] = useSearchParams();
  const area = searchParams.get('area');
  const jobname = searchParams.get('jobname');
  console.log("test : " + area);
  console.log("test : " + jobname);

  const addData = async (e) => {
    e.preventDefault();

    const res = await axios('/add/Managementpost', {
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
      window.location.replace('/Joblist/Management');
    }
  }

  const titleUpdate = (e) => {
    setTitle(e.target.value);
  }

  const contentUpdate = (e) => {
    setContent(e.target.value);
  }


  return (
    <div>
      
      <h2 className='login'>
        글쓰기
      </h2>
      <hr color='#660000'/>
      <div className='note'>
      <div className='note'>
        <div className='note'>제목</div> <input type={'text'} placeholder="제목" style={{ width: '300px' }} onChange={(e) => titleUpdate(e)}></input>
      </div>
      <div className='note' style={{ padding: '10px' }} >내용</div><input  type={'text'} placeholder="내용" style={{ width: '300px', height: '200px' }} onChange={(e) => contentUpdate(e)} ></input>
      <br />
      <br />
      </div>
      <hr color='#660000'/>
      <form method='POST' onSubmit={addData} ><button className='loginbtn'>올리기</button></form>

    </div>
  );
}



export default Managementpost;