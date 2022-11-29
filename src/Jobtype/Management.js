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

    <div>
      <div className='login'>
        <h2>Management List</h2>
        <input type='text' maxLength='10' placeholder='지역 검색' onChange={(e) => areaUpdate(e)} />
        <a>&nbsp;</a>
        <input type='text' maxLength='20' placeholder='가게 이름 검색' onChange={(e) => jobnameUpdate(e)} />
        <a>&nbsp;&nbsp;</a>
        <button className='loginbtn' onClick={getKeywordmanageData}>Search</button>
        <a>&nbsp;</a>
        <button className='loginbtn' onClick={getData}>ListAll</button>
        <br />
        <br />
        <br />


        <div className="board1">
          <div style={{ display: 'inline-block' }}>
            <table class="type09">
              <thead style={{ textAlign: 'center' }}>
                <tr>
                  <th>지역</th>
                  <td>회사명/공고제목</td>
                  <td>날짜</td>
                  <td>보기</td>
                </tr>
              </thead>
            </table>
            <hr style={{ width: '1000px', height: '1px', border: 'none'}}/>
          </div>
          {Array.isArray(sample1List) ?
            sample1List.map((el, key) => {
              return (
                <div key={key}>
                  <div style={{ display: 'inline-block' }}>
                    <table class="type09">
                      <tbody style={{ textAlign: 'center' }}>
                        <tr>
                          <th> {el.area} </th>
                          <td> {el.jobname} </td>
                          <td> {el.date} </td>
                          <td><a style={{ padding: '10px' }}>
                            <button className='loginbtn' onClick={() => window.open('https://www.albamon.com/recruit/view/gi?AL_GI_No=' + el.url + '&mj_stat=0&optgf=', '_blank')} >자세히 보기</button>
                            <a>&nbsp;&nbsp;</a>
                            <button className='loginbtn'><Link style={{ textDecoration: 'none', color: '#202f57' }} to={{ pathname: `/Joblist/Managementboard?area=${el.area}&jobname=${el.jobname}` }} >후기글 보기</Link></button>
                          </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr style={{ width: '1250px', height: '1px', backgroundColor: '#cecece', border: 'none'}}/>
                </div>
              )
            })
            : null}
        </div>
        <br/>
        <br/>

        <div className="board2">
          <div style={{ display: 'inline-block' }}>
            <table class="type09">
              <thead style={{ textAlign: 'center' }}>
                <tr>
                  <th>지역</th>
                  <td>공고제목</td>
                  <td>날짜</td>
                </tr>
              </thead>
            </table>
            <hr style={{ width: '300px', height: '1px', border: 'none'}}/>
          </div>
          {Array.isArray(sample1List) ?
            sample1List.map((el, key) => {
              return (
                <div key={key}>

                  <div style={{ display: 'inline-block' }}>
                    <table class="type09">
                      <tbody style={{ textAlign: 'center' }}>
                        <tr>
                          <th> {el.area} </th> 
                          <td> {el.jobname} </td> 
                          <td> {el.date} </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{ padding: '10px' }}>
                            <button className='loginbtn' onClick={() => window.open('https://www.albamon.com/recruit/view/gi?AL_GI_No=' + el.url + '&mj_stat=0&optgf=', '_blank')} >자세히 보기</button>
                            <a>&nbsp;&nbsp;</a>
                            <button className='loginbtn'><Link style={{ textDecoration: 'none', color: '#202f57' }} to={{ pathname: `/Joblist/Managementboard?area=${el.area}&jobname=${el.jobname}` }} >후기글 보기</Link></button>
                          </div>
                          
                  </div>
                  <hr style={{ width: '350px', height: '1px', backgroundColor: '#cecece', border: 'none'}}/>
                </div>
              )
            })
            : null}
        </div>



      </div>
    </div>
  )
}

export default Management;