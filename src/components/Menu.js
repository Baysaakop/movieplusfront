import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, Tooltip } from 'antd'
import { withRouter } from 'react-router-dom'
import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import './Menu.css'
import axios from 'axios';
import api from '../api';

const { useBreakpoint } = Grid;

function CustomMenu (props) {    
    const screens = useBreakpoint()    
    const [current, setCurrent] = useState('home')
    const [collapsed, setCollapsed] = useState(false)          
    const [user, setUser] = useState()

    useEffect(() => {                
        setCurrent(props.location.pathname.toString().split('/')[1])
        if (props.token && props.token !== null && !user) {
            getUser()
        }
    }, [props.location, props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleMenuClick = (page) => {                      
        setCurrent(page)
        setCollapsed(false)                
    }

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed)
    }         

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
        screens.xxl || screens.xl || screens.lg ? (                                    
            <div className={ screens.xxl ? "menu-large menu-xxl" : screens.xl ? "menu-large menu-xl" : "menu-large menu-lg" }>       
                <div className="menu-left">
                    <a href="/">
                        <div className="logo" shape="square" size="large" onClick={() => handleMenuClick('home')}>MOVIE+</div>                    
                    </a>                                                               
                </div>
                <div className="menu-right">                       
                    <Button className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/films" onClick={() => handleMenuClick('films')}>????????</Button>
                    <Button className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/series" onClick={() => handleMenuClick('series')}>????????????</Button>
                    <Button className={ current === 'artists' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/artists" onClick={() => handleMenuClick('artists')}>????????????</Button>
                    <Button className={ current === 'articles' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/articles" onClick={() => handleMenuClick('articles')}>??????????????</Button>                                                    
                    {/* <Button icon={<FormOutlined />} type="primary" size="middle" href="writereview" style={{ marginRight: '16px' }}>?????????????? ??????????</Button>                                        */}
                    { user ? (
                        <Tooltip title="??????????????">
                            <a href={`/users/${user.id}`}>
                                {user.profile.avatar ? (
                                    <Avatar 
                                        className="profile-icon"
                                        size="large"                       
                                        src={user.profile.avatar}                                                          
                                        onClick={() => handleMenuClick('profile')}
                                    />
                                ) : (
                                    <Avatar 
                                        className="profile-icon"
                                        size="large"                       
                                        icon={<UserOutlined />}                            
                                        style={{ background: '#2c3e50' }}                              
                                        onClick={() => handleMenuClick('profile')}
                                    />
                                )}                            
                            </a> 
                        </Tooltip>
                    ) : (
                        <Button icon={<UserOutlined />} className={ current === 'signin' ? 'selected-menu-item' : 'menu-item' } size="large" type="dashed" href="/login" onClick={() => handleMenuClick('signin')}>??????????????</Button>                
                    )}                               
                </div>   
            </div>       
        ) : (            
            <div className="menu-small menu-xs">           
                <div className="menu-top">
                    <a href="/">
                        <div className="logo" shape="square" size="large" onClick={() => handleMenuClick('home')}>MOVIE+</div>                    
                    </a>                    
                    { collapsed ?
                    <Button className="hamburger-close" icon={<CloseOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    :                     
                    <Button className="hamburger-open" icon={<MenuOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    }
                </div>
                { collapsed ? (
                    <div className="menu-items">
                        <Button block className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/films" onClick={() => handleMenuClick('films')}>????????</Button>
                        <Button block className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/series" onClick={() => handleMenuClick('series')}>????????????</Button>
                        <Button block className={ current === 'artists' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/artists" onClick={() => handleMenuClick('artists')}>????????????</Button>
                        <Button block className={ current === 'articles' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/articles" onClick={() => handleMenuClick('articles')}>??????????????</Button>                                                                       
                        { user ? (
                            <a href={`/users/${user.id}`}>
                                {user.profile.avatar ? (
                                    <Button block className={ current === 'profile' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/profile" onClick={() => handleMenuClick('profile')}>
                                        <Avatar 
                                            size="large" 
                                            style={{ marginRight: '8px' }} 
                                            src={user.profile.avatar}
                                        />
                                        ??????????????
                                    </Button>                        
                                ) : (
                                    <Button block className={ current === 'profile' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/profile" onClick={() => handleMenuClick('profile')}>
                                        <Avatar 
                                            size="large"                                             
                                            icon={<UserOutlined />}                            
                                            style={{ background: '#2c3e50', marginRight: '8px' }}               
                                        />
                                        ??????????????
                                    </Button>      
                                )}                            
                            </a> 
                        ) : (
                            <Button block className={ current === 'signin' ? 'selected-menu-item' : 'menu-item' } size="large" type="text"  href="/login" onClick={() => handleMenuClick('signin')}>??????????????</Button>
                        )}                               
                    </div>
                ) : []}                                            
            </div>                      
        )                     
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default withRouter(connect(mapStateToProps, null)(CustomMenu));