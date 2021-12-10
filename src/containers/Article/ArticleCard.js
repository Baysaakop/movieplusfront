import { CommentOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Card, Avatar, Typography, Tag } from "antd";
import moment from "moment";
import './ArticleCard.css'

function ArticleCard (props) {

    function formatCount(count) {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1).toString() + "M";
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1).toString() + "K";
        } else {
            return count.toString();
        }
    }

    return (
        <div>            
            <Card            
                bordered={false}
                hoverable
                className="article-card"
                cover={
                    <div className="article-image-container">
                        <a href={`/articles/${props.article.id}`}>
                            <img alt={props.article.title} src={props.article.thumbnail} />
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
                actions={[
                    <Typography.Text><LikeOutlined /> {formatCount(342)}</Typography.Text>,
                    <Typography.Text><EyeOutlined /> {formatCount(2845)}</Typography.Text>,
                    <Typography.Text><CommentOutlined /> {formatCount(16)}</Typography.Text>,
                ]}   
            >                
                <Card.Meta
                    avatar={<Avatar size="large" src={props.article.author.profile.avatar} />}
                    title={<Typography.Title level={5} style={{ margin: 0 }}>{props.article.author.username}</Typography.Title>}
                    description={<Typography.Text type="secondary">{moment(props.article.created_at).format("YYYY оны MM сарын DD")}</Typography.Text>}
                />
                <a href={`/articles/1`}>
                    <Typography.Paragraph ellipsis={{ rows: 4 }} style={{ marginTop: '8px' }}>
                        {props.article.outline}
                    </Typography.Paragraph>                    
                </a>
                <div className="article-card-footer">                    
                    {/* <Space size={[16, 16]} wrap>                       
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
                    </Tooltip> */}
                </div>
            </Card>            
        </div>
    )   
}

export default ArticleCard