import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai";

function Managementboard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sample1List, setSample1List] = useState([]);

    const nickname = sessionStorage.getItem('nickname');
    const [searchParams, setSearchParams] = useSearchParams();
    const area = searchParams.get('area');
    const jobname = searchParams.get('jobname');

    const getKeywordManagementboardData = async () => {
        const res = await axios('/get/keywordManagementpostData', {
            method: 'POST',
            data: {
                'area': area,
                'jobname': jobname,
            }
        });
        setSample1List(res.data);
    }

    useEffect(() => {
        getKeywordManagementboardData();
    }, []);

    return (
        <>
            <a className='login' ><h1>{jobname}</h1>{area}</a>
            <br />
            <br />
            <h2 className='login'>게시글</h2>
            <hr color='#660000' />
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div className='note'>
                                <Link className='textsize' style={{ textDecoration: 'none', color: '#660000' }} to={{ pathname: `/Joblist/Managementboardinfo?area=${el.area}&jobname=${el.jobname}&nickname=${el.nickname}&title=${el.title}` }}> {el.title}</Link>
                                <div>
                                    <span> {el.nickname} </span>
                                </div>
                                <span> {el.date} </span>

                            </div>
                            <hr />
                        </div>
                    )
                })
                : <div>게시글이 없습니다.</div>}

            <br />

            {
                nickname !== null
                    ? <div className="btn_area"><button className='loginbtn'><Link style={{ textDecoration: 'none', color: '#660000' }} to={{ pathname: `/Joblist/Managementpost?area=${area}&jobname=${jobname}` }}><AiFillEdit size='30px' /></Link></button></div>
                    : <div className="btn_area" ><button className='loginbtn' style={{ padding: '5px' }} onClick={Posts}><AiFillEdit size='30px' /></button></div>

            }
        </>
    )
}

function Posts() {
    alert('로그인을 해주세요.')
}
export default Managementboard;
