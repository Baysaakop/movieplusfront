import { CrownOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Typography, Progress, Tooltip } from 'antd';
import React from 'react';
import FilmSwiper from '../Film/FilmSwiper';
import './Home.css';
import HomeCarousel from './HomeCarousel';
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
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>
                            <Avatar size={48} src="https://www.w3schools.com/bootstrap4/img_avatar4.png" />
                        </div>
                        <div style={{ marginLeft: '8px', width: '100%' }}>
                            <Typography.Title level={5} style={{ marginBottom: 0 }}>Jessica Jones - Fantabolous Article</Typography.Title>
                            <Progress percent={99} strokeColor="#22282e" trailColor="#d5d5d5" style={{ width: '300px' }} format={per => <span>{per * 13} <EyeOutlined /></span>} />
                        </div>
                    </div>
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>
                            <Avatar size={48} src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" />
                        </div>
                        <div style={{ marginLeft: '8px', width: '100%' }}>
                            <Typography.Title level={5} style={{ marginBottom: 0 }}>Peter Parker - Best or Worst Spidey?</Typography.Title>
                            <Progress percent={83} strokeColor="#22282e" trailColor="#d5d5d5" style={{ width: '300px' }} format={per => <span>{per * 13} <EyeOutlined /></span>} />
                        </div>
                    </div>
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>
                            <Avatar size={48} src="https://www.w3schools.com/howto/img_avatar.png" />
                        </div>
                        <div style={{ marginLeft: '8px', width: '100%' }}>
                            <Typography.Title level={5} style={{ marginBottom: 0 }}>Bruce Banner - Dune Review ★★★★★</Typography.Title>
                            <Progress percent={67} strokeColor="#22282e" trailColor="#d5d5d5" style={{ width: '300px' }} format={per => <span>{per * 13} <EyeOutlined /></span>} />
                        </div>
                    </div>
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>
                            <Avatar size={48} src="https://www.w3schools.com/bootstrap4/img_avatar4.png" />
                        </div>
                        <div style={{ marginLeft: '8px', width: '100%' }}>    
                            <Tooltip title="Conner Kent - Memories of Murder ★★★★★ – Хамгийн шилдгийн нэг">
                                <Typography.Title level={5} ellipsis={true} style={{ marginBottom: 0, width: '300px' }}>Conner Kent - Memories of Murder ★★★★★ – Хамгийн шилдгийн нэг</Typography.Title>                            
                            </Tooltip>                        
                            <Progress percent={62} strokeColor="#22282e" trailColor="#d5d5d5" style={{ width: '300px' }} format={per => <span>{per * 13} <EyeOutlined /></span>} />
                        </div>
                    </div>
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>
                            <Avatar size={48} src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" />
                        </div>
                        <div style={{ marginLeft: '8px', width: '100%' }}>
                            <Typography.Title level={5} ellipsis={true} style={{ marginBottom: 0, width: '300px' }}>James Johnson - Top 10 films of Studio Ghibli</Typography.Title>
                            <Progress percent={43} strokeColor="#22282e" trailColor="#d5d5d5" style={{ width: '300px' }} format={per => <span>{per * 13} <EyeOutlined /></span>} />
                        </div>
                    </div>
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