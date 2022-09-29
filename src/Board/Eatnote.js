import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import moment from "moment";


function Eatnote() {

    const [searchParams, setSearchParams] = useSearchParams();
    const my_name = sessionStorage.getItem('nickname');
    const user_name = searchParams.get('user_namer');
    const [conversation, setConversation] = useState('');
    const today = moment();
    const date = today.format('YYYY-MM-DD hh:mm:ss');
    const [sample1List, setSample1List] = useState([]);


    const getKeywordEatnoteData = async () => {
        const res = await axios('/get/keywordEatnoteData', {
            method: 'POST',
            data: {
                'user_name': my_name,
                'my_name': my_name,
            }
        },);
        setSample1List(res.data);
    }

    useEffect(() => {
        getKeywordEatnoteData();
    }, []);

    const conversationUpdate = (e) => {
        setConversation(e.target.value);
    }

    const addData = async (e) => {
        e.preventDefault();

        const res = await axios('/add/eatnote', {
            method: 'POST',
            data: {
                'user_name': user_name,
                'my_name': my_name,
                'conversation': conversation,
                'date': date,
            }
        });

        if (res.data) {
            alert('쪽지가 전송되었습니다.');
            window.location.reload();
        }
    }

    return (
        <>
            <h1>{user_name} 쪽지방</h1>
            <div>
                <hr />

                {sample1List.length !== 0 ?
                    sample1List.map((el, key) => {
                        return (
                            <div key={key}>
                                <div >
                                    {user_name == el.user_name ?
                                        <div className='right'>
                                            {/* <div style={{ padding: '10px' }} ><span> my_name : {el.my_name} </span> </div> */}
                                            <div className='textsize'> 내용 : {el.conversation}</div>
                                            <div style={{ padding: '10px' }} ><span> {el.date} </span> </div>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                    {user_name == el.my_name ?
                                        <div className='left'>
                                            <div style={{ padding: '10px' }} ><span> user_name : {el.my_name} </span> </div>
                                            <div className='textsize'> 내용 : {el.conversation}</div>
                                            <div style={{ padding: '10px' }} ><span> {el.date} </span> </div>
                                        </div>
                                        :
                                        <div></div>
                                    }

                                </div>
                            </div>
                        )
                    })
                    : <div></div>
                }
                <input type={'text'} placeholder="comment..." style={{ width: '300px' }} onChange={(e) => conversationUpdate(e)} ></input>
                <form method='POST' onSubmit={addData}><button>보내기</button></form>
            </div>
        </>
    )
}
export default Eatnote;
