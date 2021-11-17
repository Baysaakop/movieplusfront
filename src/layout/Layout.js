import React, { useEffect, useState } from 'react'
import { Grid, BackTop, Button, Layout } from 'antd'
import CustomMenu from '../components/Menu'
import { ArrowUpOutlined, TranslationOutlined } from '@ant-design/icons'
import SunIcon from './SunIcon'
import MoonIcon from './MoonIcon'
import './Layout.css'
import CustomFooter from '../components/CustomFooter'

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid

function CustomLayout (props) {        
    const screens = useBreakpoint()
    const [darkMode, setDarkMode] = useState(getInitialMode())    

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(darkMode))        
    }, [darkMode])

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem('dark'))
        const userPrefersDark = getPrefColorScheme()
        if (isReturningUser) {
            return savedMode
        } else if (userPrefersDark) {
            return true
        } else {
            return false
        }        
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return

        return window.matchMedia("(prefers-color-scheme: dark)").matches
    }

    return(
        <Layout className={darkMode ? "layout-dark" : "layout-light"}>
            <Header className="header">
                <CustomMenu {...props} darkMode={darkMode} />                
            </Header>
            <Content className="content">                                     
                <div className={ screens.xxl ? 'content-item-xxl' : screens.xl ? 'content-item-xl' : screens.lg ? 'content-item-lg' : 'content-item-xs' }>                    
                    {props.children} 
                </div>                
                <div className={ screens.xl ? 'content-side content-side-xl' : screens.lg ? 'content-side content-side-lg' : 'content-side content-side-xs' }>                    
                    <Button 
                        className="theme-switch"
                        type="text"         
                        size="large"
                        shape="circle"                                                                    
                        icon={darkMode ? <MoonIcon /> : <SunIcon />} 
                        onClick={() => 
                            setDarkMode(prevMode => !prevMode)                                
                        }
                    />                    
                    <Button 
                        className="language-switch"
                        type="text"         
                        size="large"
                        shape="circle"                                                                    
                        icon={<TranslationOutlined />} 
                    />
                    {/* </Tooltip> */}
                    <BackTop>
                        <Button type="text" size="large" shape="circle" icon={<ArrowUpOutlined />} />
                    </BackTop>
                </div>
                
            </Content>
            <Footer className="footer">    
                <CustomFooter />         
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;