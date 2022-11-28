import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick.css";
import "slick-theme.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';


function Main() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <div>
      </div>
      <div className='Carousel'>
        <Slider {...settings}>
          <div>
            <div className='slidepadding'>
              <h1>직종별 아르바이트</h1>
              <hr style={{ width: '100px', height: '5px', backgroundColor: '#FFCD4A', border: 'none', float: 'left'}}/>
              <br/>
              <h4>하단의 이동하기 버튼을 이용하여
                <br/>
              한 눈에 직종별 아르바이트 정보 확인하기
                <br/>
              아르바이트 구하러 가기 -&gt;</h4>
            </div>
          </div>
          <div>
            <div className='slidepaddings'>
              <h2 style={{ textAlign:'center' }} >아르바이트 구하러 가기</h2>
              <div style={{ textAlign:'center' }} >알바천국 사이트로 이동 </div>
              <br />
              <div className='slideimgpadding'>
                <div style={{ textAlign:'center' }} >
                <img style={{ textAlign:'center' }} src="img/Main1.png"></img>
                </div>
                <br/>
                <button style={{ border: '1px', borderRadius: '80px / 90px' , background: '#FFCD4A' ,color: '#660000' }} onClick={() => window.open('http://www.alba.co.kr/')} >click -&gt;</button>
                <br/>      
                <br/>        
              </div>
              <br />
              <br />
            </div>
          </div>
          <div>
            <div className='slidepaddings'>
              <h2 style={{ textAlign:'center' }} >아르바이트 구하러 가기</h2>
              <div style={{ textAlign:'center' }} >알바몬 사이트로 이동 </div>
              <br />
              <div className='slideimgpadding'>
                <img src="img/Main2.png"></img>
                <br/>
                <button style={{ border: '1px', borderRadius: '80px / 90px' , background: '#FFCD4A' ,color: '#660000' }} onClick={() => window.open('https://www.albamon.com/')} >click -&gt;</button>
              </div>
              <br />
              <br />
            </div>
          </div>
        </Slider>
      </div>
      <div className='cardmargin'>
        <Container>
          <Row>
            <Col>
              <Card>
                <br/>
                  <img variant="top" src="img/Eat.png" /> 
                  <div style={{ float: 'right', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }} >외식.음료</div>
                    <br/>
                    요식업 쪽에서 아르바이트
                    <br />정보가 궁금하다면?
                    <br />
                    <br />
                    <div>
                  <button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#161f35' }} href="Eat">이동하기</a></button>
                  </div>   
                  </div>
                  <br/>
                  <br/>         
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
              <br/>
                  <img variant="top" src="img/Management.png" />
                  <div style={{ float: 'right', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }} >매장관리.판매</div>
                    <br/>
                    유통하고 판매하는 쪽에서
                    <br />아르바이트 정보가<br /> 궁금하다면?
                    <br />
                    <br />
                    <div>
                  <button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#161f35' }} href="Management">이동하기</a></button>
                  </div>   
                  </div>
                  <br/>
                  <br/>         
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
              <br/>
                  <img variant="top" src="img/Service.png" /> 
                  <div style={{ float: 'right', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }} >서비스</div>
                    <br/>
                    서비스 쪽에서 아르바이트
                    <br />정보가 궁금하다면?
                    <br />
                    <br />
                    <div>
                  <button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#161f35' }} href="Service">이동하기</a></button>
                  </div>   
                  </div>
                  <br/>
                  <br/>         
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
              <br/>
                  <img variant="top" src="img/Trevise.png" /> 
                 <div style={{ float: 'right', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }} >시급계산기&nbsp;&nbsp;</div>
                    <br/>
                     아르바이트 시급&nbsp;&nbsp;&nbsp;&nbsp;
                    <br />가격이 궁금하다면?&nbsp;&nbsp;&nbsp;&nbsp;
                    <br />
                    <br />
                    <div>
                  <button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#161f35' }} href="Calculation">이동하기</a></button>&nbsp;&nbsp;&nbsp;
                  </div>   
                  </div>&nbsp;&nbsp;&nbsp;&nbsp;
                  <br/>
                  <br/>         
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
      {/* 작은화면 */}
      <div className='cardmarginsmall'>
        <Container>
          <Row>
            <Col>
              <Card>
                <br/>
                <Card.Link style={{ textDecoration: 'none', color: '#161f35' }} href="http://localhost:3000/Eat">
                  <Card.Img variant="top" src="img/Eat.png" />
                  <br />
                  <Card.Body>
                    <Card.Title>외식.음료</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
              <br/>
                <Card.Link style={{ textDecoration: 'none', color: '#161f35' }} href="http://localhost:3000/Management">
                  <Card.Img variant="top" src="img/Management.png" />
                  <Card.Body>
                    <Card.Title>매장관리.판매</Card.Title>
                  </Card.Body>
                </Card.Link>

              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Link style={{ textDecoration: 'none', color: '#161f35' }} href="http://localhost:3000/Service">
                  <br />
                  <Card.Img variant="top" src="img/Service.png" />
                  <br />
                  <Card.Body>
                    <Card.Title>서비스</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Link style={{ textDecoration: 'none', color: '#161f35' }} href="http://localhost:3000/Calculation">
                  <br />
                  <Card.Img variant="top" src="img/Trevise.png" />
                  <br />
                  <Card.Body>
                    <Card.Title>시급계산기</Card.Title>
                  </Card.Body>
                </Card.Link>
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
    </>
  )

} export default Main;
