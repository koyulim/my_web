import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Eat from 'Jobtype/Eat';
import Management from 'Jobtype/Management';
import Service from 'Jobtype/Service';
import Post from 'Jobtype/Post';
import Eatboard from 'Board/Eatboard';
import Eatboardinfo from 'Board/Eatboardinfo';
import Eatrevise from 'Board/Eatrevise';
import Eatnote from 'Board/Eatnote';
import Eatnoteboard from 'Board/Eatnoteboard';

function Joblist() {
    return (
        <div className='mide'>
            <div className='container'>
                <div className='jobtype'>
                    <ul>
                        <li><Link style={{ textDecoration: 'none', color: 'Black' }} to='Eat'>외식.음료</Link></li>
                        <li><Link style={{ textDecoration: 'none', color: 'Black' }} to='Management'>매장관리.판매</Link></li>
                        <li><Link style={{ textDecoration: 'none', color: 'Black' }} to='Service'>서비스</Link></li>
                    </ul>
                </div>
                <div className='jobborde'>
                    <Routes>
                        <Route path='Eat/*' element={<Eat />} />
                        <Route path='Management/*' element={<Management />} />
                        <Route path='Service/*' element={<Service />} />
                        <Route path='Post/*' element={<Post />} />
                        <Route path='Eatboard/*' element={<Eatboard />} />
                        <Route path='Eatboardinfo/*' element={<Eatboardinfo />} />
                        <Route path='Eatrevise/*' element={<Eatrevise />} />
                        <Route path='Eatnote/*' element={<Eatnote />} />
                        <Route path='Eatnoteboard/*' element={<Eatnoteboard />} />
                    </Routes>
                </div>
            </div>
        </div>


    );
}

export default Joblist;
