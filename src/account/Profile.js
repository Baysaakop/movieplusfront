import { Button, Result, Row, Col, Avatar, Typography, Spin, Progress, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import './Profile.css'
import { CheckOutlined, ClockCircleOutlined, HeartOutlined, StarOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';

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
                                <div style={{ marginLeft: '12px' }}>
                                    <Typography.Title level={2} style={{ margin: 0 }}>{user.username}</Typography.Title>
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
                <div style={{ margin: '24px 0', textAlign: 'center' }}>
                    <Row gutter={[24, 24]}>          
                        <Col xs={24} sm={24} md={24} lg={6}>                            
                            <Card hoverable>
                                <Typography.Title level={3} style={{ margin: 0 }}>
                                    Таалагдсан
                                    <br />
                                    <HeartOutlined /> {user.profile.films_liked.length}
                                </Typography.Title>
                            </Card>
                        </Col>                                 
                        <Col xs={24} sm={24} md={24} lg={6}>
                            <Card hoverable>
                                <Typography.Title level={3} style={{ margin: 0 }}>
                                    Үзсэн
                                    <br />
                                    <CheckOutlined /> {user.profile.films_watched.length}
                                </Typography.Title>
                            </Card>
                        </Col>         
                        <Col xs={24} sm={24} md={24} lg={6}>
                            <Card hoverable>
                                <Typography.Title level={3} style={{ margin: 0 }}>
                                    Дараа үзэх
                                    <br />
                                    <ClockCircleOutlined style={{ fontSize: '24px' }} /> {user.profile.films_watchlist.length}
                                </Typography.Title>
                            </Card>
                        </Col>         
                        <Col xs={24} sm={24} md={24} lg={6}>
                            <Card hoverable>
                                <Typography.Title level={3} style={{ margin: 0 }}>
                                    Үнэлгээ өгсөн
                                    <br />
                                    <StarOutlined /> {user.profile.scores.length}
                                </Typography.Title>
                            </Card>
                        </Col>                              
                    </Row>
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