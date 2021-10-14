import { Button, Result, Row, Col, Avatar, Typography, Spin, Progress, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import './Profile.css'
import { CheckOutlined, ClockCircleOutlined, HeartOutlined, StarOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import ProfileFilms from '../containers/Film/ProfileFilms';

function Profile (props) {    
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState();

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

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : user ? (
            <div>
                <div className="container profile-top">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={24} md={24} lg={12}>
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
                                    <Typography.Text type="secondary">#DESCRIPTION</Typography.Text><br/>
                                    <Button size="small" icon={<ToolOutlined />} type="ghost" style={{ marginTop: '8px' }}>Мэдээлэл засах</Button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Progress                                                                   
                                type="circle"
                                width={64}                                                 
                                strokeColor="#f39c12"
                                trailColor="#3c3c3c"                                 
                                strokeWidth={6}      
                                percent={72}
                                format={percent => `${percent}`}
                            />         
                            <div style={{ marginLeft: '12px' }}>
                                <Typography.Title level={4} style={{ marginBottom: 0 }}>Киноны</Typography.Title>
                                <Typography.Text>Дундаж үнэлгээ</Typography.Text>
                            </div>                                                                        
                        </Col>  
                        <Col xs={24} sm={24} md={24} lg={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Progress                                                                   
                                type="circle"
                                width={64}                                                 
                                strokeColor="#f39c12"
                                trailColor="#3c3c3c"                                 
                                strokeWidth={6}      
                                percent={49}
                                format={percent => `${percent}`}
                            />         
                            <div style={{ marginLeft: '12px' }}>
                                <Typography.Title level={4} style={{ marginBottom: 0 }}>Цувралын</Typography.Title>
                                <Typography.Text>Дундаж үнэлгээ</Typography.Text>
                            </div>                                                                        
                        </Col>                                                                
                    </Row>
                </div>
                <div className="container" style={{ margin: '24px 0' }}>
                    <Tabs defaultActiveKey="1" centered>
                        <Tabs.TabPane key="1" tab="Профайл">
                            Профайл
                        </Tabs.TabPane>
                        <Tabs.TabPane key="2" tab="Кино">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane key="1" tab={<span><CheckOutlined />Үзсэн</span>}>
                                    <ProfileFilms type="film" action="watched" user={user} profile={user} token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="2" tab={<span><HeartOutlined />Таалагдсан</span>}>
                                    <ProfileFilms type="film" action="liked" user={user} profile={user} token={props.token} />
                                </Tabs.TabPane>                                
                                <Tabs.TabPane key="3" tab={<span><ClockCircleOutlined />Дараа үзэх</span>}>
                                    <ProfileFilms type="film" action="watchlist" user={user} profile={user} token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="4" tab={<span><StarOutlined />Үнэлгээ өгсөн</span>}>
                                    <ProfileFilms type="film" action="scores" user={user} profile={user} token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="3" tab="Цуврал">
                        Series
                        </Tabs.TabPane>
                        <Tabs.TabPane key="4" tab="Сэтгэгдэл">
                        Reviews
                        </Tabs.TabPane>
                    </Tabs>
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