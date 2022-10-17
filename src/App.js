import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillFilePersonFill } from "react-icons/bs";

import Login from 'Registration/Login';
import Joblist from 'Joblist';
import Signup from 'Registration/Signup';
import Findnickname from 'Registration/Findnickname';
import Findpassword from 'Registration/Findpassword';

function App() {

  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);

  return (
    <>
      <div>
      <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <div>
            <Link style={{ textDecoration: 'none', color: '#660000' }} to='Joblist'>알바 정보 공유 사이트</Link>
          </div>
          <button className='nav-toggle' onClick={toggleLinks}>
            <BsFillFilePersonFill/><AiFillCaretDown/>
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
          {
            sessionStorage.getItem('nickname') !== null
              ? 
              <div className='links'>
                <a>{sessionStorage.getItem('nickname')}님&nbsp;&nbsp;&nbsp;</a>
                <Link style={{ textDecoration: 'none', color: '#660000' }} to='joblist'>Home&nbsp;&nbsp;&nbsp;</Link> 
                <Link style={{ textDecoration: 'none', color: '#660000' }} to='joblist/Eatnoteboard'>Mail&nbsp;&nbsp;&nbsp;</Link>
                <a style={{ color: '#660000' }} onClick={Logout} >로그아웃&nbsp;&nbsp;&nbsp;</a>
                <br/>
              </div>
              : 
              <div className='links'>
                <Link style={{ textDecoration: 'none', color: '#660000' }} to='joblist'>Home&nbsp;&nbsp;&nbsp;</Link> 
                <Link style={{ textDecoration: 'none', color: '#660000' }} to='Login'>로그인&nbsp;&nbsp;&nbsp;</Link>
                <br/>
              </div>
              }
          </ul>
        </div>
      </div>
    </nav>
        <Routes>
          <Route path='' element={<Navigate to='Joblist' replace />} />
          <Route path='Joblist/*' element={<Joblist />} />
          <Route path='Login/*' element={<Login />} />
          <Route path='Joblist/*' element={<Joblist />} />
          <Route path='Signup/*' element={<Signup />} />
          <Route path='Findnickname/*' element={<Findnickname />} />
          <Route path='Findpassword/*' element={<Findpassword />} />
        </Routes>
      </div>
    </>
  )
}
function Logout() {
  sessionStorage.removeItem('nickname');
  window.location.replace('/Joblist');
  alert('로그아웃 되었습니다.')
}

export default App;
