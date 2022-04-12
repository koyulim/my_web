import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Eat from 'Jobtype/Eat';
import Management from 'Jobtype/Management';
import Service from 'Jobtype/Service';
import Post from 'Jobtype/Post';


function Joblist() {
    return (
        <div className='mide'>
            <div className='container'>
                <div className='jobtype'>
                    <ul>
                        <li><Link style={{ textDecoration: 'none'}} to='Eat'>외식.음료</Link></li>
                        <li><Link style={{ textDecoration: 'none'}} to='Management'>매장관리.판매</Link></li>
                        <li><Link style={{ textDecoration: 'none'}} to='Service'>서비스</Link></li>
                    </ul>
                </div>
                <div className='jobborde'>
                    <Routes>
                        <Route path='Eat/*' element={<Eat />} />
                        <Route path='Management/*' element={<Management />} />
                        <Route path='Service/*' element={<Service />} />
                        <Route path='Post/*' element={<Post />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Joblist;
