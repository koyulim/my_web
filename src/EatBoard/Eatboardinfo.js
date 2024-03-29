import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import moment from "moment";
import Modal from 'react-modal';


function Eatboardinfo() {

    const today = moment();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [conversation, setConversation] = useState('');
    const dates = today.format('YYYY-MM-DD hh:mm:ss');

    const [comment, setComment] = useState('');
    const [sample1List, setSample1List] = useState([]);
    const [sample2List, setSample2List] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const date = today.format('YYYY-MM-DD');
    const nickname = sessionStorage.getItem('nickname');
    const area = searchParams.get('area');
    const nicknames = searchParams.get('nickname');
    const title = searchParams.get('title');
    const jobname = searchParams.get('jobname');

    const conversationUpdate = (e) => {
        setConversation(e.target.value);
    }

    const addDatas = async (e) => {
        e.preventDefault();

        const res = await axios('/add/Eatnote', {
            method: 'POST',
            data: {
                'user_name': nicknames,
                'my_name': nickname,
                'conversation': conversation,
                'date': dates,
            }
        });

        if (res.data) {
            alert('쪽지가 전송되었습니다.');
            setModalIsOpen(false);
        }
    }

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
            const res = await axios('/delete/Eatdata', {
                method: 'POST',
                data: { 'delete': target }
            })

            if (res.data) {
                alert('데이터를 삭제했습니다.')
                return window.location.replace('Eat');
            }
        }
    }

    const deletecommentpost = async (el) => {
        const remove = window.confirm(el.comment + '을 삭제하시겠습니까?');

        if (remove) {
            const target = { id: el.id }
            const res = await axios('/delete/Eatcommentdata', {
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

        const res = await axios('/add/Eatcomment', {
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

            const res = await axios('/modify/Eatdata', {
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
        <div style={{ background: '#cecece', height: '840px' }}>
            <br />
            <Modal
                className='Modal2'
                isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(true)}>
                <div className='note2'>
                    <div className='right'><button onClick={() => setModalIsOpen(false)}>x</button></div>
                    <br />
                    <h3 style={{ fontWeight: 'bold', textAlign: 'center' }} >쪽지 보내기</h3>
                    <br />
                    <div>
                        <div style={{ padding: '10px' }}>
                            <a style={{ fontWeight: 'bold' }}>보낸 사람 : </a>
                            <a className="madaltext">{nickname}</a>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <a style={{ fontWeight: 'bold' }}>받은 사람 : </a>
                            <a className="madaltext">{nicknames}</a>
                        </div>
                        <div style={{ padding: '10px' }}>
                            <a style={{ fontWeight: 'bold' }}>보낸 시간 : </a>
                            <a>{dates}</a>
                        </div>
                        <hr />
                        <div style={{ fontWeight: 'bold', textAlign: 'center' }} >내용</div>
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <input type={'text'} placeholder="comment..." style={{ width: '200px', height: '200px', textAlign: 'center' }} onChange={(e) => conversationUpdate(e)} ></input>
                            <br />
                            <br />
                        </div>
                        <form className='center' method='POST' onSubmit={addDatas}><button className='loginbtn' >보내기</button>
                        </form>
                    </div>
                </div>
            </Modal>
            <br />
            <div className="board">
            <h2 >상세내용</h2>
            <hr color='#202f57' />
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div >
                                <div style={{ padding: '10px', fontSize: '20px' }}>제목 : {el.title}</div>
                                <div style={{ padding: '10px', fontSize: '20px' }} ><span> 내용 : {el.content} </span> </div>
                                <div style={{ padding: '10px' }} ><span> 작성자 : {el.nickname} </span></div>
                                <div style={{ padding: '10px' }} ><span> {el.date} </span></div>
                            </div>
                            <div >
                                {el.nickname == nickname ?
                                    <div style={{ padding: '10px' }}>
                                        <button className='loginbtn'><Link style={{ textDecoration: 'none', color: '#202f57' }} to={{ pathname: `/Joblist/Eatrevise?area=${el.area}&jobname=${el.jobname}&nickname=${el.nickname}&title=${el.title}` }}>수정</Link></button>&nbsp;&nbsp;
                                        <button className='loginbtn' onClick={() => deletepost(el)}>삭제</button>
                                    </div>
                                    : <div>
                                        {nickname !== null ?
                                            <button className='loginbtn' style={{ padding: '5px' }} onClick={() => setModalIsOpen(true)} >쪽지보내기</button>
                                            :
                                            <div><button className='loginbtn' style={{ padding: '5px' }} onClick={Posts}>쪽지보내기</button></div>

                                        }
                                    </div>
                                }
                            </div>
                            <hr color='#202f57'/>
                        </div>
                    )
                })
                : <div>데이터가 없습니다.</div>
            }
            
            </div>
            <br />
            <br />
            <div className="board">
                <h3 style={{ textAlign: 'left', marginLeft: '27px' }} >댓글</h3>
                <hr/>

                {sample2List.length !== 0 ?
                    sample2List.map((el, key) => {
                        return (
                            <div key={key}>
                                <div style={{ marginLeft: '20px' }} >
                                    <div className="left">
                                        <div >
                                            {el.nickname == nickname ?
                                                <div>
                                                    <button className="loginbtnright" onClick={() => modify(el)}>수정</button>
                                                    <button className="loginbtnright" onClick={() => deletecommentpost(el)}>삭제</button>
                                                </div>
                                                : <div>
                                                    {nickname !== null ?
                                                        <button className="loginbtnright" style={{ padding: '5px' }} onClick={() => setModalIsOpen(true)} >쪽지보내기</button>
                                                        :
                                                        <div><button className="loginbtnright" style={{ padding: '5px' }} onClick={Posts}>쪽지보내기</button></div>

                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div style={{ marginLeft: '20px', fontWeight: 'bold', margin: '5px' }} ><span> 작성자 : {el.nickname} </span> </div>
                                        <div style={{ marginLeft: '20px', margin: '5px', fontSize: '20px' }}> 내용 : {el.comment}</div>
                                        <div style={{ marginLeft: '20px', fontWeight: 'bold', margin: '5px', fontSize: '10px' }} ><span> {el.date} </span></div>

                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    })
                    : <div className='login'>댓글이 없습니다.</div>
                }

                <input type={'text'} placeholder="comment..." style={{ width: '300px' }} onChange={(e) => commentUpdate(e)} ></input>
                <a>&nbsp;</a>
                <a>&nbsp;</a>
                {nickname !== null
                    ? <form className="inlin" method='POST' onSubmit={addData}><button className='loginbtn'>댓글 달기</button></form>
                    : <button className='loginbtn' onClick={Posts}>댓글달기</button>
                }
            </div>

        </div>
    )
}

function Posts() {
    alert('로그인을 해주세요.')
}
export default Eatboardinfo;