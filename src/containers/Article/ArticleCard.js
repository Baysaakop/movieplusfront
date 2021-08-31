import { CommentOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import SaveIcon from '../../components/SaveIcon'
import { Card, Avatar, Typography, Button, Space, Tooltip, Tag } from "antd";
import moment from "moment";
import './ArticleCard.css'

function NewsCard (props) {
    return (
        <div>            
            <Card            
                bordered={false}
                hoverable
                className="article-card"
                cover={
                    <div className="article-image-container">
                        <a href={`/articles/1`}>
                            <img alt={props.article.title} src={props.article.urlToImage} />
                        </a>
                        <div className="article-card-title">
                            {props.article.title}
                        </div>
                        <div className="article-card-category">
                            <Tag color="#130f40">Шинэ бүтээл</Tag>
                            <Tag color="#40407a">Review</Tag>
                        </div>
                    </div>
                }                
            >                
                <Card.Meta
                    avatar={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<Typography.Title level={5} style={{ margin: 0 }}>{props.article.author}</Typography.Title>}
                    description={<Typography.Text type="secondary">{moment(props.article.publishedAt).format("YYYY-MM-DD HH:MM")}</Typography.Text>}
                />
                <a href={`/articles/1`}>
                    <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ marginTop: '8px' }}>
                        {props.article.content}
                    </Typography.Paragraph>                    
                </a>
                <div className="article-card-footer">
                    <Space size={[16, 16]} wrap>                       
                        <div>                            
                            <Typography.Text style={{ fontSize: '14px' }}><LikeOutlined style={{ fontSize: '16px' }} /> 524</Typography.Text>
                        </div>                        
                        <div>                            
                            <Typography.Text style={{ fontSize: '14px' }}><CommentOutlined style={{ fontSize: '16px' }} /> 17</Typography.Text>
                        </div>
                        <div>                            
                            <Typography.Text style={{ fontSize: '14px' }}><EyeOutlined style={{ fontSize: '16px' }} /> 2138</Typography.Text>
                        </div>
                    </Space>
                    <Tooltip title="Хадгалах" placement="top">
                        <Button shape="circle" size="large" type="text" icon={<SaveIcon />} />
                    </Tooltip>
                </div>
            </Card>            
        </div>
    )   
}

export default NewsCard