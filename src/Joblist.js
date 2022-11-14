import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Eat from 'Jobtype/Eat';
import Management from 'Jobtype/Management';
import Service from 'Jobtype/Service';
import Eatpost from 'EatBoard/Eatpost';
import Eatboard from 'EatBoard/Eatboard';
import Eatboardinfo from 'EatBoard/Eatboardinfo';
import Eatrevise from 'EatBoard/Eatrevise';
import Eatnoteboard from 'EatBoard/Eatnoteboard';
import Calculation from 'Calculation';
import Managementboard from 'ManagementBoard/Managementboard';
import Managementpost from 'ManagementBoard/Managementpost';
import Managementboardinfo from 'ManagementBoard/Managementboardinfo';
import Managementrevise from 'ManagementBoard/Managementrevise';



function Joblist() {
    return (
        <div >
           <div>
                <div className='jobtype'>
                </div>
                <div className='jobborde'>
                    <Routes>
                        <Route path='Eat/*' element={<Eat />} />
                        <Route path='Management/*' element={<Management />} />
                        <Route path='Service/*' element={<Service />} />
                        <Route path='Eatpost/*' element={<Eatpost />} />
                        <Route path='Eatboard/*' element={<Eatboard />} />
                        <Route path='Eatboardinfo/*' element={<Eatboardinfo />} />
                        <Route path='Eatrevise/*' element={<Eatrevise />} />
                        <Route path='Eatnoteboard/*' element={<Eatnoteboard />} />
                        <Route path='Calculation/*' element={<Calculation />} />
                        <Route path='Managementboard/*' element={<Managementboard />} />
                        <Route path='Managementpost/*' element={<Managementpost />} />
                        <Route path='Managementboardinfo/*' element={<Managementboardinfo />} />
                        <Route path='Managementrevise/*' element={<Managementrevise />} />

                    </Routes>
                </div>
            </div>
        </div>


    );
}

export default Joblist;
