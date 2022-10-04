import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import moment from "moment";

function Eatboardinfo() {
    const [comment, setComment] = useState('');
    const [sample1List, setSample1List] = useState([]);
    const [sample2List, setSample2List] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const today = moment();
    const date = today.format('YYYY-MM-DD');
    const nickname = sessionStorage.getItem('nickname');
    const area = searchParams.get('area');
    const nicknames = searchParams.get('nickname');
    const title = searchParams.get('title');
    const jobname = searchParams.get('jobname');


    const getKeywordEatpostData = async () => {
        const res = await axios('/get/keywordEatpostinfoData', {
            method: 'POST',
            data: {
                'title': title,
                'area': area,
                'jobname': jobname,
                'nickname': nicknames,
            }
        },);
        setSample1List(res.data);
    }

    const getKeywordEatcommentData = async () => {
        const res = await axios('/get/keywordEatcommentData', {
            method: 'POST',
            data: {
                'title': title,
                'area': area,
                'jobname': jobname,
            }
        },);
        setSample2List(res.data);
    }

    useEffect(() => {
        getKeywordEatpostData();
        getKeywordEatcommentData();
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

    const deletecommentpost = async (el) => {
        const remove = window.confirm(el.comment + '을 삭제하시겠습니까?');

        if (remove) {
            const target = { id: el.id }
            const res = await axios('/delete/commentdata', {
                method: 'POST',
                data: { 'delete': target }
            })

            if (res.data) {
                alert('데이터를 삭제했습니다.')
                return window.location.reload();
            }
        }
    }

    const commentUpdate = (e) => {
        setComment(e.target.value);
    }

    const addData = async (e) => {
        e.preventDefault();

        const res = await axios('/add/eatcomment', {
            method: 'POST',
            data: {
                'area': area,
                'jobname': jobname,
                'nickname': nickname,
                'title': title,
                'date': date,
                'comment': comment,
            }
        });

        if (res.data) {
            alert('댓글이 등록되었습니다.');
            window.location.reload();
        }
    }

    const modify = async (el) => {
        const comment = prompt('변경할 내용을 입력해주세요.')

        if (comment !== null) {
            const dataToModify = {
                comment: comment,
                date: date + ('   (수정됨)'),
                id: el.id

            }

            const res = await axios('/modify/data', {
                method: 'POST',
                data: { 'modify': dataToModify },
                headers: new Headers()
            })

            if (res.data) {
                console.log(res.data[0]);
                alert(' 수정되었습니다.')
                return window.location.reload();
            }
        }
    }

    return (
        <>
            <br />
            <br />
            <h2 className='login'>상세내용</h2>
            <hr color='#660000' />
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div className='note'>
                                <div className='textsize'>제목 : {el.title}</div>
                                <div style={{ padding: '10px' }} ><span> 내용 : {el.content} </span> </div>
                                <div style={{ padding: '10px' }} ><span> 작성자 : {el.nickname} </span></div>
                                <div style={{ padding: '10px' }} ><span> {el.date} </span></div>
                                {el.nickname != nickname ?
                                    <button className='loginbtn' style={{ padding: '5px' }} ><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnote?user_namer=${el.nickname}` }}>쪽지보내기</Link></button>
                                    :
                                    <div></div>
                                }
                            </div>
                            <div className='note'>
                                {el.nickname == nickname ?
                                    <div style={{ padding: '10px' }}>
                                        <button className='loginbtn'><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatrevise?area=${el.area}&jobname=${el.jobname}&nickname=${el.nickname}&title=${el.title}` }}>수정</Link></button>
                                        <button className='loginbtn' onClick={() => deletepost(el)}>삭제</button>
                                    </div>
                                    : <div></div>
                                }
                            </div>
                            <hr />
                        </div>
                    )
                })
                : <div>데이터가 없습니다.</div>
            }
            <br />
            <br />
            <div>
                <h3 className='login' >댓글</h3>
                <hr color='#660000' />

                {sample2List.length !== 0 ?
                    sample2List.map((el, key) => {
                        return (
                            <div key={key}>
                                <div className='note' >
                                    <div className='textsize'> 내용 : {el.comment}</div>
                                    <div style={{ padding: '10px' }} ><span> 작성자 : {el.nickname} </span> </div>
                                    <div style={{ padding: '10px' }} ><span> {el.date} </span> </div>
                                    {el.nickname != nickname ?
                                        <button className='loginbtn' style={{ padding: '5px' }}><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnote?user_namer=${el.nickname}` }}>쪽지보내기</Link></button>
                                        :
                                        <div></div>
                                    }
                                </div>

                                <div className='note'>
                                    {el.nickname == nickname ?
                                        <div style={{ padding: '10px' }}>
                                            <button className='loginbtn' onClick={() => modify(el)}>수정</button>
                                            <a>&nbsp;</a>
                                            <button className='loginbtn' onClick={() => deletecommentpost(el)}>삭제</button>
                                        </div>
                                        : <div></div>
                                    }
                                </div>
                                <hr />
                            </div>
                        )
                    })
                    : <div className='login'>댓글이 없습니다.</div>
                }

                <input type={'text'} placeholder="comment..." style={{ width: '300px' }} onChange={(e) => commentUpdate(e)} ></input>
                {nickname !== null
                    ? <form method='POST' onSubmit={addData}><button className='loginbtn'>댓글 달기</button></form>
                    : <button style={{ padding: '5px' }} onClick={Posts}>글쓰기</button>

                }

            </div>

        </>
    )
}

function Posts() {
    alert('로그인을 해주세요.')
}
export default Eatboardinfo;