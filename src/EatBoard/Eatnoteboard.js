import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import moment from "moment";
import Modal from 'react-modal';
import Modals from 'Modals';

function Eatnoteboard() {

    const nickname = sessionStorage.getItem('nickname');
    const [searchParams, setSearchParams] = useSearchParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalname = searchParams.get('user_namer');
    const modalnams = searchParams.get('my_namer');
    const modaldate = searchParams.get('date');
    const modalcontent = searchParams.get('content');
    const ID = searchParams.get('id');

    const [isOpen, setOpen] = useState(false);

    const my_name = sessionStorage.getItem('nickname');
    const [sample1List, setSample1List] = useState([]);
    const [sample2List, setSample2List] = useState([]);
    const today = moment();
    const date = today.format('YYYY-MM-DD hh:mm:ss');

    const deletenotepost = async (ID) => {
        const remove = window.confirm('쪽지를 삭제하시겠습니까?');

        if (remove) {
            const target = { id: ID }
            const res = await axios('/delete/Eatnotedata', {
                method: 'POST',
                data: { 'delete': target }
            })

            if (res.data) {
                alert('데이터를 삭제했습니다.')
                return window.location.reload();
            }
        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleModalCancel = () => setOpen(false);

    const getKeywordEatnoteData = async () => {
        const res = await axios('/get/keywordEatnoteboardData', {
            method: 'POST',
            data: {
                'user_name': my_name,
            }
        },);
        setSample1List(res.data);
    }

    const getKeywordEatnoteDatas = async () => {
        const res = await axios('/get/keywordEatnoteboardDatas', {
            method: 'POST',
            data: {
                'my_name': my_name,
            }
        },);
        setSample2List(res.data);
    }

    useEffect(() => {
        getKeywordEatnoteData();
        getKeywordEatnoteDatas();
    }, []);


    return (
        <div style={{ background: '#cecece', height: '830px' }}>
            <h1 style={{ color: '#202f57' }}>쪽지함</h1>

            <Modal
                className='Modal'
                isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(true)}>
                {modalname == my_name ?
                    <div>
                        <div className='note2'>
                            <div className='right'><button onClick={() => setModalIsOpen(false)}>x</button></div>
                            <br />
                            <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>받은 쪽지</h3>
                            <br />
                            <div>
                                <div style={{ padding: '10px' }}>
                                    <a style={{ fontWeight: 'bold' }} >보낸 사람 : </a>
                                    <a className="madaltext">{modalnams}</a>
                                </div>
                                <div style={{ padding: '10px' }}>
                                    <a style={{ fontWeight: 'bold' }} >받는 사람 : </a>
                                    <a className="madaltext" >{nickname}</a>
                                </div>
                                <div style={{ padding: '10px' }}>
                                    <a style={{ fontWeight: 'bold' }} >보낸 시간 : </a>
                                    <a>{modaldate}</a>
                                </div>
                                <hr />
                                <div style={{ fontWeight: 'bold', textAlign: 'center' }} >내용</div>
                                <br />
                                <div style={{ textAlign: 'center' }} >{modalcontent}</div>
                                <br />
                                <hr />
                                <div style={{ textAlign: 'center' }}>
                                    <button className="loginbtn" onClick={handleClick}>답장 보내기</button>
                                    <Modals
                                        isOpen={isOpen}
                                        onCancel={handleModalCancel}
                                        user_name={modalnams} />
                                    <a>&nbsp;&nbsp;</a>
                                    <button className="loginbtn" onClick={() => deletenotepost(ID)} >삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='note2'>
                            <div className='right'><button onClick={() => setModalIsOpen(false)}>x</button></div>
                            <br />
                            <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>보낸 쪽지</h3>
                            <br />
                            <div>
                                <div style={{ padding: '10px' }}>
                                    <a style={{ fontWeight: 'bold' }} >받은 사람 : </a>
                                    <a className="madaltext">{modalname}</a>
                                </div>
                                <div style={{ padding: '10px' }}>
                                    <a style={{ fontWeight: 'bold' }} >보낸 사람 : </a>
                                    <a className="madaltext" >{nickname}</a>
                                </div>
                                <div style={{ padding: '10px' }}>
                                    <a style={{ fontWeight: 'bold' }} >받은 시간 : </a>
                                    <a>{modaldate}</a>
                                </div>
                                <hr />
                                <div style={{ fontWeight: 'bold', textAlign: 'center' }} >내용</div>
                                <br />
                                <div style={{ textAlign: 'center' }} >{modalcontent}</div>
                                <br />
                                <hr />
                                <div style={{ textAlign: 'center' }}>
                                    <button className="loginbtn" onClick={() => deletenotepost(ID)} >삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Modal>

            <br />
            <h2 style={{ color: '#202f57' }}>받은 쪽지</h2>
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div className='note'>
                                <div className='left'>
                                    <button className="loginbtnright" onClick={() => deletenotepost(el.id)} >삭제</button>
                                    <Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnoteboard?user_namer=${el.user_name}&my_namer=${el.my_name}&date=${el.date}&content=${el.conversation}&id=${el.id}` }}>
                                        <div onClick={() => setModalIsOpen(true)}>
                                            <div style={{ padding: '10px', color: '#202f57', fontWeight: 'bold', margin: '5px' }} ><span> 보낸 사람 : {el.my_name} </span></div>
                                            <h2 className='textsize' style={{ color: '#202f57', fontWeight: 'bold', margin: '5px' }} > &nbsp;내용 : {el.conversation}</h2>
                                        </div>
                                    </Link>
                                </div>
                                <div className='right' style={{ padding: '10px', color: '#202f57', fontWeight: 'bold' }} >
                                    <span> {el.date} </span>
                                    <br />
                                </div>
                            </div>
                        </div>
                    )
                })
                : <div>쪽지가 없습니다.</div>
            }
            <br />
            <h2 style={{ color: '#202f57' }}>보낸 쪽지</h2>
            {sample2List.length !== 0 ?
                sample2List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div className='note'>
                                <div className='left'>
                                    <button className="loginbtnright" onClick={() => deletenotepost(el.id)} >삭제</button>
                                    <Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnoteboard?user_namer=${el.user_name}&my_namer=${el.my_name}&date=${el.date}&content=${el.conversation}&id=${el.id}` }}>
                                        <div onClick={() => setModalIsOpen(true)}>

                                            <div style={{ padding: '10px', color: '#202f57', fontWeight: 'bold', margin: '5px' }} ><span> 받은 사람 : {el.user_name} </span> </div>
                                            <h2 className='textsize' style={{ color: '#202f57', fontWeight: 'bold', margin: '5px' }} > &nbsp;내용 : {el.conversation}</h2>
                                        </div>
                                    </Link></div>
                                <div className='right' style={{ padding: '10px', color: '#202f57', fontWeight: 'bold' }} >
                                    <span> {el.date} </span>
                                    <br />
                                </div>
                            </div>
                        </div>
                    )
                })
                : <div>쪽지가 없습니다.</div>
            }
        </div>

    )
}

export default Eatnoteboard;


