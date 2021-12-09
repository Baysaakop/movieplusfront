import { Row, Col, Avatar, Typography, Spin, Tabs, Button, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../../api';
import './UserDetail.css'
import { CheckOutlined, ClockCircleOutlined, EditOutlined, FacebookFilled, HeartOutlined, InstagramOutlined, StarOutlined, UserAddOutlined, UserDeleteOutlined, UserOutlined, YoutubeFilled } from '@ant-design/icons';
import ProfileFilms from '../Film/ProfileFilms';
import FilmScore from '../Film/FilmScore';
import { useHistory } from 'react-router';
import FilmRow from '../Film/FilmRow';

function UserDetail (props) {    
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState()
    const [user, setUser] = useState()

    useEffect(() => {        
        getItem()
        if (props.token && props.token !== null && !user) {
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

    function getItem () {
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
            setItem(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }    

    function getAverageScoreFilm () {
        let count = 0
        let total = 0
        item.profile.film_scores.forEach(score => {
            total += score.user_score * 10
            count += 1
        });
        let avg = Math.round(total / count)                
        return avg
    }

    function getAverageScoreSeries () {
        let count = 0
        let total = 0
        item.profile.series_scores.forEach(score => {
            total += score.user_score * 10
            count += 1
        });
        let avg = total / count              
        return avg
    }

    function onFollow () {
        if (user && props.token) {
            axios({
                method: 'PUT',
                url: `${api.users}/${user.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                  
                },
                data: {
                    follow: true,
                    user: item.id
                }
            })            
            .then(res => {                         
                if (res.status === 200) {
                    setUser(res.data.user)                    
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
        ) : item ? (
            <div className="user-detail">
                <div className="container user-detail-top">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={24} md={24} lg={6}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div>
                                    {item.profile.avatar ? (
                                        <Avatar 
                                            className="profile-icon"
                                            size={104}                      
                                            src={item.profile.avatar}                                                          
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
                                    <Typography.Title level={3} style={{ margin: 0 }}>{item.username}</Typography.Title>
                                    <Typography.Text type="secondary" style={{ marginBottom: '8px', display: 'block' }}>{item.profile.description}</Typography.Text>                  
                                    { user && user.id === item.id ? (
                                        <Button icon={<EditOutlined />} shape="round" size="small" type="ghost" href="/profile">Засах</Button>
                                    ) : user && user.profile.following.filter(x => x === item.id).length > 0 ? (
                                        <Button icon={<UserDeleteOutlined />} shape="round" size="small" type="dashed" onClick={onFollow}>Дагахаа болих</Button>
                                    ) : (
                                        <Button icon={<UserAddOutlined />} shape="round" size="small" type="primary" onClick={onFollow}>Дагах</Button>
                                    )}                
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={10} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div className="stats">
                                <Typography.Title level={4} style={{ margin: 0 }}>{item.profile.following.length.toLocaleString()}</Typography.Title>
                                <Typography.Text>Дагаж буй</Typography.Text>
                            </div>
                            <div className="stats">
                                <Typography.Title level={4} style={{ margin: 0 }}>{item.profile.followers.length.toLocaleString()}</Typography.Title>
                                <Typography.Text>Дагагчид</Typography.Text>
                            </div>
                            <div className="stats">
                                <Typography.Title level={4} style={{ margin: 0 }}>{item.profile.films_watched.length.toLocaleString()}</Typography.Title>
                                <Typography.Text>Кино</Typography.Text>
                            </div>
                            <div className="stats">
                                <Typography.Title level={4} style={{ margin: 0 }}>{item.profile.series_watched.length.toLocaleString()}</Typography.Title>
                                <Typography.Text>Цуврал</Typography.Text>
                            </div>                                                                                          
                        </Col>  
                        <Col xs={12} sm={12} md={12} lg={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <div>
                                <FilmScore type="mid" score={getAverageScoreFilm()} />
                                <Typography.Text>Киноны дундаж</Typography.Text>
                            </div>
                        </Col>  
                        <Col xs={12} sm={12} md={12} lg={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <div>
                                <FilmScore type="mid" score={getAverageScoreSeries()} />    
                                <Typography.Text>Цувралын дундаж</Typography.Text>     
                            </div>
                        </Col>                                                                
                    </Row>
                </div>
                <div className="container user-detail-bot">
                    <Tabs defaultActiveKey="1" centered>
                        <Tabs.TabPane key="1" tab="Профайл">
                            <Row gutter={[24, 0]}>
                                <Col xs={24} sm={24} md={24} lg={16}>
                                    <div className="recently-watched">
                                        <div className="film-list-header">
                                            <Typography.Title level={5} style={{ margin: 0 }}>Сүүлд үзсэн</Typography.Title>                                            
                                        </div>                  
                                        <div className="films">
                                            <FilmRow action="watched" user={user} item={item} token={props.token} />
                                        </div>
                                    </div>                                                      
                                    <div className="recently-liked">
                                        <div className="film-list-header">
                                            <Typography.Title level={5} style={{ margin: 0 }}>Таалагдсан</Typography.Title>
                                        </div>                  
                                        <div className="films">
                                            <FilmRow action="liked" user={user} item={item} token={props.token} />
                                        </div>
                                    </div>                  
                                    <div className="recently-liked">
                                        <div className="film-list-header">
                                            <Typography.Title level={5} style={{ margin: 0 }}>Өндөр үнэлгээ өгсөн</Typography.Title>                                            
                                        </div>                  
                                        <div className="films">
                                            <FilmRow action="scoresFromTop" user={user} item={item} token={props.token} />
                                        </div>
                                    </div>                                                                                
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8}>
                                    <div className="social-accounts">
                                        <div className="film-list-header">
                                            <Typography.Title level={5} style={{ margin: 0 }}>Сошиал хаягууд</Typography.Title>                                        
                                        </div>                                         
                                        { item.profile.facebook_channel ?                             
                                        <Button block href={item.profile.facebook_channel} target="_blank" type="ghost" size="large" icon={<FacebookFilled />} style={{ marginBottom: '8px' }}>Facebook</Button>
                                        : []}
                                        { item.profile.instagram_channel ?                             
                                        <Button block href={item.profile.instagram_channel} target="_blank" type="ghost" size="large" icon={<InstagramOutlined />} style={{ marginBottom: '8px' }}>Instagram</Button>
                                        : []}    
                                        { item.profile.youtube_channel ?                             
                                        <Button block href={item.profile.youtube_channel} target="_blank" type="ghost" size="large" icon={<YoutubeFilled />} style={{ marginBottom: '8px' }}>YouTube</Button>
                                        : []}             
                                    </div>
                                    <div className="following">
                                        <div className="film-list-header">
                                            <Typography.Title level={5} style={{ margin: 0 }}>Дагаж буй</Typography.Title>                                        
                                        </div>
                                        <Space size={8} wrap>
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        </Space>                     
                                    </div>    
                                    <div className="followers">
                                        <div className="film-list-header">
                                            <Typography.Title level={5} style={{ margin: 0 }}>Дагагчид</Typography.Title>                                        
                                        </div>
                                        <Space size={8} wrap>
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        </Space>                     
                                    </div>    
                                </Col>
                            </Row>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="2" tab="Кино">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane key="1" tab={<span><CheckOutlined />Үзсэн</span>}>
                                    <ProfileFilms action="watched" user={user} item={item} token={props.token} />
                                </Tabs.TabPane>
                                <Tabs.TabPane key="2" tab={<span><HeartOutlined />Таалагдсан</span>}>
                                    <ProfileFilms action="liked" user={user} item={item} token={props.token} />
                                </Tabs.TabPane>                                
                                <Tabs.TabPane key="3" tab={<span><ClockCircleOutlined />Дараа үзэх</span>}>
                                    <ProfileFilms action="watchlist" user={user} item={item} token={props.token} /> 
                                </Tabs.TabPane>
                                <Tabs.TabPane key="4" tab={<span><StarOutlined />Үнэлгээ өгсөн</span>}>
                                    <ProfileFilms action="scores" user={user} item={item} token={props.token} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="3" tab="Цуврал">
                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane key="1" tab={<span><CheckOutlined />Үзсэн</span>}>
                                    {/* <ProfileSeries action="watched" user={user} profile={profile} token={props.token} /> */}
                                </Tabs.TabPane>
                                <Tabs.TabPane key="2" tab={<span><HeartOutlined />Таалагдсан</span>}>
                                    {/* <ProfileSeries action="liked" user={user} profile={profile} token={props.token} /> */}
                                </Tabs.TabPane>                                
                                <Tabs.TabPane key="3" tab={<span><ClockCircleOutlined />Дараа үзэх</span>}>
                                    {/* <ProfileSeries action="watchlist" user={user} profile={profile} token={props.token} /> */}
                                </Tabs.TabPane>
                                <Tabs.TabPane key="4" tab={<span><StarOutlined />Үнэлгээ өгсөн</span>}>
                                    {/* <ProfileSeries action="scores" user={user} profile={profile} token={props.token} /> */}
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