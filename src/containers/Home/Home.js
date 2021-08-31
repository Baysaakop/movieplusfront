import { CrownOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import FilmSwiper from '../Film/FilmSwiper';
import './Home.css';
import HomeCarousel from './HomeCarousel';
import LeaderboardItem from './LeaderboardItem';
// import axios from 'axios';  
// import api from '../api';
// import { Link } from 'react-router-dom';

function Home (props) {        

    return (
        <div className="home">
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={24} lg={16}>
                    <HomeCarousel />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} style={{ height: '100%' }}>
                    <Typography.Title level={4}><CrownOutlined />  Leaderboard</Typography.Title>
                    <LeaderboardItem avatar="https://www.w3schools.com/bootstrap4/img_avatar4.png" title="Fantabolous Article" author="Jessica Jones" percent={99} />                    
                    <LeaderboardItem avatar="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" title="Best or Worst Spidey?" author="Peter Parker" percent={88} />                                       
                    <LeaderboardItem avatar="https://www.w3schools.com/howto/img_avatar.png" title="Dune Review ★★★★" author="Bruce Banner" percent={77} />                    
                    <LeaderboardItem avatar="https://www.w3schools.com/bootstrap4/img_avatar4.png" title="Memories of Murder ★★★★★ – Хамгийн шилдгийн нэг" author="Jessica Jones" percent={66} />                    
                    <LeaderboardItem avatar="https://www.w3schools.com/howto/img_avatar.png" title="Top 10 films of Studio Ghibli" author="James Johnson" percent={55} />                                                            
                </Col>                
            </Row>
            <div>
                <FilmSwiper title="Шинээр нээлтээ хийсэн" />
                <FilmSwiper title="Өндөр үнэлгээтэй" />
            </div>
        </div>
    )
}

export default Home;