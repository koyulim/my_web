import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";

function Serviceboard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sample1List, setSample1List] = useState([]);

    const nickname = sessionStorage.getItem('nickname');
    const [searchParams, setSearchParams] = useSearchParams();
    const area = searchParams.get('area');
    const jobname = searchParams.get('jobname');

    const getKeywordServiceData = async () => {
        const res = await axios('/get/keywordServicepostData', {
            method: 'POST',
            data: {
                'area': area,
                'jobname': jobname,
            }
        });
        setSample1List(res.data);
    }

    useEffect(() => {
        getKeywordServiceData();
    }, []);

    return (
        <div style={{ background: '#cecece', height: '830px' }}>
            <div>
            <hr style={{ width: '300px', height: '3px', backgroundColor: '#202f57', border: 'none'}}/>
            <h1 style={{ color: '#202f57' }} >{jobname}</h1>
            <a style={{ color: '#202f57' }} >[{area}]</a>
            <br/>
            <br/>
            <hr style={{ width: '300px', height: '3px', backgroundColor: '#202f57', border: 'none'}}/>
            </div>
            <br />
            <br />
            <br/>
            <div className="board3">게시글</div>
            <div style={{ display: 'inline-block' }} >
            <table class="type09">
            <thead style={{ textAlign: 'center'}}>
            <tr>
              <th style={{ backgroundColor: 'white', color: '#202f57' }} >제목</th>
              <td style={{ backgroundColor: 'white', color: '#202f57' }} >내용</td>
              <td style={{ backgroundColor: 'white', color: '#202f57' }} >날짜</td>
            </tr>
          </thead>
            </table>
            </div>
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div style={{ display: 'inline-block' }} >
                            <table class="type09">
                                <tbody>
                                <Link style={{ textDecoration: 'none', color: '#202f57' }} to={{ pathname: `/Joblist/Serviceboardinfo?area=${el.area}&jobname=${el.jobname}&nickname=${el.nickname}&title=${el.title}` }}> 
                                <tr>
                                    <th scope="row">
                                    {el.title}
                                    </th>
                                    <td>
                                    <span> {el.nickname} </span>
                                    </td>
                                    <td>
                                    <span> {el.date} </span>
                                    </td>
                                </tr>
                                </Link>
                                </tbody>
                            </table>

                            </div>
                        </div>
                    )
                })
                : <div>게시글이 없습니다.</div>}

            <br />

            {
                nickname !== null
                    ? <div className="btn_area"><button className='loginbtn'><Link style={{ textDecoration: 'none', color: '#202f57' }} to={{ pathname: `/Joblist/Servicepost?area=${area}&jobname=${jobname}` }}><AiFillEdit size='30px' /></Link></button></div>
                    : <div className="btn_area" ><button className='loginbtn' style={{ padding: '5px' }} onClick={Posts}><AiFillEdit size='30px' /></button></div>

            }
        </div>
    )
}

function Posts() {
    alert('로그인을 해주세요.')
}
export default Serviceboard;
