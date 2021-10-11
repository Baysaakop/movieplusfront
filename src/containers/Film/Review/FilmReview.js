import { DeleteOutlined, DislikeFilled, DislikeOutlined, EditOutlined, LikeFilled, LikeOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, message, Popconfirm, Space, Typography } from "antd"
import { useState, useEffect } from "react"
import moment from 'moment'
import FilmScore from "../FilmScore"
import ReviewModalUpdate from "./ReviewModalUpdate"
import axios from "axios"
import api from "../../../api"

function FilmReview (props) {
    const [user, setUser] = useState()
    const [review, setReview] = useState()       
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setUser(props.user)
        setReview(props.data)
    }, [props.data]) // eslint-disable-line react-hooks/exhaustive-deps            


    function getScore () {
        let item = review.user.profile.scores.find(x => x.film === props.film.id)        
        if (item && item !== null) {
            return item.user_score
        }
    }

    function onLike () {
        axios({
            method: 'PUT',
            url: `${api.reviews}/${review.id}/`,            
            data: {
                like: true,
                token: props.token
            },
            headers: {    
                'Content-Type': 'application/json',              
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {                        
            console.log(res.data)
            setUser(res.data.user)
            setReview(res.data.review)
        }).catch(err => {
            console.log(err.message)                        
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")                
        }) 
    }

    function onDislike () {
        axios({
            method: 'PUT',
            url: `${api.reviews}/${review.id}/`,            
            data: {
                dislike: true,
                token: props.token
            },
            headers: {    
                'Content-Type': 'application/json',              
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {                        
            console.log(res.data)
            setUser(res.data.user)
            setReview(res.data.review)
        }).catch(err => {
            console.log(err.message)                        
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")                
        }) 
    }

    function onHide (review) {
        setReview(review)
        setVisible(false)
    }

    function onDelete () {
        axios({
            method: 'DELETE',
            url: `${api.reviews}/${review.id}/`,            
            headers: {                
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {                        
            message.info("Сэтгэгдэл устлаа.")                                
            props.onDelete()
        }).catch(err => {
            console.log(err.message)                        
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")                
        }) 
    }

    return (
        <div className="film-review">
            <Divider />
            { review ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <div>
                        {review.user.profile.avatar ? (
                            <Avatar 
                                className="profile-icon"
                                size="large"                       
                                src={review.user.profile.avatar}                                                                                          
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
                                    <span>Нийтлэсэн: <a href={`/profiles/${review.user.id}`}>{review.user.username}</a></span>
                                    <span> / {moment(review.created_at).format("YYYY-MM-DD")} /</span>
                                </Typography.Text>
                            </div>      
                            <div>
                                <FilmScore type="card" score={getScore() * 10} />
                            </div>
                        </div>       
                        <div style={{ marginTop: '16px' }}>
                            { review.is_spoiler ? (
                                <Typography.Text type="danger">!!! SPOILER ALERT !!!</Typography.Text>
                            ) : <></>}
                            <Typography.Paragraph ellipsis={{ rows: 5 }} style={{ margin: 0 }}>                                
                                <div dangerouslySetInnerHTML={{__html: review.comment }} />                                
                            </Typography.Paragraph> 
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                <Space size={[8, 8]} wrap>
                                    { user && user.profile.reviews_liked.filter(x => x === review.id).length > 0 ? (
                                        <Button size="small" shape="round" type="ghost" icon={<LikeFilled />} onClick={onLike}> {review.like_count}</Button>
                                    ) : (
                                        <Button size="small" shape="round" type="ghost" icon={<LikeOutlined />} onClick={onLike}> {review.like_count}</Button>
                                    )}
                                    { user && user.profile.reviews_disliked.filter(x => x === review.id).length > 0 ? (
                                        <Button size="small" shape="round" type="ghost" icon={<DislikeFilled />} onClick={onDislike}> {review.dislike_count}</Button>
                                    ) : (
                                        <Button size="small" shape="round" type="ghost" icon={<DislikeOutlined />} onClick={onDislike}> {review.dislike_count}</Button>    
                                    )}                                    
                                    { user && user.id === review.user.id ? (                                        
                                        <Button size="small" shape="round" type="text" icon={<EditOutlined />} onClick={() => setVisible(true)}> Засах</Button>                                                                                   
                                    ) : []}            
                                    { user && (user.id === review.user.id || parseInt(user.profile.role)) < 3 ? (
                                        <Popconfirm title="Устгах уу?" onConfirm={onDelete}>
                                            <Button danger size="small" shape="round" type="text" icon={<DeleteOutlined />}> Устгах</Button>
                                        </Popconfirm>
                                    ) : (
                                        <></>
                                    )}                                                     
                                </Space>
                                { visible ? 
                                    <ReviewModalUpdate 
                                        review={review} 
                                        film={props.film} 
                                        user={user} 
                                        token={props.token} 
                                        hide={onHide} 
                                    /> 
                                    : 
                                    <></> 
                                }                                
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