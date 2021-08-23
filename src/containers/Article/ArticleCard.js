import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
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
                        <a href={`/news/${props.article.id}`}>
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
                <a href={props.article.url}>
                    <Typography.Paragraph ellipsis={{ rows: 3 }} style={{ marginTop: '8px' }}>
                        {props.article.content}
                    </Typography.Paragraph>                    
                </a>
                <div className="article-card-footer">
                    <Space size={[8, 8]} wrap>
                        <div>
                            <Button shape="circle" size="large" type="text" icon={<LikeOutlined />} />
                            <Typography.Text>524</Typography.Text>
                        </div>
                        <div>
                            <Button shape="circle" size="large" type="text" icon={<CommentOutlined />} />
                            <Typography.Text>14</Typography.Text>
                        </div>
                    </Space>
                    <Tooltip title="Хадгалах">
                        <Button shape="circle" size="large" type="text" icon={<SaveIcon />} />
                    </Tooltip>
                </div>
            </Card>            
        </div>
    )   
}

export default NewsCard