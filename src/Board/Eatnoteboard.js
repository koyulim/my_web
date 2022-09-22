import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import moment from "moment";

function Eatnoteboard() {

    const my_name = sessionStorage.getItem('nickname');
    const [sample1List, setSample1List] = useState([]);
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

    useEffect(() => {
        getKeywordEatnoteData();
    }, []);

    return (
        <>
            <h1>쪽지함</h1>

            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div >
                                <div className='left'><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatnote?user_namer=${el.my_name}` }}>
                                <div style={{ padding: '10px' }} ><span> user_name : {el.my_name} </span> </div>
                                <div className='textsize' > 내용 : {el.conversation}</div>
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
