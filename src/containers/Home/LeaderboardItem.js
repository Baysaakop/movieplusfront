import { EyeOutlined } from "@ant-design/icons"
import { Avatar, Progress, Tooltip, Typography } from "antd"

function LeaderboardItem (props) {
    return (
        <div>
             <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <div>
                    <Avatar size={48} src={props.avatar} />
                </div>
                <div style={{ marginLeft: '8px', width: '100%' }}>    
                    <Tooltip title={<span>{props.author} - {props.title}</span>}>
                        <Typography.Title level={5} ellipsis={true} style={{ marginBottom: 0, width: '280px' }}>{props.author} - {props.title}</Typography.Title>                            
                    </Tooltip>                        
                    <Progress percent={props.percent} strokeColor="#22282e" trailColor="#d5d5d5" style={{ width: '280px' }} format={per => <span>{per * 13} <EyeOutlined /></span>} />
                </div>
            </div>
        </div>
    )
}

export default LeaderboardItem