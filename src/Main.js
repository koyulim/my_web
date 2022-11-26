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
      <br />
      <br />
      <div>
      </div>
      <div className='Carousel'>
        <Slider {...settings}>
          <div>
            <div className='slidepadding'>
              <h2>각종 아르바이트에 대해서 궁금하신 분들 어서오세요. :)</h2>
              <h3>아르바이트 초심자를 위한 사이트를 오신것을 환영합니다.</h3>
              <h4>아르바이트를 시작하고 싶은데, 정보가 없고 정리가 되어있지 않아 어떤 알바가 좋을지 모르신다면
                <br />
                아래 카테고리별 아르바이트 각종 후기를 보신후 선택하는것은 어떨까요?
              </h4>
              <h4>아래 이동하기 버튼을 눌러 후기를 둘러본후 아르바이트를 선택해 보아요.</h4>
              <h4>아르바이트를 선택 하셧다면 아르바이트 구하러 가볼까요? </h4>
              <h4>옆으로 이동하기 -&gt;</h4>
            </div>
          </div>
          <div>
            <div className='slidepadding'>
              <h2>아르바이트 구하러 가기</h2>
              <div>알바천국 사이트로 이동 </div>
              <br />
              <div className='slideimgpadding'>
                <img src="img/Main1.png"></img>
                <Link to='' style={{ color: '#660000' }} onClick={() => window.open('http://www.alba.co.kr/')} >click -&gt;</Link>
              </div>
              <br />
              <br />
            </div>
          </div>
          <div>
            <div className='slidepadding'>
              <h2>아르바이트 구하러 가기</h2>
              <div>알바몬 사이트로 이동 </div>
              <br />
              <div className='slideimgpadding'>
                <img src="img/Main2.png"></img>
                <Link to='' style={{ color: '#660000' }} onClick={() => window.open('https://www.albamon.com/')} >click -&gt;</Link>
              </div>
              <br />
              <br />
            </div>
          </div>
        </Slider>
      </div>
      <br />
      <br />
      <div className='cardmargin'>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src="img/Eat.png" />
                <br />
                <Card.Body>
                  <Card.Title>외식.음료</Card.Title>
                  <Card.Text>
                    요식업 쪽에서 아르바이트
                    <br />정보가 궁금하다면?
                    <br />
                    <br />
                  </Card.Text>
                  <Button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#660000' }} href="Eat">이동하기</a></Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src="img/Management.png" />
                <br />
                <Card.Body>
                  <Card.Title>매장관리.판매</Card.Title>
                  <Card.Text>
                    유통하고 판매하는 쪽에서
                    <br />아르바이트 정보가<br /> 궁금하다면?
                  </Card.Text>
                  <Button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#660000' }} href="http://localhost:3000/Management">이동하기</a></Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <br />
                <Card.Img variant="top" src="img/Service.png" />
                <br />
                <Card.Body>
                  <Card.Title>서비스</Card.Title>
                  <Card.Text>
                    서비스 쪽에서 아르바이트
                    <br />정보가 궁금하다면?
                  </Card.Text>
                  <Button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#660000' }} href="http://localhost:3000/Service">이동하기</a></Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <br />
                <Card.Img variant="top" src="img/Trevise.png" />
                <br />
                <Card.Body>
                  <Card.Title>시급계산기</Card.Title>
                  <Card.Text>
                    아르바이트 시급
                    <br />가격이 궁금하다면?
                  </Card.Text>
                  <Button className='loginbtn' variant="primary"><a style={{ textDecoration: 'none', color: '#660000' }} href="http://localhost:3000/Calculation">이동하기</a></Button>
                </Card.Body>
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
                <Card.Link style={{ textDecoration: 'none', color: '#660000' }} href="http://localhost:3000/Eat">
                  <Card.Img variant="top" src="img/Eat2.png" />
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

                <Card.Link style={{ textDecoration: 'none', color: '#660000' }} href="http://localhost:3000/Management">
                  <Card.Img variant="top" src="img/Management2.png" />

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
                <Card.Link style={{ textDecoration: 'none', color: '#660000' }} href="http://localhost:3000/Service">
                  <br />
                  <Card.Img variant="top" src="img/Service2.png" />
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
                <Card.Link style={{ textDecoration: 'none', color: '#660000' }} href="http://localhost:3000/Calculation">
                  <br />
                  <Card.Img variant="top" src="img/Trevise2.png" />
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
