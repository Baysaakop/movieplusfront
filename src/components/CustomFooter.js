import { FacebookFilled, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons'
import { Grid, Button, Typography, Space, Tooltip } from 'antd'
import './CustomFooter.css'

const { useBreakpoint } = Grid;

function CustomFooter () {

    const screens = useBreakpoint()    

    return (
        <div className={ screens.xxl ? "footer-xxl" : screens.xl ? "footer-xl" : screens.lg ? "footer-lg" : "footer-xs" }>           
            <div className="left" style={{ textAlign: 'left' }}>
                <Typography.Text>
                    © 2021 MOVIE+ Project. All Rights Reserved. Designed and developed by ON+ LLC                 
                </Typography.Text>
            </div> 
            <Space size={4} wrap> 
                <Tooltip title="Facebook">
                    <Button icon={<FacebookFilled />} type="ghost" shape="circle" size="large" />
                </Tooltip>
                <Tooltip title="Instagram">
                    <Button icon={<InstagramOutlined />} type="ghost" shape="circle" size="large" style={{ marginLeft: '8px' }} />
                </Tooltip>
                <Tooltip title="Youtube">
                    <Button icon={<YoutubeOutlined />} type="ghost" shape="circle" size="large" style={{ marginLeft: '8px' }} />
                </Tooltip>
            </Space>            
        </div>   
    )
}

export default CustomFooter