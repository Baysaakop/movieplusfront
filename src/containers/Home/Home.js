import { Button, Col, Row, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import api from '../../api';
import BoxOffice from './BoxOffice';
import FilmSwiper from './FilmSwiper';
import './Home.css';
import HomeCarousel from './HomeCarousel';
//import NewTrailers from './NewTrailers';
import HomeArticles from './HomeArticles';
import InTheaterList from './InTheaterList';
// import LeaderboardItem from './LeaderboardItem';
// import axios from 'axios';  
// import api from '../api';
// import { Link } from 'react-router-dom';

function Home (props) {        
    const history = useHistory()
    const [user, setUser] = useState()

    useEffect(() => {                
        if (props.token && !user) {
            getUser()
        }               
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps        

    function getUser () {        
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                    
            setUser(res.data)            
        }).catch(err => {
            console.log(err.message)            
        })
    }    

    return (
        <div className="home">
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={24} lg={16}>
                    <HomeCarousel />
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} style={{ height: '100%' }}>
                    <div className="list-header" style={{ margin: 0 }}>
                        <div className="list-header-title">
                            <Typography.Title level={4} style={{ margin: 0 }}>Box Office (7 хоног)</Typography.Title>
                        </div>
                        <div className="list-header-more">
                            <Button href="/films?order=-releasedate" size="large" type="link">Бүгд</Button>
                        </div>                
                    </div>                        
                    <BoxOffice />
                    {/* <Typography.Title level={4}><CrownOutlined />  Leaderboard</Typography.Title>
                    <LeaderboardItem avatar="https://www.w3schools.com/bootstrap4/img_avatar4.png" title="Fantabolous Article" author="Jessica Jones" percent={99} />                    
                    <LeaderboardItem avatar="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" title="Best or Worst Spidey?" author="Peter Parker" percent={88} />                                       
                    <LeaderboardItem avatar="https://www.w3schools.com/howto/img_avatar.png" title="Dune Review ★★★★" author="Bruce Banner" percent={77} />                    
                    <LeaderboardItem avatar="https://www.w3schools.com/bootstrap4/img_avatar4.png" title="Memories of Murder ★★★★★ – Хамгийн шилдгийн нэг" author="Jessica Jones" percent={66} />                    
                    <LeaderboardItem avatar="https://www.w3schools.com/howto/img_avatar.png" title="Top 10 films of Studio Ghibli" author="James Johnson" percent={55} />                                                             */}
                </Col>                
            </Row>            
            <div className="list-header">
                <div className="list-header-title">
                    <Typography.Title level={4} style={{ margin: 0 }}>Шинээр нээлтээ хийсэн</Typography.Title>
                </div>
                <div className="list-header-more">
                    <Button href="/films?order=-releasedate" size="large" type="link">Бүгд</Button>
                </div>                
            </div>    
            <FilmSwiper field="-releasedate" user={user} token={props.token} history={history} />                    
            <Row gutter={24} style={{ width: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <div className="list-header">
                        <div className="list-header-title">
                            <Typography.Title level={4} style={{ margin: 0 }}>Театрт гарч буй кинонууд</Typography.Title>
                        </div>
                        <div className="list-header-more">
                            <Button href="/films?order=-releasedate" size="large" type="link">Бүгд</Button>
                        </div>                
                    </div>                        
                    <InTheaterList field="-releasedate" />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <div className="list-header">
                        <div className="list-header-title">
                            <Typography.Title level={4} style={{ margin: 0 }}>Одоо гарч буй цувралууд</Typography.Title>
                        </div>
                        <div className="list-header-more">
                            <Button href="/films?order=-releasedate" size="large" type="link">Бүгд</Button>
                        </div>                
                    </div>    
                </Col>
            </Row>
            <div className="list-header">
                <div className="list-header-title">
                    <Typography.Title level={4} style={{ margin: 0 }}>Өндөр үнэлгээтэй</Typography.Title>
                </div>
                <div className="list-header-more">
                    <Button href="/films?order=-releasedate" size="large" type="link">Бүгд</Button>
                </div>                
            </div>    
            <FilmSwiper field="-avg_score" user={user} token={props.token} history={history} />         

            <div className="list-header">
                <div className="list-header-title">
                    <Typography.Title level={4} style={{ margin: 0 }}>Шинэ нийтлэлүүд</Typography.Title>
                </div>
                <div className="list-header-more">
                    <Button href="/films?order=-releasedate" size="large" type="link">Бүгд</Button>
                </div>                
            </div>      
            <HomeArticles />            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Home)