import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from 'Registration/Login';
import Joblist from 'Joblist';
import Signup from 'Registration/Signup';

function App() {
  return (
      <div className="App">
        <div className="title-bar">
          <div className='title'>
            <Link style={{ textDecoration: 'none', color: 'white' }} to='Joblist'>알바 정보 공유 사이트</Link>
          </div>
            <button><Link style={{ textDecoration: 'none', color: 'Black' }} to='Login'>로그인</Link></button>
        </div>
        <Routes>
          <Route path='' element={<Navigate to='Joblist' replace />} />
          <Route path='Joblist' element={<Joblist />} />
          <Route path='Login/*' element={<Login />} />
          <Route path='Joblist/*' element={<Joblist />} />
          <Route path='Signup/*' element={<Signup />} />
        </Routes>
      </div>
      
  );
}

export default App;
