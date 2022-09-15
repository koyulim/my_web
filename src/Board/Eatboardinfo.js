import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function Eatboardinfo(){
    const [sample1List, setSample1List] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const nickname = sessionStorage.getItem('nickname');
    const area = searchParams.get('area');
    const nicknames = searchParams.get('nickname');
    const title = searchParams.get('title');
    const jobname = searchParams.get('jobname');
   
   
    const getKeywordEatData = async () => {
        const res = await axios('/get/keywordEatpostinfoData', {
            method: 'POST',
            data: {
                'title' : title,
                'area': area,
                'jobname': jobname,
                'nickname' : nicknames,
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

    return(
    <>
            <br />
            <br />
            <h2>상세내용</h2>
            <hr></hr>
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div>
                                <div className='textsize'>제목 : {el.title}</div> 
                                <div style={{ padding: '10px' }} ><span> 내용 : {el.content} </span> </div>
                                <div style={{ padding: '10px' }} ><span> {el.date} </span></div>

                            </div>
                            <hr />
                            <div>
                                {el.nickname == nickname ?
                                    <div style={{ padding: '10px' }}>
                                        <button><Link style={{ textDecoration: 'none', color: 'Black' }} to={{ pathname: `/Joblist/Eatrevise?area=${el.area}&jobname=${el.jobname}&nickname=${el.nickname}&title=${el.title}` }}>수정</Link></button>
                                        <button onClick={() => deletepost(el)}>삭제</button>
                                    </div>
                                    : <div></div>
                                }
                            </div>
                           
                        </div>
                    )
                })
                : <div>데이터가 없습니다.</div>}

            <br /></>
    )

}
export default Eatboardinfo;