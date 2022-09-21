import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import moment from "moment";


function Eatrevise() {
    
    const [sample1List, setSample1List] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [title, setTitle] = useState('');
    const nickname = sessionStorage.getItem('nickname');
    const area = searchParams.get('area');
    const nicknames = searchParams.get('nickname');
    const titles = searchParams.get('title');
    const jobname = searchParams.get('jobname');
    const [content, setContent] = useState('');
    const today = moment();
    const date = today.format('YYYY-MM-DD');
   
    const getKeywordEatData = async () => {
        const res = await axios('/get/keywordEatpostinfoData', {
            method: 'POST',
            data: {
                'title' : titles,
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


    const addData = async (e) => {
        e.preventDefault();
    
        const res = await axios('/add/eatpost', {
          method: 'POST',
          data: {
            'area': area,
            'jobname': jobname,
            'nickname': nickname,
            'title': title,
            'content': content,
            'date': date + ('   (수정됨)'),
          }
        });
    
        if (res.data) {
          alert('게시글이 수정되었습니다.');
          window.location.replace('/Joblist/Eat');
        }
      }
    
      const titleUpdate = (e) => {
        setTitle(e.target.value);
      }
    
      const contentUpdate = (e) => {
        setContent(e.target.value);
      }


      const deletepost = async (el) => {

        if (el.title) {
            const target = { id: el.id }
            const res = await axios('/delete/data', {
                method: 'POST',
                data: { 'delete': target }
            })

        }
    }
    return(
    <>
            <br />
            <br />
            <h2>게시글 수정</h2>
            <hr></hr>
            {sample1List.length !== 0 ?
                sample1List.map((el, key) => {
                    return (
                        <div key={key}>
                            <div>
                                <div style={{ padding: '10px' }}>제목</div>
                                <input type={'text'} placeholder={el.title} style={{ width: '300px' }} onChange={(e) => titleUpdate(e)}></input>
                                <div style={{ padding: '10px' }}>내용</div>
                                <input type={'text'} placeholder={el.content} style={{ width: '300px', height: '200px' }} onChange={(e) => contentUpdate(e)} ></input>
                                <div style={{ padding: '10px' }} ><span> {el.date} </span></div>
                                

                            </div>
                            <hr />
                            <div>
                                {/* <button onClick={() => addData(e)}>수정완료</button> */}
                                <form method='POST' onSubmit={addData} ><button onClick={() => deletepost(el)}>수정완료</button></form>
                            </div>
                           
                        </div>
                    )
                })
                : <div>데이터가 없습니다.</div>}

            <br /></>
    )

}
export default Eatrevise;