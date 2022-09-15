import { useSearchParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import moment from "moment";

function Post() {
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

    const res = await axios('/add/eatpost', {
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
      window.location.replace('/Joblist/Eat');
    }
  }

  const titleUpdate = (e) => {
    setTitle(e.target.value);
  }

  const contentUpdate = (e) => {
    setContent(e.target.value);
  }


  return (
    <>

      <h2>
        글쓰기
      </h2>
      <div>
        <div>제목</div> <input type={'text'} placeholder="제목" style={{ width: '300px' }} onChange={(e) => titleUpdate(e)}></input>
      </div>
      <br />
      <div style={{ padding: '10px' }} >내용</div><input type={'text'} placeholder="내용" style={{ width: '300px', height: '200px' }} onChange={(e) => contentUpdate(e)} ></input>
      {/* <h4>지도</h4>
            <div className='map'>
                <Location/>
            </div> */}
      <br />
      <br />
      <form method='POST' onSubmit={addData} ><button>올리기</button></form>

    </>
  );
}



export default Post;