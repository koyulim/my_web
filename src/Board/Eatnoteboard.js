import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import moment from "moment";
import Modal from 'react-modal';

function Eatnoteboard() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalname = searchParams.get('user_namer');
    const modaldate = searchParams.get('date');
    const modalcontent = searchParams.get('content');


    const my_name = sessionStorage.getItem('nickname');
    const [sample1List, setSample1List] = useState([]);
    const [sample2List, setSample2List] = useState([]);
    const today = moment();
    const date = today.format('YYYY-MM-DD hh:mm:ss');

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
        <>
            <h1 style={{ color: '#660000' }}>쪽지함</h1>
            <Modal

                style={{
                    overlay: {
                        position: 'fixed',
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
                        bottom: '320px',
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
                {modalname == my_name ?
                    <div>
                        <div className='note'>
                            <div className='right'><button onClick={() => setModalIsOpen(false)}>x</button></div>
                            <br/>
                            <h3>쪽지 보내기</h3>
                            <br />
                            <div>
                                <div>받은 사람 : {modalname}</div>
                                <hr />
                                <div>보낸 시간 : {modaldate}</div>
                                <hr />
                                <div>내용</div>
                                <br />
                                <div>{modalcontent}</div>
                                <br />
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='note'>
                            <div className='right'><button onClick={() => setModalIsOpen(false)}>x</button></div>
                            <br/>
                            <h3>쪽지 보내기</h3>
                            <br />
                            <div>
                                <div>보낸 사람 : {modalname}</div>
                                <hr />
                                <div>받는 시간 : {modaldate}</div>
                                <hr />
                                <div>내용</div>
                                <br />
                                <div>{modalcontent}</div>
                                <br />
                            </div>
                        </div>
                    </div>
                }
            </Modal>

            <br />
            <h2 style={{ color: '#660000' }}>받은 쪽지</h2>
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div className='note'>
                                <div className='left'>
                                    <Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnoteboard?user_namer=${el.my_name}&date=${el.date}&content=${el.conversation}` }}>
                                        <div onClick={() => setModalIsOpen(true)}>
                                            <div style={{ padding: '10px', color: '#660000' }} ><span> user_name : {el.my_name} </span> </div>
                                            <div className='textsize' style={{ color: '#660000' }} > 내용 : {el.conversation}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='right' style={{ padding: '10px' }} ><span> {el.date} </span> </div>
                            </div>
                            <hr />
                        </div>
                    )
                })
                : <div>쪽지가 없습니다.</div>
            }

            <br />
            <h2 style={{ color: '#660000' }}>보낸 쪽지</h2>
            {sample2List.length !== 0 ?
                sample2List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div className='note'>
                                <div className='left'><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnoteboard?user_namer=${el.my_name}&date=${el.date}&content=${el.conversation}` }}>
                                    <div onClick={() => setModalIsOpen(true)}>

                                        <div style={{ padding: '10px', color: '#660000' }} ><span> my_name : {el.my_name} </span> </div>
                                        <div className='textsize' style={{ color: '#660000' }} > 내용 : {el.conversation}</div>
                                    </div>
                                </Link></div>
                                <div className='right' style={{ padding: '10px' }} ><span> {el.date} </span> </div>
                            </div>
                            <hr />
                        </div>
                    )
                })
                : <div>쪽지가 없습니다.</div>
            }
        </>

    )
}

export default Eatnoteboard;
