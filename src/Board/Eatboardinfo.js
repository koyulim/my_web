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

        const res = await axios('/add/eatnote', {
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
            
            <Modal 

             style={{
                overlay: {
                  position : 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)'
                },
                content: {
                  position: 'fixed',
                  top: '100px',
                  left: '550px',
                  right: '550px',
                  bottom: '105px',
                  border: '1px solid #ccc',
                  background: '#F3ABB3',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '10px'
                }
              }}
            
            isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(true)}>
                <div className='note'>
                    <div className='right'><button onClick={() => setModalIsOpen(false)}>x</button></div>
                    <br/>
                    <h3>쪽지 보내기</h3>
                    <br/>
                    <div>
                    <div>받은 사람 : {nicknames}</div>
                    <hr/>
                    <div>보낸 시간 : {dates}</div>
                    <hr/>
                    <div>내용</div>
                    <br/>
                    <input type={'text'} placeholder="comment..." style={{ width: '300px', height: '200px' }} onChange={(e) => conversationUpdate(e)} ></input>
                    <br/>
                    <br/>
                    <form className='center' method='POST' onSubmit={addDatas}><button className='loginbtn' >보내기</button>
                    </form>
                    </div>
                </div>
            </Modal>
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
                                {nickname !== null ?
                                    <button className='loginbtn' style={{ padding: '5px' }} onClick={() => setModalIsOpen(true)} ><Link style={{ textDecoration: 'none', color: '#660000' }} to={{ pathname: `/Joblist/Eatboardinfo?user_namer=${el.my_name}&date=${el.date}&content=${el.conversation}` }}>쪽지보내기</Link></button>
                                    :
                                    <div><button className='loginbtn' style={{ padding: '5px' }} onClick={Posts}>쪽지보내기</button></div>

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
                                    {nickname !== null ?
                                        <button className='loginbtn' style={{ padding: '5px' }} onClick={() => setModalIsOpen(true)} ><Link style={{ textDecoration: 'none', color: '#660000' }} to={{ pathname: `/Joblist/Eatboardinfo?user_namer=${el.my_name}&date=${el.date}&content=${el.conversation}` }}>쪽지보내기</Link></button>
                                        :
                                        <div><button className='loginbtn' style={{ padding: '5px' }} onClick={Posts}>쪽지보내기</button></div>

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
                    : <button className='loginbtn' onClick={Posts}>댓글달기</button>
                }
            </div>

        </>
    )
}

function Posts() {
    alert('로그인을 해주세요.')
}
export default Eatboardinfo;