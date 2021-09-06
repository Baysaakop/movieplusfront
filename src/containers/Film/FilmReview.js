import { Avatar, Button, Divider, Progress, Typography } from "antd"

function FilmReview (props) {
    return (
        <div className="film-review">
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <div>
                    <Avatar size={64} src={props.img} />
                </div>
                <div style={{ marginLeft: '12px', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>          
                        <div>
                            <Typography.Title level={5} style={{ margin: 0 }}>{props.title}</Typography.Title>
                            <Typography.Text style={{ fontSize: '12px', margin: 0 }}>
                                <span>Нийтлэсэн: {props.author}</span>
                                <span> / {props.date} /</span>
                            </Typography.Text>
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
                    <div style={{ marginTop: '16px' }}>
                        <Typography.Paragraph ellipsis={{ rows: 5, expandable: true, symbol: <Button href="/articles" size="small" type="link">Дэлгэрэнгүй</Button> }}>
                            {/* <div dangerouslySetInnerHTML={{__html: props.text }} />    */}
                            {props.text}
                        </Typography.Paragraph> 
                    </div>    
                </div>                     
            </div>                           
        </div>
    )
}

export default FilmReview