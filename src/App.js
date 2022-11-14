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
import Main from 'Main';
import Eat from 'Jobtype/Eat';
import Management from 'Jobtype/Management';
import Service from 'Jobtype/Service';
import Post from 'EatBoard/Eatpost';
import Eatboard from 'EatBoard/Eatboard';
import Eatboardinfo from 'EatBoard/Eatboardinfo';
import Eatrevise from 'EatBoard/Eatrevise';
import Eatnoteboard from 'EatBoard/Eatnoteboard';
import Calculation from 'Calculation';


function App() {

  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);;

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
    <div>
      <div>
        <nav>
          <div className='nav-center'>
            <div className='nav-header'>
              <div>
                <Link style={{ textDecoration: 'none', color: '#660000' }} to='Main'>알바 정보 공유 사이트</Link>
              </div>
              <button className='nav-toggle' onClick={toggleLinks}>
                <BsFillFilePersonFill /><AiFillCaretDown />
              </button>
            </div>
            <div className='links-container' ref={linksContainerRef}>
              <ul className='links' ref={linksRef}>
                {
                  sessionStorage.getItem('nickname') !== null
                    ?
                    <div className='links'>
                      <a>{sessionStorage.getItem('nickname')}님&nbsp;&nbsp;&nbsp;</a>
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='Main'>Home&nbsp;&nbsp;&nbsp;</Link>
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='joblist/Eatnoteboard'>Mail&nbsp;&nbsp;&nbsp;</Link>
                      <a style={{ color: '#660000' }} onClick={Logout} >로그아웃&nbsp;&nbsp;&nbsp;</a>
                      <br />
                    </div>
                    :
                    <div className='links'>
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='Main'>Home&nbsp;&nbsp;&nbsp;</Link>
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='Login'>로그인&nbsp;&nbsp;&nbsp;</Link>
                      <br />
                    </div>
                }
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='' element={<Navigate to='Main' replace />} />
          <Route path='Main/*' element={<Main />} />
          <Route path='Joblist/*' element={<Joblist />} />
          <Route path='Login/*' element={<Login />} />
          <Route path='Joblist/*' element={<Joblist />} />
          <Route path='Signup/*' element={<Signup />} />
          <Route path='Findnickname/*' element={<Findnickname />} />
          <Route path='Findpassword/*' element={<Findpassword />} />
          <Route path='Eat/*' element={<Eat />} />
          <Route path='Management/*' element={<Management />} />
          <Route path='Service/*' element={<Service />} />
          <Route path='Post/*' element={<Post />} />
          <Route path='Eatboard/*' element={<Eatboard />} />
          <Route path='Eatboardinfo/*' element={<Eatboardinfo />} />
          <Route path='Eatrevise/*' element={<Eatrevise />} />
          <Route path='Eatnoteboard/*' element={<Eatnoteboard />} />
          <Route path='Calculation/*' element={<Calculation />} />
        </Routes>
      </div>
    </div>

  )
}
function Logout() {
  sessionStorage.removeItem('nickname');
  window.location.replace('/Main');
  alert('로그아웃 되었습니다.')
}

export default App;
