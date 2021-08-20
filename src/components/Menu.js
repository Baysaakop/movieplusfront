import React, { useEffect, useState } from 'react'
import { Button, Grid, Avatar, Input } from 'antd'
import { useHistory, withRouter } from 'react-router-dom'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth'
import './Menu.css'

// import axios from 'axios';
// import api from '../api';
const { useBreakpoint } = Grid;

function CustomMenu (props) {    
    const screens = useBreakpoint()
    const history = useHistory()
    const [current, setCurrent] = useState('home')
    const [collapsed, setCollapsed] = useState(false)          

    useEffect(() => {
        setCurrent(props.location.pathname.toString().split('/')[1])
    }, [props.location])

    const handleMenuClick = (page) => {                      
        setCurrent(page)
        setCollapsed(false)        
        history.push(`/${page}`)
    }

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed)
    }         

    return (           
        screens.xl ? (            
            <div className="menu-xl">       
                <div className="menu-left">
                    <div className="logo" shape="square" size="large" onClick={() => handleMenuClick('home')}>FILM+</div>                    
                    <Button className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('films')}>Кино</Button>
                    <Button className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('series')}>Цуврал</Button>
                    <Button className={ current === 'people' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('people')}>Хүмүүс</Button>
                    <Button className={ current === 'news' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('news')}>Мэдээ</Button>
                    <Button className={ current === 'reviews' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('reviews')}>Шүүмж</Button>
                </div>
                <div className="menu-right">                
                    <Input.Search placeholder="Search..." size="large" style={{ width: '300px', marginRight: '16px' }} />            
                    {/* <Button size="large" type="text">Нэвтрэх</Button> */}                
                    <Avatar 
                        className="profile-icon"
                        size="large" 
                        src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" 
                        onClick={() => handleMenuClick('profile')}
                    />
                </div>   
            </div>    
        ) : screens.lg ? (            
            <div className="menu-lg">       
                <div className="menu-left">
                    <Button className="logo" size="large" type="text" onClick={() => handleMenuClick('home')}>FILM+</Button>                    
                    <Button className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('films')}>Кино</Button>
                    <Button className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('series')}>Цуврал</Button>
                    <Button className={ current === 'people' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('people')}>Хүмүүс</Button>
                    <Button className={ current === 'news' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('news')}>Мэдээ</Button>
                    <Button className={ current === 'reviews' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('reviews')}>Шүүмж</Button>
                </div>
                <div className="menu-right">                
                    <Input.Search placeholder="Search..." size="large" style={{ width: '300px', marginRight: '16px' }} />            
                    {/* <Button className={ current === 'signin' ? 'selected-menu-item' : 'menu-item' } size="large" onClick={() => handleMenuClick('signin')} type="dashed">Нэвтрэх</Button>                 */}
                    <Avatar 
                        className="profile-icon"
                        size="large" 
                        src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" 
                        onClick={() => handleMenuClick('profile')}
                    />
                </div>   
            </div>    
        ) : (            
            <div className="menu-xs">           
                <div className="menu-top">
                    <Button className="logo" size="large" type="text" onClick={() => handleMenuClick('home')}>FILM+</Button> 
                    { collapsed ?
                    <Button className="hamburger-close" icon={<CloseOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    :                     
                    <Button className="hamburger-open" icon={<MenuOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    }
                </div>
                { collapsed ? (
                    <div className="menu-items">
                        <Button block className={ current === 'films' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('films')}>Кино</Button>
                        <Button block className={ current === 'series' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('series')}>Цуврал</Button>
                        <Button block className={ current === 'people' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('people')}>Хүмүүс</Button>
                        <Button block className={ current === 'news' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('news')}>Мэдээ</Button>
                        <Button block className={ current === 'reviews' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('reviews')}>Шүүмж</Button>
                        {/* <Button block className={ current === 'signin' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('signin')}>Нэвтрэх | Бүртгүүлэх</Button> */}
                        <Button block className={ current === 'profile' ? 'selected-menu-item' : 'menu-item' } size="large" type="text" onClick={() => handleMenuClick('profile')}>
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