import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import moment from "moment";
import Modal from 'react-modal';
import Modals from 'Modals';

function Eatnoteboard() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalname = searchParams.get('user_namer');
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
        const remove = window.confirm( ID + '쪽지를 삭제하시겠습니까?');

        if (remove) {
            const target = { id: ID }
            const res = await axios('/delete/eatnotedata', {
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
                        bottom: '280px',
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
                            <br />
                            <h3>보낸 쪽지</h3>
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
                                <hr/>
                                <button className="loginbtn" onClick={() => deletenotepost(ID)} >삭제</button>
                                <br />
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='note'>
                            <div className='right'><button onClick={() => setModalIsOpen(false)}>x</button></div>
                            <br />
                            <h3>받은 쪽지</h3>
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
                                <hr />

                                <div>
                                    <button className="loginbtn" onClick={handleClick}>답장 보내기</button> 
                                    <Modals
                                        isOpen={isOpen}
                                        onCancel={handleModalCancel}
                                        user_name = {modalname} />
                                    <a>&nbsp;&nbsp;</a>
                                    <button className="loginbtn" onClick={() => deletenotepost(ID)} >삭제</button>
                                </div>
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
                                <button className="loginbtnright" onClick={() => deletenotepost(el.id)} >삭제</button>
                                    <Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnoteboard?user_namer=${el.my_name}&date=${el.date}&content=${el.conversation}&id=${el.id}` }}>
                                        <div onClick={() => setModalIsOpen(true)}>
                                            <div style={{ padding: '10px', color: '#660000' }} ><span> user_name : {el.my_name} </span></div> 
                                            <div className='textsize' style={{ color: '#660000' }} > 내용 : {el.conversation}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='right' style={{ padding: '10px' }} >
                                <span> {el.date} </span> 
                                <br/>
                                </div>
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
                                <div className='left'>
                                <button className="loginbtnright" onClick={() => deletenotepost(el.id)} >삭제</button>
                                    <Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnoteboard?user_namer=${el.my_name}&date=${el.date}&content=${el.conversation}&id=${el.id}` }}>
                                    <div onClick={() => setModalIsOpen(true)}>

                                        <div style={{ padding: '10px', color: '#660000' }} ><span> my_name : {el.my_name} </span> </div>
                                        <div className='textsize' style={{ color: '#660000' }} > 내용 : {el.conversation}</div>
                                    </div>
                                </Link></div>
                                <div className='right' style={{ padding: '10px' }} >
                                <span> {el.date} </span> 
                                <br/>
                                </div>
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
