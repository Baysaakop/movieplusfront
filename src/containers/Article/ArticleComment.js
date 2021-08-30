import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Input, Progress, Space, Typography } from "antd"
import { useState } from "react"
import './ArticleComment.css'

function ArticleComment (props) {

    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [reply, setReply] = useState(false)

    function onLike () {
        setLike(!like)
    }

    function onDislike () {
        setDislike(!dislike)
    }

    function onReply () {
        setReply(!reply)
    }

    return (
        <div className="article-comment">
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div>
                        <Avatar size="large" src={props.img} />
                    </div>
                    <div style={{ marginLeft: '12px' }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>{props.name}</Typography.Title>
                        <Typography.Text style={{ fontSize: '12px', margin: 0 }}>{props.date}</Typography.Text>
                    </div>
                </div>    
                <div>
                    <Progress                                                                   
                        type="circle"
                        width={40}                                                 
                        strokeColor="#f39c12"
                        trailColor="#3c3c3c"                                 
                        strokeWidth={6}      
                        percent={props.score}
                        format={percent => `${percent / 10}`}
                    /> 
                </div>
            </div>
            <Typography.Paragraph ellipsis={{ rows: 5 }}>
                {props.text}
            </Typography.Paragraph>
            <div>
                <Space size={[16, 16]} wrap>
                    <Button size="small" shape="round" type="text" icon={ like ? <LikeFilled /> : <LikeOutlined />} onClick={onLike}> 216</Button>
                    <Button size="small" shape="round" type="text" icon={ dislike ? <DislikeFilled /> : <DislikeOutlined />} onClick={onDislike}> 4</Button>
                    <Button size="small" shape="round" type="text" icon={ reply ? <MessageFilled /> : <MessageOutlined />} onClick={onReply}> Reply</Button>
                </Space>
            </div>
            { reply ? (
               <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <div>               
                        <Avatar size="large" src={props.img} />
                    </div>
                    <div style={{ marginLeft: '12px', width: '100%' }}>
                        <Input.TextArea rows={4} placeholder="Сэтгэгдэл бичих..." style={{ width: '100%', marginBottom: '8px' }} />                    
                        <Button size="small" type="primary">Submit</Button>                        
                    </div>
                </div>         
            ) : []}
        </div>
    )
}

export default ArticleComment