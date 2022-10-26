import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillFilePersonFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import 'bootstrap/dist/css/bootstrap.css';
// import Carousel from 'react-bootstrap/Carousel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Login from 'Registration/Login';
import Joblist from 'Joblist';
import Signup from 'Registration/Signup';
import Findnickname from 'Registration/Findnickname';
import Findpassword from 'Registration/Findpassword';

function App() {

  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  
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

  const settings = {
    dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
}



  return (
    <div>
      <div>
        <nav>
          <div className='nav-center'>
            <div className='nav-header'>
              <div>
                <Link style={{ textDecoration: 'none', color: '#660000' }} to='Joblist'>알바 정보 공유 사이트</Link>
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
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='joblist'>Home&nbsp;&nbsp;&nbsp;</Link>
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='joblist/Eatnoteboard'>Mail&nbsp;&nbsp;&nbsp;</Link>
                      <a style={{ color: '#660000' }} onClick={Logout} >로그아웃&nbsp;&nbsp;&nbsp;</a>
                      <br />
                    </div>
                    :
                    <div className='links'>
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='joblist'>Home&nbsp;&nbsp;&nbsp;</Link>
                      <Link style={{ textDecoration: 'none', color: '#660000' }} to='Login'>로그인&nbsp;&nbsp;&nbsp;</Link>
                      <br />
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

      <div className='Carousel'>
            <Slider { ...settings }>
                <div>
                    Slide 1
                </div>
                <div>
                    Slide 2
                </div>
                <div>
                    Slide 3
                </div>
            </Slider>
        </div>
        <br/>
        <br/>
        <br/>

      {/* <div>
      <Carousel className='Carousel' activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div> */}
      
      <div className='cardmargin'>
      <Container>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
        <Card>
                 {/* <Card.Img variant="top" src="holder.js/100px180" />  */}
                 <Card.Body>
                  <Card.Title>외식.음료</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>  
        </Col>
        <Col>
        <Card>
                 {/* <Card.Img variant="top" src="holder.js/100px180" />  */}
                 <Card.Body>
                  <Card.Title>매장관리.판매</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>  
        </Col>
      </Row>
      <Row>
        <Col>
        <Card>
                 {/* <Card.Img variant="top" src="holder.js/100px180" />  */}
                 <Card.Body>
                  <Card.Title>서비스</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>  
        </Col>
        <Col>
        <Card>
                 {/* <Card.Img variant="top" src="holder.js/100px180" />  */}
                 <Card.Body>
                  <Card.Title>시급계산기</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>  
        </Col>
      </Row>
      <Row></Row>
      
    </Container>
        </div>
        </div>
   
  )
}
function Logout() {
  sessionStorage.removeItem('nickname');
  window.location.replace('/Joblist');
  alert('로그아웃 되었습니다.')
}

export default App;
