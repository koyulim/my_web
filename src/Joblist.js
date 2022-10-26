import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Eat from 'Jobtype/Eat';
import Management from 'Jobtype/Management';
import Service from 'Jobtype/Service';
import Post from 'Jobtype/Post';
import Eatboard from 'Board/Eatboard';
import Eatboardinfo from 'Board/Eatboardinfo';
import Eatrevise from 'Board/Eatrevise';
import Eatnoteboard from 'Board/Eatnoteboard';
import Calculation from 'Calculation';

function Joblist() {
    return (
        <div >
           <div>
                <div className='jobtype'>
                    <div>
                        <Link style={{ textDecoration: 'none', color: '#660000' }} to='Eat'>외식.음료</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ textDecoration: 'none', color: '#660000' }} to='Management'>매장관리.판매</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ textDecoration: 'none', color: '#660000' }} to='Service'>서비스</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ textDecoration: 'none', color: '#660000' }} to='Calculation'>시급계산기</Link>
                    </div>
                    <hr color='#660000'/>

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
                        <Route path='Eatnoteboard/*' element={<Eatnoteboard />} />
                        <Route path='Calculation/*' element={<Calculation />} />
                    </Routes>
                </div>
            </div>
        </div>


    );
}

export default Joblist;
