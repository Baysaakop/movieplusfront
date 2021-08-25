import { DoubleRightOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Progress, Typography } from "antd"
import './FilmReview.css'

function FilmReview (props) {
    return (
        <div className="film-review">
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Avatar size="large" src={props.img} />
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
            <Typography.Paragraph ellipsis={{ rows: 5 }} style={{ marginBottom: 0 }}>
                {props.text}
            </Typography.Paragraph>
            <div style={{ textAlign: 'right' }}>
                <Button size="small" icon={<DoubleRightOutlined />} type="link">Үргэлжлүүлэх</Button>
            </div>
        </div>
    )
}

export default FilmReview