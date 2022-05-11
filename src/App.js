import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from 'Registration/Login';
import Joblist from 'Joblist';
import Signup from 'Registration/Signup';
import Findnickname from 'Registration/Findnickname';
import Findpassword from 'Registration/Findpassword';

function App() {
  return (
    <>
      <div className="App">
        <div className="title-bar">
          <div className='title'>
            <Link style={{ textDecoration: 'none', color: 'white' }} to='Joblist'>알바 정보 공유 사이트</Link>
          </div>
          {
            sessionStorage.getItem('nickname') !== null
            ? 
            <div className='textsize'>
              {
                 sessionStorage.getItem('nickname') // 로그인 닉네임값 받기
              }
              <a>님</a>  <button style={{padding : '5px'}} onClick={Logout} ><a className='href' href='http://localhost:3000/Login'>로그아웃</a></button>
            </div>
            :<button><Link style={{ textDecoration: 'none', color: 'Black' }} to='Login'>로그인</Link></button>
          }
        </div>
        <Routes>
          <Route path='' element={<Navigate to='Joblist' replace />} />
          <Route path='Joblist' element={<Joblist />} />
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
function Logout(){
  alert('로그아웃 되었습니다.')
  sessionStorage.removeItem('nickname');
}

export default App;
