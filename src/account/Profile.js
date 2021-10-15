import { Button, Result, Row, Col, Avatar, Typography, Spin, Tabs, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import './Profile.css'
import { CheckOutlined, ClockCircleOutlined, EditOutlined, HeartOutlined, StarOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import ProfileFilms from '../containers/Film/ProfileFilms';
import FilmScore from '../containers/Film/FilmScore';
import ProfileSeries from '../containers/Series/ProfileSeries';
import AccountDetail from './AccountDetail';

function Profile (props) {    
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {        
        if (props.token && props.token !== null && !user) {
            getUser()
        }
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function getUser () {
        setLoading(true)
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                    
            console.log(res.data)
            setUser(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }    

    function getAverageScoreFilm () {
        let count = 0
        let total = 0
        user.profile.film_scores.forEach(item => {
            total += item.user_score * 10
            count += 1
        });
        let avg = Math.round(total / count)                
        return avg
    }

    function getAverageScoreSeries () {
        let count = 0
        let total = 0
        user.profile.series_scores.forEach(item => {
            total += item.user_score * 10
            count += 1
        });
        let avg = total / count              
        return avg
    }

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : user ? (
            <div>
                <div className="container profile-top">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={24} md={24} lg={8}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div>
                                    {user.profile.avatar ? (
                                        <Avatar 
                                            className="profile-icon"
                                            size={104}                      
                                            src={user.profile.avatar}                                                          
                                        />
                                    ) : (
                                        <Avatar 
                                            className="profile-icon"
                                            size={104}                   
                                            icon={<UserOutlined />}                             
                                            style={{ background: '#2c3e50' }}                              
                                        />
                                    )}              
                                </div>
                                <div style={{ marginLeft: '16px' }}>                                    
                                    <Typography.Title level={3} style={{ margin: 0 }}>{user.username}</Typography.Title>                                                                        
                                    <Typography.Text type="secondary" style={{ display: 'block' }}>#DESCRIPTION</Typography.Text>           
                                    {editMode ? (
                                        <Button danger shape="round" size="small" type="dashed" icon={<StopOutlined />} onClick={() => setEditMode(false)}>Болих</Button>
                                    ) : (
                                        <Button shape="round" size="small" type="ghost" icon={<EditOutlined />} onClick={() => setEditMode(true)}>Засах</Button>
                                    )}                                                         
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Statistic title="Following" value={user.profile.following.length} style={{ margin: '0 8px' }} />                                                   
                            <Statistic title="Followers" value={user.profile.followers.length} style={{ margin: '0 8px' }} />                                                   
                        </Col>  
                        <Col xs={24} sm={24} md={24} lg={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <FilmScore type="mid" score={getAverageScoreFilm()} />
                            <div style={{ marginLeft: '12px' }}>
                                <Typography.Title level={5} style={{ marginBottom: 0 }}>Киноны</Typography.Title>
                                <Typography.Text>Дундаж үнэлгээ</Typography.Text>
                            </div>                                                                        
                        </Col>  
                        <Col xs={24} sm={24} md={24} lg={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <FilmScore type="mid" score={getAverageScoreSeries()} />         
                            <div style={{ marginLeft: '12px' }}>
                                <Typography.Title level={5} style={{ marginBottom: 0 }}>Цувралын</Typography.Title>
                                <Typography.Text>Дундаж үнэлгээ</Typography.Text>
                            </div>                                                                        
                        </Col>                                                                     
                    </Row>
                </div>
                <div className="container" style={{ margin: '24px 0' }}>
                    { editMode ? (
                        <div>   
                            <AccountDetail token={props.token} user={user} />
                        </div>
                    ) : (
                        <Tabs defaultActiveKey="1" centered>
                            <Tabs.TabPane key="1" tab="Профайл">
                                Профайл
                            </Tabs.TabPane>
                            <Tabs.TabPane key="2" tab="Кино">
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane key="1" tab={<span><CheckOutlined />Үзсэн</span>}>
                                        <ProfileFilms action="watched" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key="2" tab={<span><HeartOutlined />Таалагдсан</span>}>
                                        <ProfileFilms action="liked" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>                                
                                    <Tabs.TabPane key="3" tab={<span><ClockCircleOutlined />Дараа үзэх</span>}>
                                        <ProfileFilms action="watchlist" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key="4" tab={<span><StarOutlined />Үнэлгээ өгсөн</span>}>
                                        <ProfileFilms action="scores" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>
                                </Tabs>
                            </Tabs.TabPane>
                            <Tabs.TabPane key="3" tab="Цуврал">
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane key="1" tab={<span><CheckOutlined />Үзсэн</span>}>
                                        <ProfileSeries action="watched" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key="2" tab={<span><HeartOutlined />Таалагдсан</span>}>
                                        <ProfileSeries action="liked" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>                                
                                    <Tabs.TabPane key="3" tab={<span><ClockCircleOutlined />Дараа үзэх</span>}>
                                        <ProfileSeries action="watchlist" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane key="4" tab={<span><StarOutlined />Үнэлгээ өгсөн</span>}>
                                        <ProfileSeries action="scores" user={user} profile={user} token={props.token} />
                                    </Tabs.TabPane>
                                </Tabs>
                            </Tabs.TabPane>
                            <Tabs.TabPane key="4" tab="Сэтгэгдэл">
                            Reviews
                            </Tabs.TabPane>
                        </Tabs>
                    )}                    
                </div>                
            </div>
        ) : (
            <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Уучлаарай, та нэвтэрсэн байх шаардлагатай."
                    extra={<Button type="primary" href="/login">Нэвтрэх</Button>}
                />
            </div>
        )      
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Profile)