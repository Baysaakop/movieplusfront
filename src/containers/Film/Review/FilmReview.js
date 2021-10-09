import { CommentOutlined, EyeOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Space, Typography } from "antd"
import { useState, useEffect } from "react"
import moment from 'moment'
import FilmScore from "../FilmScore"

function FilmReview (props) {

    const [review, setReview] = useState()       

    useEffect(() => {
        setReview(props.data)
    }, [props.data])

    return (
        <div className="film-review">
            <Divider />
            { review ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <div>
                        {review.author.profile.avatar ? (
                            <Avatar 
                                className="profile-icon"
                                size="large"                       
                                src={review.author.profile.avatar}                                                                                          
                            />
                        ) : (
                            <Avatar 
                                className="profile-icon"
                                size="large"                       
                                icon={<UserOutlined />}                            
                                style={{ background: '#2c3e50' }}                                                              
                            />
                        )}             
                    </div>
                    <div style={{ marginLeft: '12px', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>          
                            <div>
                                <a href={`/reviews/${review.id}`}>
                                    <Typography.Title level={5} style={{ margin: 0 }}>{review.title}</Typography.Title>
                                </a>
                                <Typography.Text style={{ fontSize: '12px', margin: 0 }}>
                                    <span>Нийтлэсэн: {review.author.username}</span>
                                    <span> / {moment(review.created_at).format("YYYY-MM-DD")} /</span>
                                </Typography.Text>
                            </div>      
                            <div>
                                <FilmScore type="card" score={review.score * 10} />
                            </div>
                        </div>       
                        <div style={{ marginTop: '16px' }}>
                            <Typography.Paragraph ellipsis={{ rows: 5 }} style={{ margin: 0 }}>
                                {/* <div dangerouslySetInnerHTML={{__html: props.text }} />    */}
                                {review.outline}
                            </Typography.Paragraph> 
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                <Space size={[16, 16]} wrap>
                                    <Typography.Text><EyeOutlined /> {review.view_count} | </Typography.Text>
                                    <Typography.Text><LikeOutlined /> {review.like_count} | </Typography.Text>
                                    <Typography.Text><CommentOutlined /> {review.comments.length}</Typography.Text>
                                </Space>
                                <Button href={`/reviews/${review.id}`} size="small" type="link">Дэлгэрэнгүй...</Button>
                            </div>
                        </div>    
                    </div>                     
                </div> 
            ) : (
                <></>
            )}                                      
        </div>
    )
}

export default FilmReview