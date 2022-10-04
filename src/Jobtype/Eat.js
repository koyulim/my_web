import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Eat() {
  const [area, setArea] = useState('');
  const [id, setId] = useState('');
  const [jobname, setJobname] = useState('');
  const [sample1List, setSample1List] = useState([]);

  const areaUpdate = (e) => {
    //this.setState({ area: e.target.value })
    setArea(e.target.value);
  }

  const jobnameUpdate = (e) => {
    //this.setState({ jobname: e.target.value })
    setJobname(e.target.value);
  }

  const getKeywordEatData = async () => {
    const res = await axios('/get/keywordEatData', {
      method: 'POST',
      data: {
        'id' : id,
        'area': area,
        'jobname': jobname
      }
    });
    setSample1List(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('/get/eatdata');
    // this.setState({
    //   sample1List: res.data
    // })
    setSample1List(res.data);
  }

  return (
    <>
      <div className='login'>
        <h2>Eat List</h2>
        <input type='text' maxLength='10' placeholder='지역 검색' onChange={(e) => areaUpdate(e)} />
        <input type='text' maxLength='20' placeholder='가게 이름 검색' onChange={(e) => jobnameUpdate(e)} />
        <a>&nbsp;&nbsp;</a>
        <button className='loginbtn' onClick={getKeywordEatData}>Search</button>
        <a>&nbsp;</a>
        <button className='loginbtn' onClick={getData}>ListAll</button>
        <br />
        <br />
        <h3>지역 | 가게 이름 | 날짜</h3>
        <hr color='#660000'/>
        {sample1List.length !== 0 ?
          sample1List.map((el, key) => {
            return (
              <div key={key}>
                <div className='note'>
                  {/* <span>  {el.id} </span>/ */}
                  <span> {el.area} </span> |
                  <span> {el.jobname} </span> |
                  <span> {el.date} </span>
                </div>
                <div className='note' style={{ padding: '10px' }}>
                  <button className='loginbtn' onClick={() => window.open('https://www.albamon.com/recruit/view/gi?AL_GI_No=' + el.url + '&mj_stat=0&optgf=', '_blank')} >자세히 보기</button>
                  <a>&nbsp;&nbsp;</a>
                  <button className='loginbtn'><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatboard?area=${el.area}&jobname=${el.jobname}` }} >후기글 보기</Link></button>
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
export default Eat;