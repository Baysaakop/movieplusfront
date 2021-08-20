import React, { useEffect, useState } from 'react';
import { Button, Layout, Tooltip } from 'antd';
import CustomMenu from '../components/Menu';
import './Layout.css';
import { FacebookFilled, GithubFilled, GlobalOutlined, InstagramOutlined, TranslationOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import SunIcon from './SunIcon';
import MoonIcon from './MoonIcon';

const { Header, Content, Footer } = Layout;

function CustomLayout (props) {        
    const [darkMode, setDarkMode] = useState(getInitialMode());    

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(darkMode))        
    }, [darkMode])

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem('dark'));
        const userPrefersDark = getPrefColorScheme();
        if (isReturningUser) {
            return savedMode;
        } else if (userPrefersDark) {
            return true;
        } else {
            return false;
        }        
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    // const styleHeader = {
    //     background: scrollTop ? 'transparent' : '',    
    //     display: 'inline-block',
    //     zIndex: '99', 
    //     position: 'fixed',      
    //     padding: '0',    
    //     margin: '0',
    //     height: '80px',
    //     width: '100%',        
    // }
    
    const styleContentSwitch = {
        position: 'fixed',
        zIndex: '2',
        top: '50%',
        right: '6%'
    }
    
    // const styleFooter = {    
    //     background: darkMode ? '#161b22' : '#fff',    
    //     color: darkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
    //     padding: 0,                            
    //     minHeight: '200px',
    //     width: '100%',    
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     textAlign: 'center',    
    // }

    return(
        <Layout className={darkMode ? "layout-dark" : "layout-light"}>
            <Header className="header">
                <CustomMenu {...props} darkMode={darkMode} />                
            </Header>
            <Content className="content">                                     
                <div className="content-item">                    
                    {props.children} 
                </div>                
                <div className="theme-switch-container">
                    {/* <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}> */}
                    <Button 
                        className="them-switch"
                        type="text"         
                        size="large"
                        shape="circle"                                                                    
                        icon={darkMode ? <MoonIcon /> : <SunIcon />} 
                        onClick={() => 
                            setDarkMode(prevMode => !prevMode)                                
                        }
                    />
                    {/* </Tooltip> */}
                    {/* <Tooltip title="Change Language"> */}
                    <Button 
                        className="language-switch"
                        type="text"         
                        size="large"
                        shape="circle"                                                                    
                        icon={<TranslationOutlined />} 
                        onClick={() => 
                            setDarkMode(prevMode => !prevMode)                                
                        }
                    />
                    {/* </Tooltip> */}
                </div>
            </Content>
            <Footer className="footer">    
                <div>
                    © 2021 Movie Plus Project. All Rights Reserved. Designed and developed by On Plus Tech.                  
                </div>            
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;