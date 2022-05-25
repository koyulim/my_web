import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class Service extends Component {
  constructor(props) {
      super(props);
      this.state = {
          url : '',
          area : '',
          jobname : '',
        sample1List : [],
      }
    };
  
    componentDidMount() {
      this._getData();
    }
  
    _getData = async () => {
      const res = await axios.get('/get/servicedata');
      this.setState({ 
        sample1List : res.data
      })
    }

render() {
  const { sample1List } = this.state;
  return (
      <>
      <div className='App'>
      <h3>Service List</h3>

      <input type='text' maxLength='10' placeholder='검색키워드(name)' onChange={(e) => this._nameUpdate(e)} />
      <input type='text' maxLength='20' placeholder='검색키워드(email)' onChange={(e) => this._emailUpdate(e)}/>
      <button onClick={this._getKeywordData}>Search</button>
      <button onClick={this._getData}>ListAll</button>

      <br/>
      <br/>

      {sample1List.length !== 0 ? 
      sample1List.map( (el, key) => {
        return(
            <>
          <div key={key}>
            {/* <span>  {el.url} </span>/ */}
            <span> {el.area} </span> |
            <span> {el.jobname} </span>
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
export default Service;