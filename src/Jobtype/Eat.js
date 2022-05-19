import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Eat() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const datas = await axios.get("/Eat");
      setData(datas.data);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data === null) {
    return <div>Load..</div>;
  } else {
    console.log(data);
    return (
      <div>
        <>
        <h4>
          <input type='text' maxLength='20' placeholder='검색'></input>
          <input type='text' maxLength='20' placeholder='검색'></input>
          <button>검색</button>
          </h4>
          <h3> 지역 | 기업명 | URL</h3>
          {data.map((elem) => (
            <>
              <div>
                <hr />
                <div>
                {elem.area} | {elem.jobname} | {elem.url}
                </div>
                <div style={{ padding: '10px' }}>
                  <button onClick={() => window.open('https://www.albamon.com/recruit/view/gi?AL_GI_No='+ elem.url +'&mj_stat=0&optgf=', '_blank')} >자세히 보기</button>
                  <button>후기글 보기</button>
                </div>
              </div>
            </>
          ))}
          <hr />
          <button><a className='href' href='Post' >글쓰기</a></button>
        </>
      </div>
    );
  }
}
export default Eat;