import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Eat from 'Jobtype/Eat';
import Management from 'Jobtype/Management';
import Service from 'Jobtype/Service';
import Post from 'Jobtype/Post';
import Board from 'Jobtype/Board';


function Joblist() {
    return (
        <div className='mide'>
            <div className='container'>
                <div className='jobtype'>
                    <ul>
                        <li><Link style={{ textDecoration: 'none', color: 'Black'}} to='Eat'>외식.음료</Link></li>
                        <li><Link style={{ textDecoration: 'none', color: 'Black'}} to='Management'>매장관리.판매</Link></li>
                        <li><Link style={{ textDecoration: 'none', color: 'Black'}} to='Service'>서비스</Link></li>
                    </ul>
                </div>
                <div className='jobborde'>
                    <Routes>
                        <Route path='Eat/*' element={<Eat />} />
                        <Route path='Management/*' element={<Management />} />
                        <Route path='Service/*' element={<Service />} />
                        <Route path='Post/*' element={<Post />} />
                        <Route path='Board/*' element={<Board />} />
                    </Routes>
                </div>
            </div>
        </div>
    

    );
}

export default Joblist;
