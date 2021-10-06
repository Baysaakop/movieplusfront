import axios from "axios"
import api from "../../../api"
import { connect } from "react-redux"
import { Grid, message, Row, Col, Spin, Typography, Space, Button, Avatar, Tooltip } from "antd"
import { useEffect, useState } from "react"
import moment from 'moment'
import './ReviewDetail.css'
import { CommentOutlined, EyeOutlined, FacebookFilled, InstagramOutlined, LikeOutlined, UserOutlined, YoutubeOutlined } from "@ant-design/icons"
import blank from '../blank.jpg'
import GenreTag from "../../../components/GenreTag"
import FilmScore from "../FilmScore"
import ReviewComments from "./ReviewComments"

const { useBreakpoint } = Grid

function ReviewDetail (props) {
    const screens = useBreakpoint()
    const [user, setUser] = useState()
    const [review, setReview] = useState()
    const [film, setFilm] = useState()

    useEffect(() => {
        if (props.token && !user) {
            getUser()
        }
        getReview()  
    }, [props.user]) // eslint-disable-line react-hooks/exhaustive-deps        

    function getReview() {
        const id = props.match.params.id
        const url = api.reviews + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                         
            console.log(res.data)           
            setReview(res.data)           
            getFilm(res.data.film)       
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getUser () {        
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                    
            setUser(res.data)            
        }).catch(err => {
            console.log(err.message)            
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
            console.log(res.data)                     
            setFilm(res.data)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        review ? (
            <div className="review-detail">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <img className="review-thumbnail" alt={review.title} src={review.thumbnail} />
                        <div className="container review-detail" style={ screens.xs ? { padding: '16px' } : { padding: '24px 80px' }}>          
                            <Typography.Title level={2} style={{ marginBottom: '8px' }}>{review.title}</Typography.Title>       
                            <Typography.Paragraph style={{ fontSize: '16px', marginBottom: '8px' }}>
                                <div style={{ width: '100%', overflow: 'hidden' }} dangerouslySetInnerHTML={{__html: review.content }} />                                               
                            </Typography.Paragraph>      
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={24} lg={16}>
                                    <Space size={[8, 8]}>
                                        <Button type="ghost" shape="round" icon={<EyeOutlined />}> {review.view_count}</Button>
                                        <Button type="ghost" shape="round" icon={<LikeOutlined />}> {review.like_count}</Button>
                                        <Button type="ghost" shape="round" icon={<CommentOutlined />}> {review.comments.length}</Button>
                                    </Space>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                    {moment(review.created_at).format("YYYY оны MM сарын DD")}
                                </Col>
                            </Row>
                        </div>
                        <ReviewComments user={user} review={review.id} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <div className="container" style={{ width: '100%' }}>  
                                <Typography.Title level={4} style={{ marginBottom: '16px' }}>Нийтлэгч:</Typography.Title>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        {review.author.profile.avatar ? (
                                            <Avatar 
                                                className="profile-icon"
                                                size={64}                       
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
                                        <div style={{ marginLeft: '8px' }}>
                                            <Typography.Title level={5} style={{ margin: 0 }}>{review.author.username}</Typography.Title>
                                            <Typography.Text type="secondary" style={{ margin: 0 }}># DESCRIPTION</Typography.Text>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <Button shape="round" type="ghost" icon={<BellOutlined />}>Дагах</Button>
                                    </div> */}
                                </div>                                                                                          
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Tooltip title="Facebook" placement="right">
                                    <Button type="text" size="large" style={{ background: '#3B5998', color: '#fff', marginBottom: '8px' }} icon={<FacebookFilled />} />
                                </Tooltip>
                                <Tooltip title="Instagram" placement="right">
                                    <Button type="text" size="large" style={{ background: '#125688', color: '#fff', marginBottom: '8px' }} icon={<InstagramOutlined />} />
                                </Tooltip>
                                <Tooltip title="YouTube" placement="right">
                                    <Button type="text" size="large" style={{ background: '#bb0000', color: '#fff' }} icon={<YoutubeOutlined />} />                                
                                </Tooltip>
                            </div>
                        </div>
                        <div className="container" style={{ marginTop: '24px' }}>  
                            <Row gutter={[24, 24]}>
                                <Col span={12}>
                                    <Typography.Title level={4} style={{ marginBottom: '16px' }}>Өгсөн оноо:</Typography.Title>
                                    <div style={{ textAlign: 'center' }}>
                                        <FilmScore type="mid" score={review.score * 10} />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Typography.Title level={4} style={{ marginBottom: '16px' }}>Үнэлгээ:</Typography.Title>
                                    <div style={{ textAlign: 'center' }}>
                                        { film ? (
                                            <FilmScore type="mid" score={film.avg_score} />
                                        ) : (
                                            <></>
                                        )}                                        
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="container" style={{ marginTop: '24px' }}>
                            <Typography.Title level={4} style={{ marginBottom: '16px' }}>Киноны тухай:</Typography.Title>
                            { film ? (
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <a href={`/films/${film.id}/`}>
                                            <img alt={film.title} src={film.poster ? film.poster : blank} style={{ width: '100%', height: 'auto', objectFit: 'scale-down' }} />
                                        </a>
                                    </Col>
                                    <Col span={12}>
                                        <a href={`/films/${film.id}/`}>
                                            <Typography.Title level={5}>{film.title} ({moment(film.releasedate).year()})</Typography.Title>
                                        </a>
                                        { film.genres ?
                                            <Space size={[8, 8]} wrap>
                                            {film.genres.map(genre => (                                        
                                                <GenreTag genre={genre.name} />                                                                       
                                            ))}                       
                                            </Space>          
                                        :
                                            <></>
                                        }     
                                        {/* <Typography.Text style={{ display: 'block', marginTop: '16px' }}>Найруулагч: </Typography.Text>
                                        <Typography.Text style={{ display: 'block' }}>Гол дүрд: </Typography.Text>                                         */}
                                    </Col>
                                </Row>
                            ) : <></>}
                        </div>
                    </Col>
                </Row>
            </div>
        ) : (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        )
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ReviewDetail)