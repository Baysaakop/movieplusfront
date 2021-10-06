import React, { useEffect, useState } from "react"
import { Avatar, Breadcrumb, Col, Descriptions, message, Row, List, Space, Typography, Pagination, Button } from "antd"
import axios from "axios"
import api from "../../../api"
import blank from '../blank.jpg'
import moment from 'moment'
import FilmScore from "../FilmScore"
import { EyeOutlined, LikeOutlined, MessageOutlined, StarOutlined, UserOutlined } from "@ant-design/icons"
import './ReviewList.css'

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function ReviewList (props) {

    const [reviews, setReviews] = useState()
    const [film, setFilm] = useState()
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()

    useEffect(() => {
        const params = new URLSearchParams(props.location.search) 
        let param_film = params.get('film')    
        if (param_film.endsWith('/')) {
            param_film = param_film.replace('/', '')
        }
        getReviews(param_film, page)  
        getFilm(param_film)
    }, [props.location.search, page])

    function getReviews(film, page) {
        let url = api.reviews + "?film=" + film + "&page=" + page
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                                        
            setReviews(res.data.results)       
            setTotal(res.data.count)                
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getFilm(id) {        
        const url = api.films + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                                            
            setFilm(res.data)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getGenres (genres) {
        let result = []
        genres.forEach(gen => {
            result.push(gen.name)
        });
        return result.toLocaleString()
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)    
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
    } 

    return (
        <div>
            {reviews && film ? (                
                <div className="reviews">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href={`/films/${film.id}`}>{film.title}</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Reviews
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                        <Col span={6}>
                            <img alt={film.title} src={film.poster ? film.poster : blank} style={{ width: '100%', height: 'auto', objectFit: 'scale-down' }} />
                            <div className="container">
                                <Typography.Title level={5}>{film.title}</Typography.Title>
                                <Descriptions column={1}>
                                    <Descriptions.Item label="Төрөл">{getGenres(film.genres)}</Descriptions.Item>
                                    <Descriptions.Item label="Ангилал">Хийгдээгүй</Descriptions.Item>
                                    <Descriptions.Item label="Нээлт">{moment(film.releasedate).format("YYYY оны MM сарын DD")}</Descriptions.Item>
                                    <Descriptions.Item label="Хугацаа">{film.duration} мин</Descriptions.Item>
                                </Descriptions>                                
                                <Typography.Text>Үнэлгээ:</Typography.Text>
                                <div style={{ textAlign: 'center' }}>
                                    <FilmScore type="mid" score={film.avg_score} />
                                </div>
                            </div>
                        </Col>
                        <Col span={18}>
                            <div className="container">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <Typography.Title level={5}>{total} REVIEWS</Typography.Title>
                                    </div>
                                    <div>
                                        <Typography.Title level={5}>ORDER</Typography.Title>
                                    </div>
                                </div>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={reviews}                                
                                    renderItem={review => (
                                        <List.Item
                                            key={review.id}
                                            actions={[
                                                <IconText icon={StarOutlined} text={`${review.score} / 10`} key="list-vertical-star" />,
                                                <IconText icon={EyeOutlined} text="1312" key="list-vertical-view" />,
                                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like" />,
                                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                            ]}
                                            extra={
                                                <a href={`/reviews/${review.id}`}>
                                                    <img
                                                        width={240}
                                                        alt={review.title}
                                                        src={review.thumbnail}
                                                    />
                                                </a>
                                            }
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    review.author.profile.avatar ? (
                                                        <Avatar 
                                                            className="profile-icon"
                                                            size={48}                       
                                                            src={review.author.profile.avatar}                                                                                          
                                                        />
                                                    ) : (
                                                        <Avatar 
                                                            className="profile-icon"
                                                            size={48}                     
                                                            icon={<UserOutlined />}                            
                                                            style={{ background: '#2c3e50' }}                                                              
                                                        />
                                                    )             
                                                }
                                                title={<a href={`/reviews/${review.id}`}>{review.title}</a>}
                                                description={`${review.author.username} /${moment(review.created_at).format("YYYY-MM-DD")}/`}
                                            />
                                            <Typography.Paragraph ellipsis={{ rows: 5 }} style={{ margin: 0 }}>
                                                {/* <div dangerouslySetInnerHTML={{__html: props.text }} />    */}
                                                {review.outline}
                                            </Typography.Paragraph> 
                                            <div style={{ textAlign: 'right' }}>
                                                <Button type="link" href={`/reviews/${review.id}`}>Дэлгэрэнгүй...</Button>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                                <Pagination                         
                                    defaultCurrent={page}
                                    total={total}
                                    pageSize={24}
                                    showSizeChanger={false}
                                    hideOnSinglePage={true}
                                    showTotal={showTotal}
                                    onChange={onPageChange}                 
                                />         
                            </div>
                        </Col>
                    </Row>                    
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default ReviewList