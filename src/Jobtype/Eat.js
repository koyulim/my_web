import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class Eat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url : '',
            area : '',
            jobname : '',
            date : '',
          sample1List : [],
        }
      };
    
      componentDidMount() {
        this._getData();
      }
    
      _getData = async () => {
        const res = await axios.get('/get/eatdata');
        this.setState({ 
          sample1List : res.data
        })
      }

render() {
    const { sample1List } = this.state;
    return (
        <>
        <div className='App'>
        <h2>Eat List</h2>
        <input type='text' maxLength='10' placeholder='지역 검색' onChange={(e) => this._nameUpdate(e)} />
        <input type='text' maxLength='20' placeholder='가게 이름 검색' onChange={(e) => this._emailUpdate(e)}/>
        <button onClick={this._getKeywordData}>Search</button>
        <button onClick={this._getData}>ListAll</button>

        <br/>
        <br/>
        <h3>지역 | 가게 이름 | 날짜</h3>
        <hr/>

        {sample1List.length !== 0 ? 
        sample1List.map( (el, key) => {
          return(
              <>
            <div key={key}>
              {/* <span>  {el.url} </span>/ */}
              <span> {el.area} </span> |
              <span> {el.jobname} </span> |
              <span> {el.date} </span>
            </div>
            <div style={{ padding: '10px' }}>
                  <button onClick={() => window.open('https://www.albamon.com/recruit/view/gi?AL_GI_No='+ el.url +'&mj_stat=0&optgf=', '_blank')} >자세히 보기</button>
                  <button>후기글 보기</button>
            </div>
            <hr/>
            </>
          )
        })
        : <div>데이터가 없습니다.</div>}

      </div> 
        </>
        
        
    );
}
  
  
}
export default Eat;