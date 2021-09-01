import { Button, Result, Row, Col, Avatar, Typography, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import './Profile.css'
import { ToolOutlined, UserOutlined } from '@ant-design/icons';

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
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '24px' }}>
                                <div>
                                    {user.profile.avatar ? (
                                        <Avatar 
                                            className="profile-icon"
                                            size={128}                      
                                            src={user.profile.avatar}                                                          
                                        />
                                    ) : (
                                        <Avatar 
                                            className="profile-icon"
                                            size={160}                   
                                            icon={<UserOutlined />}                             
                                            style={{ background: '#2c3e50' }}                              
                                        />
                                    )}              
                                </div>
                                <div style={{ marginLeft: '12px' }}>
                                    <Typography.Title level={1} style={{ margin: 0 }}>{user.username}</Typography.Title>
                                    <Button icon={<ToolOutlined />} type="ghost">Мэдээлэл засах</Button>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            
                        </Col>
                        <Col span={8}>
                            
                        </Col>
                    </Row>
                </div>
                <div className="container" style={{ marginTop: '24px' }}>                                    
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