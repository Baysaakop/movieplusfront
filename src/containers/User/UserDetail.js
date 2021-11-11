import { Row, Col, Avatar, Typography, Spin, Tabs, Button, message, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../../api';
import './UserDetail.css'
import { CheckOutlined, ClockCircleOutlined, HeartOutlined, StarOutlined, UserAddOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import ProfileFilms from '../Film/ProfileFilms';
import FilmScore from '../Film/FilmScore';
import ProfileSeries from '../Series/ProfileSeries';
import { useHistory } from 'react-router';

function UserDetail (props) {    
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()
    const [profile, setProfile] = useState()

    useEffect(() => {        
        getUser()
        if (props.token && props.token !== null && !profile) {
            getProfile()
        }
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function getProfile () {        
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                
            console.log(res.data)                                           
            setProfile(res.data)
        }).catch(err => {
            console.log(err.message)            
        })
    }    

    function getUser () {
        setLoading(true)
        const id = props.match.params.id
        const url = api.users + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',                
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

    function onFollow () {
        if (profile && props.token) {
            axios({
                method: 'PUT',
                url: `${api.users}/${profile.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                  
                },
                data: {
                    follow: true,
                    user: user.id
                }
            })            
            .then(res => {                         
                if (res.status === 200) {
                    setProfile(res.data.user)                    
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Error has occured. Please try again later.")
            }) 
        } else {
            history.push("/login")
        }
    }

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : user ? (
            <div>
                <div className="container user-detail-top">
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
                                    <Typography.Text type="secondary">#DESCRIPTION</Typography.Text><br/>                    
                                    { profile && profile.profile.following.filter(x => x === user.id).length > 0 ? (
                                        <Button icon={<UserDeleteOutlined />} shape="round" size="small" type="primary" danger onClick={onFollow}>Unfollow</Button>
                                    ) : (
                                        <Button icon={<UserAddOutlined />} shape="round" size="small" type="primary" onClick={onFollow}>Follow</Button>
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
                    <Tabs defaultActiveKey="1" centered>
                        <Tabs.TabPane key="1" tab="Профайл">
                            <Row gutter={[24, 0]}>
                                <Col xs={24} sm={24} md={24} lg={16}>
                                    <Typography.Title level={5}>Сүүлд үзсэн</Typography.Title>
                                    <Typography.Title level={5}>Таалагдсан</Typography.Title>
                                    <Typography.Title level={5}>Өндөр үнэлгээ өгсөн</Typography.Title>                                    
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8}>
                                    <Typography.Title level={5}>Сошиал хаягууд</Typography.Title>
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="2" tab="Кино">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane key="1" tab={<span><CheckOutlined />Үзсэн</span>}>
                                    <ProfileFilms action="watched" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="2" tab={<span><HeartOutlined />Таалагдсан</span>}>
                                    <ProfileFilms action="liked" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>                                
                                <Tabs.TabPane key="3" tab={<span><ClockCircleOutlined />Дараа үзэх</span>}>
                                    <ProfileFilms action="watchlist" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="4" tab={<span><StarOutlined />Үнэлгээ өгсөн</span>}>
                                    <ProfileFilms action="scores" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="3" tab="Цуврал">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane key="1" tab={<span><CheckOutlined />Үзсэн</span>}>
                                    <ProfileSeries action="watched" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="2" tab={<span><HeartOutlined />Таалагдсан</span>}>
                                    <ProfileSeries action="liked" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>                                
                                <Tabs.TabPane key="3" tab={<span><ClockCircleOutlined />Дараа үзэх</span>}>
                                    <ProfileSeries action="watchlist" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="4" tab={<span><StarOutlined />Үнэлгээ өгсөн</span>}>
                                    <ProfileSeries action="scores" user={user} profile={profile} token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="4" tab="Сэтгэгдэл">
                        Reviews
                        </Tabs.TabPane>
                    </Tabs>
                </div>                
            </div>       
        ) : []
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(UserDetail)