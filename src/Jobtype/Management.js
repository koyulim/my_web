import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Management() {

  const [area, setArea] = useState('');
  const [jobname, setJobname] = useState('');
  const [sample1List, setSample1List] = useState([]);

  const areaUpdate = (e) => {
    //setState({ area: e.target.value })
    setArea(e.target.value);
  }

  const jobnameUpdate = (e) => {
    //setState({ jobname: e.target.value })
    setJobname(e.target.value);
  }


  const getKeywordmanageData = async () => {
    const res = await axios('/get/keywordmanageData', {
      method: 'POST',
      data: {
        'area': area,
        'jobname': jobname
      }
    });
    setSample1List(res.data);
  }

  const getData = async () => {
    const res = await axios.get('/get/managedata');
    setSample1List(res.data);
  }

  useEffect(() => {
    getData();
  }, []);


  return (

    <>
      <div className='App'>
        <h2>Management List</h2>
        <input type='text' maxLength='10' placeholder='지역 검색' onChange={(e) => areaUpdate(e)} />
        <input type='text' maxLength='20' placeholder='가게 이름 검색' onChange={(e) => jobnameUpdate(e)} />
        <button onClick={getKeywordmanageData}>Search</button>
        <button onClick={getData}>ListAll</button>

        <br />
        <br />
        <h3>지역 | 가게 이름 | 날짜</h3>
        <hr />

        {sample1List.length !== 0 ?
          sample1List.map((el, key) => {
            return (
              <div key={key}>
                <div >
                  {/* <span>  {el.url} </span>/ */}
                  <span> {el.area} </span> |
                  <span> {el.jobname} </span> |
                  <span> {el.date} </span>
                </div>
                <div style={{ padding: '10px' }}>
                  <button onClick={() => window.open('https://www.albamon.com/recruit/view/gi?AL_GI_No=' + el.url + '&mj_stat=0&optgf=', '_blank')} >자세히 보기</button>
                  <button><a className='href' href='Board'>후기글 보기</a></button>
                </div>
                <hr />
              </div>
            )
          })
          : <div>데이터가 없습니다.</div>}
      </div>
    </>
  )
}

export default Management;