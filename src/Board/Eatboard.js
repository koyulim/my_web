import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Eatboard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sample1List, setSample1List] = useState([]);

    const nickname = sessionStorage.getItem('nickname');
    const [searchParams, setSearchParams] = useSearchParams();
    const area = searchParams.get('area');
    const jobname = searchParams.get('jobname');
   
    const getKeywordEatData = async () => {
        const res = await axios('/get/keywordEatpostData', {
            method: 'POST',
            data: {
                'area': area,
                'jobname': jobname,
            }
        });
        setSample1List(res.data);
    }

    useEffect(() => {
        getKeywordEatData();
    }, []);



    const deletepost = async (el) => {
        const remove = window.confirm(el.title + '을 삭제하시겠습니까?');

        if (remove) {
            const target = { id: el.id }
            const res = await axios('/delete/data', {
                method: 'POST',
                data: { 'delete': target }
            })

            if (res.data) {
                alert('데이터를 삭제했습니다.')
                return window.location.reload();
            }
        }
    }

    return (
        <>
            <a><h1>{jobname}</h1>{area}</a>
            <br />
            <br />
            <h2>게시글</h2>
            <hr></hr>
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div>
                                <Link  className='textsize' style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatboardinfo?area=${el.area}&jobname=${el.jobname}&nickname=${el.nickname}&title=${el.title}` }}> {el.title}</Link>
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
                    ? <div><button><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Post?area=${area}&jobname=${jobname}` }}>글쓰기</Link></button></div>
                    : <button style={{ padding: '5px' }} onClick={Posts}>글쓰기</button>

            }
        </>
    )
}

function Posts() {
    alert('로그인을 해주세요.')
}
export default Eatboard;
