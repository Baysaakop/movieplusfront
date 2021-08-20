import React, { useState } from 'react';
import { Button, Grid, Avatar, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import TreeIcon from './TreeIcon';
import './Menu.css'
// import logo from './onplus-logo.png';
// import axios from 'axios';
// import api from '../api';
const { useBreakpoint } = Grid;

function CustomMenu (props) {    
    const screens = useBreakpoint();    
    const [collapsed, setCollapsed] = useState(false);          

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }         

    return (           
        screens.xs ? (
            <div className="menu-xs">           
                <div className="menu-top">
                    <Button className="logo" size="large" type="text">FILM+</Button> 
                    { collapsed ?
                    <Button className="hamburger-close" icon={<CloseOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    :                     
                    <Button className="hamburger-open" icon={<MenuOutlined />} size="large" type="text" onClick={handleMenuCollapsed} /> 
                    }
                </div>
                { collapsed ? (
                    <div className="menu-items">
                        <Button size="large" type="text">Кино</Button>
                        <Button size="large" type="text">Цуврал</Button>
                    </div>
                ) : []}                                            
            </div>    
        ) : (            
            <div className="menu-lg">       
                <div className="menu-left">
                    <Button className="logo" size="large" type="text">FILM+</Button>                    
                    <Button className="menu-item" size="large" type="text">Кино</Button>
                    <Button className="menu-item" size="large" type="text">Цуврал</Button>
                    <Button className="menu-item" size="large" type="text">Хүмүүс</Button>
                    <Button className="menu-item" size="large" type="text">Мэдээ</Button>
                    <Button className="menu-item" size="large" type="text">Шүүмж</Button>
                </div>
                <div className="menu-right">                
                    <Input.Search placeholder="Search..." size="large" style={{ width: '300px', marginRight: '16px' }} />            
                    {/* <Button size="large" type="text">Нэвтрэх</Button> */}                
                    <Avatar size="large" src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" />
                </div>   
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