import React, { useEffect, useState } from 'react'
import { Button, Grid, Avatar, Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth'
import './Menu.css'
// import axios from 'axios';
// import api from '../api';
const { useBreakpoint } = Grid;

function CustomMenu (props) {    
    const screens = useBreakpoint()    
    const [current, setCurrent] = useState('home')
    const [collapsed, setCollapsed] = useState(false)          

    useEffect(() => {        
        setCurrent(props.location.pathname.toString().split('/')[1])
    }, [props.location])

    const handleMenuClick = (page) => {                      
        setCurrent(page)
        setCollapsed(false)                
    }

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed)
    }         

    return (           
        screens.xxl ? (            
            <div className="menu-large menu-xxl">       
                <div className="menu-left">
                    <a href="/">
                        <div className="logo" shape="square" size="large" onClick={() => handleMenuClick('home')}>FILM+</div>                    
                    </a>
                    <Button className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/films" onClick={() => handleMenuClick('films')}>Кино</Button>
                    <Button className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/series" onClick={() => handleMenuClick('series')}>Цуврал</Button>
                    <Button className={ current === 'artists' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/artists" onClick={() => handleMenuClick('artists')}>Хүмүүс</Button>
                    <Button className={ current === 'articles' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/articles" onClick={() => handleMenuClick('articles')}>Нийтлэл</Button>                    
                </div>
                <div className="menu-right">                
                    <Input.Search placeholder="Search..." size="large" style={{ width: '300px', marginRight: '16px' }} />            
                    {/* <Button size="large" type="text">Нэвтрэх</Button> */}                
                    <a href="/profile">
                        <Avatar 
                            className="profile-icon"
                            size="large"                                                 
                            src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" 
                            onClick={() => handleMenuClick('profile')}
                        />
                    </a>
                </div>   
            </div>    
        ) : screens.xl ? (            
            <div className="menu-large menu-xl">       
                <div className="menu-left">
                    <a href="/">
                        <div className="logo" shape="square" size="large" onClick={() => handleMenuClick('home')}>FILM+</div>                    
                    </a>
                    <Button className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/films" onClick={() => handleMenuClick('films')}>Кино</Button>
                    <Button className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/series" onClick={() => handleMenuClick('series')}>Цуврал</Button>
                    <Button className={ current === 'artists' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/artists" onClick={() => handleMenuClick('artists')}>Хүмүүс</Button>
                    <Button className={ current === 'articles' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/articles" onClick={() => handleMenuClick('articles')}>Нийтлэл</Button>                    
                </div>
                <div className="menu-right">                
                    <Input.Search placeholder="Search..." size="large" style={{ width: '300px', marginRight: '16px' }} />            
                    {/* <Button size="large" type="text">Нэвтрэх</Button> */}                
                    <a href="/profile">
                        <Avatar 
                            className="profile-icon"
                            size="large"                                                 
                            src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" 
                            onClick={() => handleMenuClick('profile')}
                        />
                    </a>
                </div>   
            </div>    
        ) : screens.lg ? (            
            <div className="menu-large menu-lg">       
                <div className="menu-left">
                    <a href="/">
                        <div className="logo" shape="square" size="large" onClick={() => handleMenuClick('home')}>FILM+</div>                    
                    </a>                
                    <Button className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/films" onClick={() => handleMenuClick('films')}>Кино</Button>
                    <Button className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/series" onClick={() => handleMenuClick('series')}>Цуврал</Button>
                    <Button className={ current === 'artists' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/artists" onClick={() => handleMenuClick('artists')}>Хүмүүс</Button>
                    <Button className={ current === 'articles' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/articles" onClick={() => handleMenuClick('articles')}>Нийтлэл</Button>                    
                </div>
                <div className="menu-right">                
                    <Input.Search placeholder="Search..." size="large" style={{ width: '300px', marginRight: '16px' }} />            
                    {/* <Button className={ current === 'signin' ? 'selected-menu-item' : 'menu-item' } size="large" onClick={() => handleMenuClick('signin')} type="dashed">Нэвтрэх</Button>                 */}
                    <a href="/profile">
                        <Avatar 
                            className="profile-icon"
                            size="large" 
                            href="/profile"
                            src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" 
                            onClick={() => handleMenuClick('profile')}
                        />
                    </a>
                </div>   
            </div>    
        ) : (            
            <div className="menu-small menu-xs">           
                <div className="menu-top">
                    <a href="/">
                        <div className="logo" shape="square" size="large" onClick={() => handleMenuClick('home')}>FILM+</div>                    
                    </a>                    
                    { collapsed ?
                    <Button className="hamburger-close" icon={<CloseOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    :                     
                    <Button className="hamburger-open" icon={<MenuOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    }
                </div>
                { collapsed ? (
                    <div className="menu-items">
                        <Button block className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/films" onClick={() => handleMenuClick('films')}>Кино</Button>
                        <Button block className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/series" onClick={() => handleMenuClick('series')}>Цуврал</Button>
                        <Button block className={ current === 'artists' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/artists" onClick={() => handleMenuClick('artists')}>Хүмүүс</Button>
                        <Button block className={ current === 'articles' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/articles" onClick={() => handleMenuClick('articles')}>Мэдээ</Button>                        
                        {/* <Button block className={ current === 'signin' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('signin')}>Нэвтрэх | Бүртгүүлэх</Button> */}
                        <Button block className={ current === 'profile' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" href="/profile" onClick={() => handleMenuClick('profile')}>
                            <Avatar size="large" style={{ marginRight: '8px' }} src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" />
                            Профайл
                        </Button>                        
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

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomMenu));